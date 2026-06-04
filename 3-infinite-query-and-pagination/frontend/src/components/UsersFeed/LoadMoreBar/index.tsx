import { Button, Spinner } from "@heroui/react"
import { ArrowDown } from "@gravity-ui/icons"

interface LoadMoreBarProps {
    total: number
    hasNextPage: boolean
    isFetchingNextPage: boolean
    onLoadMore: () => void
}

/**
 * LoadMoreBar — total count, has-next indicator, and load-more button.
 */
export function LoadMoreBar({
    total,
    hasNextPage,
    isFetchingNextPage,
    onLoadMore,
}: LoadMoreBarProps): JSX.Element {
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
                users &mdash; more:{" "}
                <span
                    className="font-semibold text-foreground"
                    data-testid="has-next"
                >
                    {hasNextPage ? "yes" : "no"}
                </span>
            </span>
            <Button
                variant="secondary"
                size="sm"
                isPending={isFetchingNextPage}
                isDisabled={!hasNextPage || isFetchingNextPage}
                data-testid="btn-load-more"
                onPress={onLoadMore}
            >
                {({ isPending }) => (
                    <>
                        {isPending ? (
                            <Spinner color="current" size="sm" />
                        ) : (
                            <ArrowDown />
                        )}
                        Load more
                    </>
                )}
            </Button>
        </div>
    )
}
