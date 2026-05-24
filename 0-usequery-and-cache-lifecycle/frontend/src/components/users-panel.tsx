"use client"

import { useQuery } from "@tanstack/react-query"
import { fetchUsers, type User } from "../lib/api"

/**
 * UsersPanel — hiển thị danh sách user qua useQuery.
 * (EN: UsersPanel — renders the user list via useQuery.)
 *
 * Quan sát các trạng thái: isPending (skeleton lần đầu), isFetching (refresh ngầm),
 * và `dataUpdatedAt` (timestamp lần fetch cuối) để học vòng đời cache.
 * (EN: Observe isPending [initial skeleton], isFetching [background refresh],
 * and dataUpdatedAt [last fetch timestamp] to learn the cache lifecycle.)
 */
export function UsersPanel(): JSX.Element {
    const query = useQuery<User[]>({
        queryKey: ["users"],
        queryFn: fetchUsers,
        // refetchOnWindowFocus: 'always' để luồng 3 luôn demo được refetch khi focus,
        // bất kể staleTime. (EN: 'always' ensures flow 3 demonstrates window-focus refetch
        // regardless of staleTime — the cache still returns instantly while re-validating.)
        refetchOnWindowFocus: "always",
    })

    if (query.isPending) {
        return <div data-testid="users-skeleton">Loading users…</div>
    }
    if (query.isError) {
        return <div data-testid="users-error">Error: {(query.error as Error).message}</div>
    }
    return (
        <div>
            <div data-testid="users-fetching">{query.isFetching ? "refreshing" : "idle"}</div>
            <div data-testid="users-updated-at">{new Date(query.dataUpdatedAt).toISOString()}</div>
            <ul data-testid="users-list">
                {query.data.map((u) => (
                    <li key={u.id} data-testid={`user-${u.id}`}>
                        {u.name} — {u.email}
                    </li>
                ))}
            </ul>
        </div>
    )
}
