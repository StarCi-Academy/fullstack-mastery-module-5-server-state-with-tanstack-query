import { UsersManager } from "../components/users-manager"

/**
 * Main page — renders UsersManager.
 */
export default function Home(): JSX.Element {
    return (
        <main className="min-h-screen p-6 max-w-3xl mx-auto flex flex-col gap-6">
            <h1 className="text-2xl font-semibold text-foreground">
                M5 L1 — Mutations & invalidation graph
            </h1>
            <UsersManager />
        </main>
    )
}
