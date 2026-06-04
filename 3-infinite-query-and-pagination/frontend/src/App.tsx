import { HeroUIProvider } from "./components/providers"
import { QueryProvider } from "./lib/query-client"
import { UsersFeed } from "./components"

/**
 * App root — wires providers and renders the users feed.
 */
export default function App() {
    return (
        <HeroUIProvider>
            <QueryProvider>
                <main className="min-h-screen p-6 max-w-3xl mx-auto flex flex-col gap-6">
                    <h1 className="text-2xl font-semibold text-foreground">
                        M5 L3 — Infinite query & cursor pagination
                    </h1>
                    <UsersFeed />
                </main>
            </QueryProvider>
        </HeroUIProvider>
    )
}
