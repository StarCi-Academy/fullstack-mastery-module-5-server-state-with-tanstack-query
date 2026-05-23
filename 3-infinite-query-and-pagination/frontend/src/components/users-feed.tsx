"use client"

import { useInfiniteQuery } from "@tanstack/react-query"
import { fetchUsersPage, type UsersPage } from "../lib/api"

const PAGE_SIZE = 10

/**
 * UsersFeed — minh hoạ useInfiniteQuery với cursor pagination.
 * (EN: UsersFeed — illustrates useInfiniteQuery with cursor pagination.)
 *
 * `getNextPageParam` rút `nextCursor` từ page cuối; nếu null thì hasNextPage=false.
 * (EN: `getNextPageParam` reads `nextCursor` from the last page; null means hasNextPage=false.)
 */
export function UsersFeed(): JSX.Element {
    const query = useInfiniteQuery<UsersPage, Error>({
        queryKey: ["users", "infinite"],
        queryFn: ({ pageParam }) =>
            fetchUsersPage({ cursor: pageParam as number, limit: PAGE_SIZE }),
        initialPageParam: 0,
        getNextPageParam: (last) => last.nextCursor,
    })

    if (query.isPending) return <div data-testid="users-skeleton">Loading…</div>
    if (query.isError) return <div data-testid="users-error">Error</div>

    const all = query.data.pages.flatMap((p) => p.data)

    return (
        <div>
            <div data-testid="total-count">{all.length}</div>
            <div data-testid="has-next">{query.hasNextPage ? "yes" : "no"}</div>
            <ul data-testid="users-list">
                {all.map((u) => (
                    <li key={u.id} data-testid={`user-${u.id}`}>
                        #{u.id} {u.name}
                    </li>
                ))}
            </ul>
            <button
                data-testid="btn-load-more"
                disabled={!query.hasNextPage || query.isFetchingNextPage}
                onClick={() => void query.fetchNextPage()}
            >
                {query.isFetchingNextPage ? "Loading…" : "Load more"}
            </button>
        </div>
    )
}
