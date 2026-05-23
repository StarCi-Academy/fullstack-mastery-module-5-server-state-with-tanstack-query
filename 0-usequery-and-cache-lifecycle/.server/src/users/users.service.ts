import { Injectable } from "@nestjs/common"

/**
 * Kiểu User trong bộ nhớ (EN: In-memory User type).
 */
export interface User {
    id: number
    name: string
    email: string
}

/**
 * UsersService — lưu trữ tạm in-memory, đủ để minh hoạ vòng đời cache TanStack.
 * (EN: UsersService — in-memory store, sufficient to illustrate TanStack cache lifecycle.)
 */
@Injectable()
export class UsersService {
    private readonly seed: ReadonlyArray<User> = [
        { id: 1, name: "Alice", email: "alice@example.com" },
        { id: 2, name: "Bob", email: "bob@example.com" },
        { id: 3, name: "Charlie", email: "charlie@example.com" },
    ]

    /**
     * Lấy danh sách users; nếu `delayMs > 0` thì sleep để mô phỏng latency.
     * (EN: Return user list; if delayMs > 0, sleep to simulate latency.)
     */
    async findAll(delayMs: number): Promise<User[]> {
        if (delayMs > 0) {
            await new Promise<void>((resolve) => setTimeout(resolve, delayMs))
        }
        return [...this.seed]
    }
}
