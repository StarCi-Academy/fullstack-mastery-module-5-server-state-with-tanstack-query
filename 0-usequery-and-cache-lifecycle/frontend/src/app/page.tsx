import Link from "next/link"

/**
 * Trang chủ — chỉ chứa link đến trang Users.
 * (EN: Home — only links to Users.)
 */
export default function Home(): JSX.Element {
    return (
        <main>
            <h1>M5 L0 — useQuery & cache lifecycle</h1>
            <Link href="/users" data-testid="link-users">Go to Users</Link>
        </main>
    )
}
