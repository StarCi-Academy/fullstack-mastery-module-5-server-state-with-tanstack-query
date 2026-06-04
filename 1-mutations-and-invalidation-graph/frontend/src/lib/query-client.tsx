import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { useState, type ReactNode } from "react"

/**
 * QueryProvider — short staleTime (1s) so invalidation cascades are easy to observe.
 */
export function QueryProvider({ children }: { children: ReactNode }): JSX.Element {
    const [client] = useState<QueryClient>(
        () => new QueryClient({ defaultOptions: { queries: { staleTime: 1_000 } } }),
    )
    return (
        <QueryClientProvider client={client}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}
