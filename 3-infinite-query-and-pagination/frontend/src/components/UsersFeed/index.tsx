"use client"

import { useInfiniteQuery } from "@tanstack/react-query"
import { Skeleton } from "@heroui/react"
import { fetchUsersPage, type UsersPage } from "../../lib/api"
import { UserList } from "./UserList"
import { LoadMoreBar } from "./LoadMoreBar"

const PAGE_SIZE = 10

/**
 * UsersFeed — useInfiniteQuery with cursor pagination.
 *
 * getNextPageParam reads nextCursor from the last page; null → hasNextPage=false.
 * All pages are accumulated in query.data.pages so the list never resets.
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

    const all = query.data.pages.flatMap((p) => p.data)

    return (
        <div className="flex flex-col">
            <div className="text-base font-semibold text-foreground">
                Infinite Query &amp; Cursor Pagination
            </div>
            <div className="h-3" />
            <div className="text-sm text-muted">
                <code>useInfiniteQuery</code> accumulates pages under one cache key.{" "}
                <code>getNextPageParam</code> derives the next cursor from the last page;
                when it returns <code>null</code>, <code>hasNextPage</code> becomes{" "}
                <code>false</code>.
            </div>

            <div className="h-6" />

            <LoadMoreBar
                total={all.length}
                hasNextPage={query.hasNextPage}
                isFetchingNextPage={query.isFetchingNextPage}
                onLoadMore={() => void query.fetchNextPage()}
            />

            <div className="h-3" />

            <UserList users={all} />
        </div>
    )
}
