interface FeedStatusProps {
    total: number
    hasNextPage: boolean
}

/**
 * FeedStatus — read-only feed header: how many rows are loaded and whether more
 * pages remain. No action button; loading happens by scrolling (infinite scroll).
 */
export function FeedStatus({ total, hasNextPage }: FeedStatusProps): JSX.Element {
    return (
        <div className="flex items-center justify-between gap-3">
            <span className="text-sm text-muted">
                Loaded{" "}
                <span
                    className="font-semibold text-foreground"
                    data-testid="total-count"
                >
                    {total}
                </span>{" "}
                users
            </span>
            <span className="text-sm text-muted">
                more:{" "}
                <span
                    className="font-semibold text-foreground"
                    data-testid="has-next"
                >
                    {hasNextPage ? "yes" : "no"}
                </span>
            </span>
        </div>
    )
}
