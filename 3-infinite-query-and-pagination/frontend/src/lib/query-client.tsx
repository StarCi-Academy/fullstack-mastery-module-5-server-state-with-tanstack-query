import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { useState, type ReactNode } from "react"

interface QueryProviderProps { children: ReactNode }

export const QueryProvider = ({ children }: QueryProviderProps) => {
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
