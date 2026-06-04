import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { useState, type ReactNode } from "react"

/**
 * QueryProvider for infinite query.
 */
export function QueryProvider({ children }: { children: ReactNode }) {
    const [client] = useState<QueryClient>(
        () => new QueryClient({ defaultOptions: { queries: { staleTime: 60_000 } } }),
    )
    return (
        <QueryClientProvider client={client}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}
