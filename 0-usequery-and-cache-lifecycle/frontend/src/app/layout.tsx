import type { ReactNode } from "react"
import { QueryProvider } from "../lib/query-client"

/**
 * Root layout — bọc toàn cây bằng QueryProvider để mọi page chia sẻ QueryClient.
 * (EN: Root layout wrapping the tree with QueryProvider so all pages share one QueryClient.)
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

export const metadata = {
    title: "M5 L0 — useQuery and cache lifecycle",
}
