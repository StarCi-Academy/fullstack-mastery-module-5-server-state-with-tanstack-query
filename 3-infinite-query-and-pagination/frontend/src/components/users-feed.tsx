"use client"
import { Avatar, Button, Card, Chip, Skeleton } from "@heroui/react"

import { useInfiniteQuery } from "@tanstack/react-query"
import { fetchUsersPage, type UsersPage } from "../lib/api"

const PAGE_SIZE = 10

/**
 * UsersFeed — illustrates useInfiniteQuery with cursor pagination + HeroUI polish.
 *
 * `getNextPageParam` reads `nextCursor` from the last page; null means hasNextPage=false.
 */
export function UsersFeed(): JSX.Element {
    const query = useInfiniteQuery<UsersPage, Error>({
        queryKey: ["users", "infinite"],
        queryFn: ({ pageParam }) =>
            fetchUsersPage({ cursor: pageParam as number, limit: PAGE_SIZE }),
        initialPageParam: 0,
        getNextPageParam: (last) => last.nextCursor,
    })

    if (query.isPending) {
        return (
            <Card className="p-6 flex flex-col gap-3" data-testid="users-skeleton">
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
                <p className="text-danger font-semibold">Error loading feed</p>
            </Card>
        )
    }

    const all = query.data.pages.flatMap((p) => p.data)

    return (
        <Card className="p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <div className="flex flex-col">
                    <span className="text-default-500 text-xs">Loaded</span>
                    <span
                        className="text-3xl font-bold text-foreground"
                        data-testid="total-count"
                    >
                        {all.length}
                    </span>
                </div>
                <Chip
                    color={query.hasNextPage ? "primary" : "success"}
                    variant="flat"
                    size="sm"
                    data-testid="has-next"
                >
                    {query.hasNextPage ? "yes" : "no"}
                </Chip>
            </div>

            <ul
                data-testid="users-list"
                className="flex flex-col gap-2"
            >
                {all.map((u) => (
                    <li
                        key={u.id}
                        data-testid={`user-${u.id}`}
                        className="flex items-center gap-3 p-3 rounded-medium bg-default-50"
                    >
                        <Avatar name={u.name} size="sm" color="primary" />
                        <div className="flex flex-col">
                            <span className="text-default-500 text-xs">#{u.id}</span>
                            <span className="font-semibold text-foreground">
                                {u.name}
                            </span>
                        </div>
                    </li>
                ))}
            </ul>

            <Button
                color="primary"
                fullWidth
                data-testid="btn-load-more"
                isDisabled={!query.hasNextPage || query.isFetchingNextPage}
                isLoading={query.isFetchingNextPage}
                onPress={() => void query.fetchNextPage()}
            >
                {query.isFetchingNextPage ? "Loading…" : "Load more"}
            </Button>
        </Card>
    )
}
