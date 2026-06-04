import { UsersFeed } from "../components/users-feed"

/**
 * Main page — renders UsersFeed.
 */
export default function Home(): JSX.Element {
    return (
        <main className="min-h-screen p-6 max-w-3xl mx-auto flex flex-col gap-6">
            <h1 className="text-2xl font-semibold text-foreground">
                M5 L3 — Infinite query & cursor pagination
            </h1>
            <UsersFeed />
        </main>
    )
}
