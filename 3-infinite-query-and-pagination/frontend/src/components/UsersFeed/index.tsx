"use client"

import { useEffect, useRef } from "react"
import { useInfiniteQuery } from "@tanstack/react-query"
import { Skeleton } from "@heroui/react"
import { fetchUsersPage, type UsersPage } from "../../lib/api"
import { UserList } from "./UserList"
import { LoadMoreBar } from "./LoadMoreBar"

const PAGE_SIZE = 10

/**
 * UsersFeed — useInfiniteQuery with cursor pagination + infinite scroll.
 *
 * getNextPageParam reads nextCursor from the last page; null → hasNextPage=false.
 * All pages accumulate in query.data.pages so the list never resets. A sentinel
 * at the end of the list auto-fetches the next page when scrolled into view; the
 * Load more button remains as an explicit fallback.
 */
export function UsersFeed(): JSX.Element {
    const query = useInfiniteQuery<UsersPage, Error>({
        queryKey: ["users", "infinite"],
        queryFn: ({ pageParam }) =>
            fetchUsersPage({ cursor: pageParam as number, limit: PAGE_SIZE }),
        initialPageParam: 0,
        getNextPageParam: (last) => last.nextCursor,
    })

    const { hasNextPage, isFetchingNextPage, fetchNextPage } = query

    // Infinite scroll: observe a sentinel after the list. When it enters the
    // viewport (with a 160px pre-fetch margin) and there is a next page that
    // isn't already loading, fetch it — so scrolling down keeps loading rows.
    const sentinelRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const el = sentinelRef.current
        if (!el) return
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0]?.isIntersecting && hasNextPage && !isFetchingNextPage) {
                    void fetchNextPage()
                }
            },
            { rootMargin: "160px" },
        )
        observer.observe(el)
        return () => observer.disconnect()
    }, [hasNextPage, isFetchingNextPage, fetchNextPage])

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
                <code>false</code>. Scroll to the bottom to auto-load more.
            </div>

            <div className="h-6" />

            <UserList users={all} />

            <div className="h-3" />

            <LoadMoreBar
                total={all.length}
                hasNextPage={query.hasNextPage}
                isFetchingNextPage={query.isFetchingNextPage}
                onLoadMore={() => void query.fetchNextPage()}
            />

            {/* Sentinel observed for infinite scroll — kept at the very bottom. */}
            <div ref={sentinelRef} aria-hidden className="h-px w-full" />
        </div>
    )
}
