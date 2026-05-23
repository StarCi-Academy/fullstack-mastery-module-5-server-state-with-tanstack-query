import type { ReactNode } from "react"
import { QueryProvider } from "../lib/query-client"

/**
 * Root layout — bọc QueryProvider (EN: Root layout — wraps QueryProvider).
 */
export default function RootLayout({ children }: { children: ReactNode }): JSX.Element {
    return (
        <html lang="en">
            <body>
                <QueryProvider>{children}</QueryProvider>
            </body>
        </html>
    )
}

export const metadata = { title: "M5 L1 — Mutations & invalidation graph" }
