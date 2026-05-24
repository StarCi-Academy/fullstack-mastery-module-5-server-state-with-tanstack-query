"use client"
import { Button, Checkbox, Input, Label } from "@heroui/react"

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

    if (usersQuery.isPending) return <div data-testid="users-skeleton">Loading…</div>
    if (usersQuery.isError) return <div data-testid="users-error">Error</div>

    const first = usersQuery.data[0]

    return (
        <div className="flex flex-col gap-3">
            <div data-testid="status">
                {mutation.isError ? "error" : mutation.isPending ? "saving" : "idle"}
            </div>
            <div>
                Editing #{first.id}:{" "}
                <span data-testid={`user-${first.id}-name`}>{first.name}</span>
            </div>

            <div className="flex flex-col gap-1">
                <Label htmlFor="input-name">New name</Label>
                <Input
                    id="input-name"
                    data-testid="input-name"
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    placeholder="new name"
                />
            </div>

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
                data-testid="btn-save"
                onPress={() =>
                    mutation.mutate({ id: first.id, name: draft || first.name, fail: shouldFail })
                }
            >
                Save
            </Button>

            <ul data-testid="users-list">
                {usersQuery.data.map((u) => (
                    <li key={u.id} data-testid={`user-${u.id}`}>
                        {u.name}
                    </li>
                ))}
            </ul>
        </div>
    )
}
