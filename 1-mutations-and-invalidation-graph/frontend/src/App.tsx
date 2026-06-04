import { HeroUIProvider } from "./components/providers"
import { QueryProvider } from "./lib/query-client"
import { UsersManager } from "./components"

/**
 * App root — composes providers around the main UsersManager component.
 */
export default function App() {
    return (
        <HeroUIProvider>
            <QueryProvider>
                <main className="min-h-screen p-6 max-w-3xl mx-auto flex flex-col gap-6">
                    <h1 className="text-2xl font-semibold text-foreground">
                        M5 L1 — Mutations &amp; invalidation graph
                    </h1>
                    <UsersManager />
                </main>
            </QueryProvider>
        </HeroUIProvider>
    )
}
