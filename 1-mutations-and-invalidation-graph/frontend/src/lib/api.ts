/**
 * Kiểu User trả về từ stub NestJS (EN: User type returned by NestJS stub).
 */
export type User = { id: number; name: string; email: string }

const BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:3000"

/**
 * Lấy danh sách users (EN: Fetch user list).
 */
export async function fetchUsers(): Promise<User[]> {
    const res = await fetch(`${BASE}/users`, { cache: "no-store" })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return (await res.json()) as User[]
}

/**
 * Tạo user mới (EN: Create a new user).
 */
export async function createUser(input: { name: string; email: string }): Promise<User> {
    const res = await fetch(`${BASE}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return (await res.json()) as User
}

/**
 * Xoá user theo id (EN: Delete user by id).
 */
export async function deleteUser(id: number): Promise<void> {
    const res = await fetch(`${BASE}/users/${id}`, { method: "DELETE" })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
}
