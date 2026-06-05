"use client"

import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Skeleton } from "@heroui/react"
import { fetchUsers, patchUser, type User } from "../../lib/api"
import { UserName } from "./UserName"
import { NameEditor } from "./NameEditor"

const USERS_KEY = ["users"] as const

/**
 * OptimisticEditor — the shared lesson content used by both Local and Sandbox.
 *
 * Optimistic update + rollback on server error. Flow: onMutate cancels queries,
 * snapshots previous cache, writes optimistically; onError restores snapshot;
 * onSettled invalidates to re-sync with server. The title/description are owned
 * by App, so this body has no heading of its own.
 */
export function OptimisticEditor(): JSX.Element {
    const qc = useQueryClient()
    const [draft, setDraft] = useState("")
    const [shouldFail, setShouldFail] = useState(false)

    const query = useQuery<User[]>({ queryKey: USERS_KEY, queryFn: fetchUsers })

    const mutation = useMutation({
        mutationFn: patchUser,
        onMutate: async (vars): Promise<{ previous: User[] | undefined }> => {
            await qc.cancelQueries({ queryKey: USERS_KEY })
            const previous = qc.getQueryData<User[]>(USERS_KEY)
            qc.setQueryData<User[]>(USERS_KEY, (old) =>
                (old ?? []).map((u) => (u.id === vars.id ? { ...u, name: vars.name } : u)),
            )
            return { previous }
        },
        onError: (_err, _vars, ctx): void => {
            if (ctx?.previous) {
                qc.setQueryData(USERS_KEY, ctx.previous)
            }
        },
        onSettled: () => void qc.invalidateQueries({ queryKey: USERS_KEY }),
    })

    if (query.isPending) {
        return (
            <div className="flex flex-col gap-1" data-testid="users-skeleton">
                {[0, 1, 2].map((row) => (
                    <div key={row} className="flex items-center gap-3 px-2 py-2">
                        <Skeleton className="size-9 shrink-0 rounded-full" />
                        <div className="flex flex-1 flex-col gap-1.5">
                            <Skeleton className="h-3.5 w-28 rounded-md" />
                            <Skeleton className="h-3 w-40 rounded-md" />
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    if (query.isError) {
        return (
            <p
                className="py-6 text-center text-sm font-medium text-danger"
                data-testid="users-error"
            >
                Error: {(query.error as Error).message}
            </p>
        )
    }

    const first = query.data[0]

    return (
        <div className="flex flex-col">
            <UserName user={first} />

            <div className="h-3" />

            <NameEditor
                draft={draft}
                shouldFail={shouldFail}
                isPending={mutation.isPending}
                onDraftChange={setDraft}
                onShouldFailChange={setShouldFail}
                onSave={() =>
                    mutation.mutate({
                        id: first.id,
                        name: draft || first.name,
                        fail: shouldFail,
                    })
                }
            />
        </div>
    )
}
