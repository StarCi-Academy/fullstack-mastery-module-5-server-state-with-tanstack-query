/**
 * User type.
 */
export type User = { id: number; name: string; email: string }

const BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:3000"

/**
 * Fetch user list.
 */
export async function fetchUsers(): Promise<User[]> {
    const res = await fetch(`${BASE}/users`, { cache: "no-store" })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return (await res.json()) as User[]
}

/**
 * Patch user; if `fail`, append `?fail=true` so the server returns 500.
 */
export async function patchUser(args: {
    id: number
    name: string
    fail?: boolean
}): Promise<User> {
    const url = `${BASE}/users/${args.id}${args.fail ? "?fail=true" : ""}`
    const res = await fetch(url, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: args.name }),
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return (await res.json()) as User
}
