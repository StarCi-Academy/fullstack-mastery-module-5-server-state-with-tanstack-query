import Link from "next/link"

/**
 * Trang chủ — link tới /users.
 * (EN: Home — links to /users.)
 *
 * Lưu ý: dùng plain `<a>` (qua next/link) thay vì HeroUI Button vì
 * `refetchOnWindowFocus: "always"` trên `useQuery` sẽ refetch khi
 * blur/focus button → vỡ Luồng 2 (chỉ-một-request invariant).
 * (EN: Note: use plain `<a>` via next/link instead of HeroUI Button.
 * `refetchOnWindowFocus: "always"` on useQuery refetches on button blur/focus
 * → breaks Flow 2's one-request invariant.)
 */
export default function Home(): JSX.Element {
    return (
        <main className="min-h-screen p-6 flex items-center justify-center">
            <div className="max-w-md w-full p-8 flex flex-col gap-4 rounded-large bg-content1 border border-default-200 shadow-small">
                <h1 className="text-2xl font-semibold text-foreground">
                    M5 L0 — useQuery & cache lifecycle
                </h1>
                <p className="text-default-500 text-sm">
                    Khám phá hành vi cache, staleTime, và refetchOnWindowFocus
                    của TanStack Query.
                </p>
                <Link
                    href="/users"
                    data-testid="link-users"
                    className="inline-flex items-center justify-center px-4 py-2 rounded-medium bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
                >
                    Go to Users
                </Link>
            </div>
        </main>
    )
}
