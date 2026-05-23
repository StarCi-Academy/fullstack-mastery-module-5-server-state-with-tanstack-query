import { Injectable } from "@nestjs/common"

/**
 * Kiểu User (EN: User type).
 */
export interface User {
    id: number
    name: string
    email: string
}

/**
 * Trang dữ liệu cho cursor pagination.
 * (EN: Page payload for cursor pagination.)
 */
export interface UsersPage {
    data: User[]
    nextCursor: number | null
}

/**
 * UsersService — seed 25 users để demo nhiều page.
 * (EN: UsersService — seeds 25 users to demonstrate multiple pages.)
 */
@Injectable()
export class UsersService {
    private readonly users: ReadonlyArray<User> = Array.from({ length: 25 }, (_, i) => ({
        id: i + 1,
        name: `User #${i + 1}`,
        email: `user${i + 1}@example.com`,
    }))

    /**
     * Trả slice từ cursor + limit; nextCursor=null khi hết.
     * (EN: Return slice [cursor, cursor+limit); nextCursor=null when exhausted.)
     */
    findPage(cursor: number, limit: number): UsersPage {
        const safeCursor = Math.max(0, cursor)
        const safeLimit = Math.max(1, Math.min(50, limit))
        const slice = this.users.slice(safeCursor, safeCursor + safeLimit)
        const end = safeCursor + safeLimit
        return {
            data: [...slice],
            nextCursor: end < this.users.length ? end : null,
        }
    }
}
