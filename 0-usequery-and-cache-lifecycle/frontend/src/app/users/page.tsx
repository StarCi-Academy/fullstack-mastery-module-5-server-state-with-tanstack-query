import { UsersPanel } from "../../components/users-panel"
import Link from "next/link"

/**
 * Trang Users — render UsersPanel.
 * (EN: Users page rendering UsersPanel.)
 */
export default function UsersPage(): JSX.Element {
    return (
        <main>
            <h1>Users</h1>
            <Link href="/" data-testid="link-home">Home</Link>
            <UsersPanel />
        </main>
    )
}
