/**
 * User type.
 */
export type User = { id: number; name: string; email: string }

const BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:3000"

/**
 * Fetch user list.
 */
export const fetchUsers = async (): Promise<User[]> => {
    const res = await fetch(`${BASE}/users`)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return (await res.json()) as User[]
}

/**
 * Patch user; if `fail`, append `?fail=true` so the server returns 500.
 */
export const patchUser = async (args: {
    id: number
    name: string
    fail?: boolean
}): Promise<User> => {
    const url = `${BASE}/users/${args.id}${args.fail ? "?fail=true" : ""}`
    const res = await fetch(url, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: args.name }),
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return (await res.json()) as User
}
