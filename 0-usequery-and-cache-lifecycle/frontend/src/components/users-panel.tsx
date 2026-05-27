"use client"

import { useQuery } from "@tanstack/react-query"
import { Avatar, Card, Chip, Skeleton } from "@heroui/react"
import { fetchUsers, type User } from "../lib/api"

/**
 * UsersPanel — hiển thị danh sách user qua useQuery với HeroUI polish.
 * (EN: UsersPanel — renders the user list via useQuery with HeroUI polish.)
 *
 * Quan sát các trạng thái: isPending (Skeleton lần đầu), isFetching (Chip refresh ngầm),
 * và `dataUpdatedAt` (timestamp lần fetch cuối) để học vòng đời cache.
 * (EN: Observe isPending [Skeleton initial], isFetching [refresh Chip background],
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
        return (
            <Card className="p-6 flex flex-col gap-3" data-testid="users-skeleton">
                <Skeleton className="h-5 w-40 rounded-medium" />
                <Skeleton className="h-12 w-full rounded-medium" />
                <Skeleton className="h-12 w-full rounded-medium" />
                <Skeleton className="h-12 w-full rounded-medium" />
            </Card>
        )
    }
    if (query.isError) {
        return (
            <Card
                className="p-6 border border-danger-200 bg-danger-50"
                data-testid="users-error"
            >
                <p className="text-danger font-semibold">
                    Error: {(query.error as Error).message}
                </p>
            </Card>
        )
    }
    return (
        <Card className="p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <Chip
                    color={query.isFetching ? "warning" : "success"}
                    variant="flat"
                    size="sm"
                    data-testid="users-fetching"
                >
                    {query.isFetching ? "refreshing" : "idle"}
                </Chip>
                <span
                    className="text-default-500 text-xs"
                    data-testid="users-updated-at"
                >
                    {new Date(query.dataUpdatedAt).toISOString()}
                </span>
            </div>
            <ul
                className="flex flex-col gap-2"
                data-testid="users-list"
            >
                {query.data.map((u) => (
                    <li
                        key={u.id}
                        data-testid={`user-${u.id}`}
                        className="flex items-center gap-3 p-3 rounded-medium bg-default-50"
                    >
                        <Avatar
                            name={u.name}
                            size="sm"
                            color="primary"
                        />
                        <div className="flex flex-col">
                            <span className="font-semibold text-foreground">
                                {u.name}
                            </span>
                            <span className="text-default-500 text-sm">
                                {u.email}
                            </span>
                        </div>
                    </li>
                ))}
            </ul>
        </Card>
    )
}
