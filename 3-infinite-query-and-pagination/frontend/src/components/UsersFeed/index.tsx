"use client"

import { useEffect, useRef } from "react"
import { useInfiniteQuery } from "@tanstack/react-query"
import { ErrorMessage, Skeleton } from "@heroui/react"
import { fetchUsersPage, type UsersPage } from "../../lib/api"
import { FeedScrollArea } from "./FeedScrollArea"
import { UserList } from "./UserList"
import { FeedStatus } from "./FeedStatus"

const PAGE_SIZE = 10

interface SkeletonRowsProps { testId?: string }

const SkeletonRows = ({ testId }: SkeletonRowsProps): JSX.Element => {
    return (
        <div className="flex flex-col gap-3" data-testid={testId}>
            {[0, 1, 2].map((row) => (
                <div key={row} className="flex items-center gap-3">
                    <Skeleton className="size-9 shrink-0 rounded-full" />
                    <div className="flex flex-1 flex-col">
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
 * view — there is no Load more button. The list shows a skeleton on the initial
 * load and while the next page is loading. This is the shared lesson content
 * used by both Local and Sandbox; the title/description are owned by App.
 */
export const UsersFeed = (): JSX.Element => {
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
            {query.isError ? (
                <ErrorMessage data-testid="users-error">
                    Error: {(query.error as Error).message}
                </ErrorMessage>
            ) : query.isPending ? (
                // Initial load — skeleton inside the same ScrollShadow box learners scroll later.
                <FeedScrollArea scrollRef={scrollRef}>
                    <SkeletonRows testId="users-skeleton" />
                </FeedScrollArea>
            ) : (
                <div className="flex flex-col gap-3">
                    <FeedStatus total={all.length} hasNextPage={hasNextPage} />

                    <FeedScrollArea scrollRef={scrollRef}>
                        <UserList users={all} />

                        {isFetchingNextPage ? (
                            <SkeletonRows testId="users-loading-more" />
                        ) : null}

                        <div ref={sentinelRef} aria-hidden className="h-px w-full" />
                    </FeedScrollArea>
                </div>
            )}
        </div>
    )
}
