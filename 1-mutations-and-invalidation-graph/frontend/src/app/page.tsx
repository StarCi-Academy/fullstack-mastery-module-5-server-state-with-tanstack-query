import { UsersManager } from "../components/users-manager"

/**
 * Trang chính — render UsersManager (EN: Main page — renders UsersManager).
 */
export default function Home(): JSX.Element {
    return (
        <main>
            <h1>M5 L1 — Mutations & invalidation graph</h1>
            <UsersManager />
        </main>
    )
}
