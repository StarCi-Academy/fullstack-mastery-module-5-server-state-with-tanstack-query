"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { useState, type ReactNode } from "react"

/**
 * QueryProvider mặc định cho L2 — không retry để rollback xảy ra nhanh.
 * (EN: Default QueryProvider for L2 — no retries so rollback happens promptly.)
 */
export function QueryProvider({ children }: { children: ReactNode }): JSX.Element {
    const [client] = useState<QueryClient>(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: { staleTime: 60_000, retry: false },
                    mutations: { retry: false },
                },
            }),
    )
    return (
        <QueryClientProvider client={client}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}
