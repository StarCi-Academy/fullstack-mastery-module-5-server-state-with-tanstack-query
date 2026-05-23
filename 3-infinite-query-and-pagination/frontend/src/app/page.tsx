import { UsersFeed } from "../components/users-feed"

/**
 * Trang chính — render UsersFeed (EN: Main page — renders UsersFeed).
 */
export default function Home(): JSX.Element {
    return (
        <main>
            <h1>M5 L3 — Infinite query & cursor pagination</h1>
            <UsersFeed />
        </main>
    )
}
