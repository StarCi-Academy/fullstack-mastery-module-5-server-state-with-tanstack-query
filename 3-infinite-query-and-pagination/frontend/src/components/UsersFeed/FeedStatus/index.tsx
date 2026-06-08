import { Typography } from "@heroui/react"

interface FeedStatusProps {
    /** Total rows accumulated across all loaded pages. */
    total: number
    /** Whether useInfiniteQuery reports another page is available. */
    hasNextPage: boolean
}

/**
 * FeedStatus — read-only feed header: how many rows are loaded and whether more
 * pages remain. No action button; loading happens by scrolling (infinite scroll).
 */
export const FeedStatus = ({ total, hasNextPage }: FeedStatusProps): JSX.Element => {
    return (
        <div className="flex items-center justify-between gap-3">
            <Typography.Paragraph size="sm" color="muted">
                Loaded{" "}
                <span
                    className="font-semibold text-foreground"
                    data-testid="total-count"
                >
                    {total}
                </span>{" "}
                users
            </Typography.Paragraph>
            <Typography.Paragraph size="sm" color="muted">
                more:{" "}
                <span
                    className="font-semibold text-foreground"
                    data-testid="has-next"
                >
                    {hasNextPage ? "yes" : "no"}
                </span>
            </Typography.Paragraph>
        </div>
    )
}
