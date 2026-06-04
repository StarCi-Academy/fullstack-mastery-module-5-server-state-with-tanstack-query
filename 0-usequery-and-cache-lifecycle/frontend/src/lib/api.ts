/**
 * User type returned by NestJS stub.
 */
export type User = { id: number; name: string; email: string }

const BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:3000"

/**
 * Typed fetcher; QueryClient owns caching.
 */
export async function fetchUsers(): Promise<User[]> {
    const res = await fetch(`${BASE}/users`)
    if (!res.ok) {
        throw new Error(`HTTP ${res.status}`)
    }
    return (await res.json()) as User[]
}
