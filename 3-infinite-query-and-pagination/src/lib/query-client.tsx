"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { useState, type ReactNode } from "react"

/**
 * QueryProvider cho infinite query (EN: QueryProvider for infinite query).
 */
export function QueryProvider({ children }: { children: ReactNode }): JSX.Element {
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
