import type { ReactNode } from "react"
import { QueryProvider } from "../lib/query-client"
import "./globals.css"
import { HeroUIProvider } from "@/components/providers"

/**
 * Root layout (EN: Root layout) — bọc QueryProvider.
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
export const metadata = { title: "M5 L2 — Optimistic updates with rollback" }
