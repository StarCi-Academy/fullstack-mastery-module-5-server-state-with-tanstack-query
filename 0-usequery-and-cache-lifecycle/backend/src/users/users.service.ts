import { Injectable } from "@nestjs/common"

/**
 * In-memory User type.
 */
export interface User {
    id: number
    name: string
    email: string
}

/**
 * UsersService — in-memory store, sufficient to illustrate TanStack cache lifecycle.
 */
@Injectable()
export class UsersService {
    private readonly seed: ReadonlyArray<User> = [
        { id: 1, name: "Alice", email: "alice@example.com" },
        { id: 2, name: "Bob", email: "bob@example.com" },
        { id: 3, name: "Charlie", email: "charlie@example.com" },
    ]

    /**
     * Return user list snapshot.
     */
    findAll(): User[] {
        return [...this.seed]
    }
}
