import type { PropsWithChildren, Ref } from "react"
import { ScrollShadow } from "@heroui/react"

interface FeedScrollAreaProps extends PropsWithChildren {
    /** Ref to the scroll container — used as IntersectionObserver root for infinite scroll. */
    scrollRef: Ref<HTMLDivElement>
}

/**
 * FeedScrollArea — fixed-height vertical scroll region with HeroUI edge fade.
 *
 * ScrollShadow owns overflow-y and updates top/bottom fade masks as the learner
 * scrolls through accumulated infinite-query pages.
 */
export const FeedScrollArea = ({
    scrollRef,
    children,
}: FeedScrollAreaProps): JSX.Element => {
    return (
        <ScrollShadow
            ref={scrollRef}
            hideScrollBar
            orientation="vertical"
            size={40}
            data-testid="users-scroll"
            className="max-h-96"
        >
            {children}
        </ScrollShadow>
    )
}
