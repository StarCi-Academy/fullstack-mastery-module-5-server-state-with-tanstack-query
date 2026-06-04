import type { ReactNode } from "react"
import { QueryProvider } from "../lib/query-client"
import "./globals.css"
import { HeroUIProvider } from "@/components/providers"

/**
 * Root layout wrapping the tree with QueryProvider so all pages share one QueryClient.
 */
export default function RootLayout({ children }: { children: ReactNode }): JSX.Element {
    return (
        <html lang="en">
            <body>
                <HeroUIProvider>
                    <QueryProvider>{children}</QueryProvider>
                </HeroUIProvider>
            </body>
        </html>
    )
}

export const metadata = {
    title: "M5 L0 — useQuery and cache lifecycle",
}
