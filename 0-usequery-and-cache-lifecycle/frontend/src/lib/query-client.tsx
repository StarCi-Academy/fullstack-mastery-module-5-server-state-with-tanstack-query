"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { useState, type ReactNode } from "react"

/**
 * Provider bọc QueryClient — staleTime=30s, gcTime=5 phút.
 * (EN: Provider wrapping QueryClient — staleTime=30s, gcTime=5min.)
 *
 * Dùng useState để tránh strict-mode double-render tạo hai client.
 * (EN: useState avoids strict-mode double-render creating two clients.)
 */
export function QueryProvider({ children }: { children: ReactNode }): JSX.Element {
    const [client] = useState<QueryClient>(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: { staleTime: 30_000, gcTime: 5 * 60_000 },
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
