import { ToastProvider, Typography } from "@heroui/react"
import { HeroUIProvider } from "./components/providers"
import { QueryProvider } from "./lib/query-client"
import { Local } from "./components/Local"
import { Sandbox } from "./components/Sandbox"

/** Lesson label (shown above the content in both modes). */
const TITLE = "Optimistic Updates & Rollback"
/** Lesson description (shown under the label in both modes). */
const DESCRIPTION =
    "The UI updates instantly before the server responds. If the server returns an error, the cache rolls back to the snapshot taken in onMutate."

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
                        <Typography.Heading level={4} weight="semibold">
                            {TITLE}
                        </Typography.Heading>
                        <div className="h-3" />
                        {/* Description */}
                        <Typography.Paragraph size="sm" color="muted">
                            {DESCRIPTION}
                        </Typography.Paragraph>
                        <div className="h-6" />
                        {/* Content */}
                        {isSandbox ? <Sandbox /> : <Local />}
                        <ToastProvider />
                    </div>
                </main>
            </QueryProvider>
        </HeroUIProvider>
    )
}
