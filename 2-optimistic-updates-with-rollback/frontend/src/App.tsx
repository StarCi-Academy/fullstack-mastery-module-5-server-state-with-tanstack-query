import { HeroUIProvider } from "./components/providers"
import { QueryProvider } from "./lib/query-client"
import { OptimisticEditor } from "./components"

/**
 * App root — wires up the HeroUI and TanStack Query providers around the
 * OptimisticEditor demo. No routing is needed for this single-page lesson.
 */
export default function App() {
    return (
        <HeroUIProvider>
            <QueryProvider>
                <main className="min-h-screen p-6 max-w-3xl mx-auto flex flex-col gap-6">
                    <h1 className="text-2xl font-semibold text-foreground">
                        M5 L2 — Optimistic updates with rollback
                    </h1>
                    <OptimisticEditor />
                </main>
            </QueryProvider>
        </HeroUIProvider>
    )
}
