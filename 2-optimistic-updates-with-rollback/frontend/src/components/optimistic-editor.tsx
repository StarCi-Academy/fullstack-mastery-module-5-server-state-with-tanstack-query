"use client"
import {
    Avatar,
    Button,
    Card,
    Checkbox,
    Chip,
    Input,
    Label,
    Skeleton,
    TextField,
} from "@heroui/react"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { fetchUsers, patchUser, type User } from "../lib/api"

const USERS_KEY = ["users"] as const

/**
 * OptimisticEditor — minh hoạ optimistic update + rollback khi server lỗi.
 * (EN: OptimisticEditor — illustrates optimistic update + rollback on server error.)
 *
 * Pattern: onMutate cancel queries, snapshot previous, setQueryData lạc quan,
 * onError rollback bằng setQueryData(previous), onSettled invalidate.
 * (EN: Pattern: onMutate cancels queries, snapshots previous, setQueryData optimistically,
 * onError rolls back via setQueryData(previous), onSettled invalidates.)
 */
export function OptimisticEditor(): JSX.Element {
    const qc = useQueryClient()
    const usersQuery = useQuery<User[]>({ queryKey: USERS_KEY, queryFn: fetchUsers })
    const [draft, setDraft] = useState<string>("")
    const [shouldFail, setShouldFail] = useState<boolean>(false)

    const mutation = useMutation({
        mutationFn: patchUser,
        onMutate: async (vars): Promise<{ previous: User[] | undefined }> => {
            // Bước 1: huỷ refetch để không ghi đè optimistic (EN: cancel in-flight refetches)
            await qc.cancelQueries({ queryKey: USERS_KEY })
            // Bước 2: snapshot dữ liệu cũ (EN: snapshot current cache)
            const previous = qc.getQueryData<User[]>(USERS_KEY)
            // Bước 3: optimistic write (EN: optimistic write)
            qc.setQueryData<User[]>(USERS_KEY, (old) =>
                (old ?? []).map((u) => (u.id === vars.id ? { ...u, name: vars.name } : u)),
            )
            return { previous }
        },
        onError: (_err, _vars, ctx): void => {
            // Rollback (EN: Rollback to snapshot)
            if (ctx?.previous) {
                qc.setQueryData(USERS_KEY, ctx.previous)
            }
        },
        onSettled: () => {
            void qc.invalidateQueries({ queryKey: USERS_KEY })
        },
    })

    if (usersQuery.isPending) {
        return (
            <Card className="p-6 flex flex-col gap-3" data-testid="users-skeleton">
                <Skeleton className="h-6 w-1/2 rounded-medium" />
                <Skeleton className="h-10 w-full rounded-medium" />
                <Skeleton className="h-10 w-full rounded-medium" />
            </Card>
        )
    }
    if (usersQuery.isError) {
        return (
            <Card
                className="p-6 border border-danger-200 bg-danger-50"
                data-testid="users-error"
            >
                <p className="text-danger font-semibold">Error loading users</p>
            </Card>
        )
    }

    const first = usersQuery.data[0]
    const statusColor: "danger" | "warning" | "default" = mutation.isError
        ? "danger"
        : mutation.isPending
            ? "warning"
            : "default"
    const statusLabel = mutation.isError
        ? "error"
        : mutation.isPending
            ? "saving"
            : "idle"

    return (
        <div className="flex flex-col gap-4">
            <Card className="p-6 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Editor</h2>
                    <Chip
                        color={statusColor}
                        variant="flat"
                        size="sm"
                        data-testid="status"
                    >
                        {statusLabel}
                    </Chip>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-medium bg-default-50">
                    <Avatar name={first.name} size="sm" color="primary" />
                    <div className="flex flex-col">
                        <span className="text-default-500 text-xs">
                            Editing #{first.id}
                        </span>
                        <span
                            className="font-semibold text-foreground"
                            data-testid={`user-${first.id}-name`}
                        >
                            {first.name}
                        </span>
                    </div>
                </div>

                <TextField
                    value={draft}
                    onChange={setDraft}
                    className="flex flex-col gap-1"
                >
                    <Label htmlFor="input-name" className="text-sm text-default-500">
                        New name
                    </Label>
                    <Input
                        id="input-name"
                        data-testid="input-name"
                        placeholder="new name"
                    />
                </TextField>

                <Checkbox
                    data-testid="cb-fail"
                    isSelected={shouldFail}
                    onChange={setShouldFail}
                >
                    <Checkbox.Control>
                        <Checkbox.Indicator />
                    </Checkbox.Control>
                    <Checkbox.Content>
                        <Label>Force server 500</Label>
                    </Checkbox.Content>
                </Checkbox>

                <Button
                    color="primary"
                    isLoading={mutation.isPending}
                    data-testid="btn-save"
                    onPress={() =>
                        mutation.mutate({
                            id: first.id,
                            name: draft || first.name,
                            fail: shouldFail,
                        })
                    }
                >
                    Save
                </Button>
            </Card>

            <Card className="p-6">
                <h2 className="text-lg font-semibold mb-3">All users</h2>
                <ul
                    data-testid="users-list"
                    className="flex flex-col gap-2"
                >
                    {usersQuery.data.map((u) => (
                        <li
                            key={u.id}
                            data-testid={`user-${u.id}`}
                            className="flex items-center gap-3 p-3 rounded-medium bg-default-50"
                        >
                            <Avatar name={u.name} size="sm" color="primary" />
                            <span className="font-semibold text-foreground">
                                {u.name}
                            </span>
                        </li>
                    ))}
                </ul>
            </Card>
        </div>
    )
}
