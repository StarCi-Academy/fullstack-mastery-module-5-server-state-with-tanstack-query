import { HeroUIProvider } from "./components/providers"
import { QueryProvider } from "./lib/query-client"
import { UsersPanel } from "./components"

/**
 * App root — providers + the single users panel.
 */
export default function App(): JSX.Element {
    return (
        <HeroUIProvider>
            <QueryProvider>
                <main className="min-h-screen bg-background p-3">
                    <div className="mx-auto max-w-2xl">
                        <UsersPanel />
                    </div>
                </main>
            </QueryProvider>
        </HeroUIProvider>
    )
}
