import { OptimisticEditor } from "../components/optimistic-editor"

/**
 * Trang chính (EN: Main page) — render OptimisticEditor.
 */
export default function Home(): JSX.Element {
    return (
        <main>
            <h1>M5 L2 — Optimistic updates with rollback</h1>
            <OptimisticEditor />
        </main>
    )
}
