/**
 * Kiểu User (EN: User type).
 */
export type User = { id: number; name: string; email: string }

/**
 * Trang dữ liệu trả về cho cursor pagination.
 * (EN: Page payload for cursor pagination.)
 */
export interface UsersPage {
    data: User[]
    nextCursor: number | null
}

const BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:3000"

/**
 * Fetch một page bằng cursor + limit (EN: Fetch a single page by cursor + limit).
 */
export async function fetchUsersPage(args: {
    cursor: number
    limit: number
}): Promise<UsersPage> {
    const url = `${BASE}/users?cursor=${args.cursor}&limit=${args.limit}`
    const res = await fetch(url, { cache: "no-store" })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return (await res.json()) as UsersPage
}
