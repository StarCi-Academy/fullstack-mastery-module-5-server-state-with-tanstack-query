import Link from "next/link"
import { UsersPanel } from "../../components/users-panel"

/**
 * Users page rendering UsersPanel with polished header.
 *
 * Header link uses plain `<a>` (next/link) instead of HeroUI Button
 * because `refetchOnWindowFocus: "always"` refetches on button blur/focus.
 */
export default function UsersPage(): JSX.Element {
    return (
        <main className="min-h-screen p-6 max-w-3xl mx-auto flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-foreground">Users</h1>
                <Link
                    href="/"
                    data-testid="link-home"
                    className="inline-flex items-center px-3 py-1.5 rounded-medium bg-default-100 text-foreground text-sm hover:bg-default-200 transition-colors"
                >
                    Home
                </Link>
            </div>
            <UsersPanel />
        </main>
    )
}
