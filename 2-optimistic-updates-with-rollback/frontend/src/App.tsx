import { HeroUIProvider } from "./components/providers"
import { QueryProvider } from "./lib/query-client"
import { OptimisticEditor } from "./components"

/**
 * App root — providers + the single optimistic editor panel.
 */
export default function App(): JSX.Element {
    return (
        <HeroUIProvider>
            <QueryProvider>
                <main className="min-h-screen bg-background p-3">
                    <div className="mx-auto max-w-2xl">
                        <OptimisticEditor />
                    </div>
                </main>
            </QueryProvider>
        </HeroUIProvider>
    )
}
