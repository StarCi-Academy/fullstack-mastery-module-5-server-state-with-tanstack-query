import { HeroUIProvider } from "./components/providers"
import { QueryProvider } from "./lib/query-client"
import { Local } from "./components/Local"
import { Sandbox } from "./components/Sandbox"

/** Lesson label (shown above the content in both modes). */
const TITLE = "Mutations & Invalidation Graph"
/** Lesson description (shown under the label in both modes). */
const DESCRIPTION =
    "Each mutation calls invalidateQueries after success — TanStack Query re-fetches automatically, keeping the list in sync with the server."

/**
 * App root — shared Label + Description, then the content switches on the
 * `?sandbox` query param: `<Sandbox/>` for the embedded preview, `<Local/>`
 * otherwise (what Playwright drives). Single-client lesson, so both render the
 * same content. The QueryClient is provided exactly as before.
 */
export default function App(): JSX.Element {
    // embedded preview loads `/?sandbox=1`; cloned-repo + Playwright load `/`
    const isSandbox = new URLSearchParams(window.location.search).has("sandbox")

    return (
        <HeroUIProvider>
            <QueryProvider>
                <main className="min-h-screen bg-background p-3">
                    <div className="mx-auto max-w-2xl">
                        {/* Label */}
                        <div className="text-base font-semibold text-foreground">{TITLE}</div>
                        <div className="h-3" />
                        {/* Description */}
                        <div className="text-sm text-muted">{DESCRIPTION}</div>
                        <div className="h-6" />
                        {/* Content */}
                        {isSandbox ? <Sandbox /> : <Local />}
                    </div>
                </main>
            </QueryProvider>
        </HeroUIProvider>
    )
}
