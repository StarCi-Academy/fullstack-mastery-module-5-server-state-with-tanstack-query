"use client"

import { useEffect, useRef } from "react"
import { useInfiniteQuery } from "@tanstack/react-query"
import { Skeleton } from "@heroui/react"
import { fetchUsersPage, type UsersPage } from "../../lib/api"
import { UserList } from "./UserList"
import { FeedStatus } from "./FeedStatus"

const PAGE_SIZE = 10

/** Three placeholder rows shown while a page is loading. */
function SkeletonRows({ testId }: { testId?: string }): JSX.Element {
    return (
        <div className="flex flex-col gap-1" data-testid={testId}>
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

/**
 * UsersFeed — useInfiniteQuery with cursor pagination + pure infinite scroll.
 *
 * getNextPageParam reads nextCursor from the last page; null → hasNextPage=false.
 * All pages accumulate in query.data.pages so the list never resets. The list
 * lives in a fixed-height scroll box; an IntersectionObserver watches a sentinel
 * at the bottom (root = that box) and fetches the next page as it scrolls into
 * view — there is no Load more button. The title/description always render; the
 * list shows a skeleton on the initial load and while the next page is loading.
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

    // Infinite scroll: observe a sentinel at the end of the scroll box. When it
    // enters the box's viewport and a next page exists (and isn't already
    // loading), fetch it. rootMargin 0 so the first page (which overflows the
    // box) does not auto-load on mount — the learner must scroll.
    const scrollRef = useRef<HTMLDivElement>(null)
    const sentinelRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const el = sentinelRef.current
        const root = scrollRef.current
        if (!el || !root) return
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0]?.isIntersecting && hasNextPage && !isFetchingNextPage) {
                    void fetchNextPage()
                }
            },
            { root, rootMargin: "0px" },
        )
        observer.observe(el)
        return () => observer.disconnect()
    }, [hasNextPage, isFetchingNextPage, fetchNextPage])

    const all = query.isSuccess ? query.data.pages.flatMap((p) => p.data) : []

    return (
        <div className="flex flex-col">
            {/* Header always renders — never skeletoned, it has no data dependency. */}
            <div className="text-base font-semibold text-foreground">
                Infinite Query &amp; Cursor Pagination
            </div>
            <div className="h-3" />
            <div className="text-sm text-muted">
                <code>useInfiniteQuery</code> accumulates pages under one cache key.{" "}
                <code>getNextPageParam</code> derives the next cursor from the last page;
                when it returns <code>null</code>, <code>hasNextPage</code> becomes{" "}
                <code>false</code>. Scroll the list to auto-load more.
            </div>

            <div className="h-3" />

            {query.isError ? (
                <p
                    className="py-6 text-center text-sm font-medium text-danger"
                    data-testid="users-error"
                >
                    Error: {(query.error as Error).message}
                </p>
            ) : query.isPending ? (
                // Initial load — placeholder rows for the very first page.
                <SkeletonRows testId="users-skeleton" />
            ) : (
                <>
                    <FeedStatus total={all.length} hasNextPage={hasNextPage} />

                    <div className="h-3" />

                    {/* Fixed-height scroll box: the list overflows so the sentinel
                        sits below the fold until the learner scrolls down. */}
                    <div
                        ref={scrollRef}
                        data-testid="users-scroll"
                        className="max-h-96 overflow-y-auto rounded-2xl border border-default-200 p-1"
                    >
                        <UserList users={all} />

                        {/* Loading the next page — signal with skeleton rows. */}
                        {isFetchingNextPage ? (
                            <SkeletonRows testId="users-loading-more" />
                        ) : null}

                        {/* Sentinel observed for infinite scroll. */}
                        <div ref={sentinelRef} aria-hidden className="h-px w-full" />
                    </div>
                </>
            )}
        </div>
    )
}
