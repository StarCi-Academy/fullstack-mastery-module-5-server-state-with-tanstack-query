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
                <main className="mx-auto max-w-2xl p-6">
                    <UsersPanel />
                </main>
            </QueryProvider>
        </HeroUIProvider>
    )
}
