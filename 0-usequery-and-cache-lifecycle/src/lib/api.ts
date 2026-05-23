/**
 * Kiểu User trả về từ stub NestJS (EN: User type returned by NestJS stub).
 */
export type User = { id: number; name: string; email: string }

const BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:3000"

/**
 * Fetch wrapper trả Product[] có kiểu.
 * `cache: "no-store"` từ chối cache của Next.js — QueryClient là source of truth.
 * (EN: Typed fetcher; cache:"no-store" disables Next fetch cache — QueryClient owns caching.)
 */
export async function fetchUsers(): Promise<User[]> {
    const res = await fetch(`${BASE}/users`, { cache: "no-store" })
    if (!res.ok) {
        throw new Error(`HTTP ${res.status}`)
    }
    return (await res.json()) as User[]
}
