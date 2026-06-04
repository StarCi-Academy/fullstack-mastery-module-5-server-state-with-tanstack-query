import { HeroUIProvider } from "./components/providers"
import { QueryProvider } from "./lib/query-client"
import { UsersPanel } from "./components"

/**
 * App root — wires providers and renders UsersPanel directly.
 *
 * L0 previously exposed UsersPanel at the /users route; with Vite there is no
 * router, so the panel renders straight into the app shell.
 */
export default function App(): JSX.Element {
    return (
        <HeroUIProvider>
            <QueryProvider>
                <main className="min-h-screen p-6 max-w-3xl mx-auto flex flex-col gap-6">
                    <h1 className="text-2xl font-semibold text-foreground">Users</h1>
                    <UsersPanel />
                </main>
            </QueryProvider>
        </HeroUIProvider>
    )
}
