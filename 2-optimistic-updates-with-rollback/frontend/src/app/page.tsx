import { OptimisticEditor } from "../components/optimistic-editor"

/**
 * Trang chính (EN: Main page) — render OptimisticEditor.
 */
export default function Home(): JSX.Element {
    return (
        <main className="min-h-screen p-6 max-w-3xl mx-auto flex flex-col gap-6">
            <h1 className="text-2xl font-semibold text-foreground">
                M5 L2 — Optimistic updates with rollback
            </h1>
            <OptimisticEditor />
        </main>
    )
}
