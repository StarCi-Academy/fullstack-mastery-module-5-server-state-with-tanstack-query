import { Injectable, NotFoundException } from "@nestjs/common"

/**
 * User type.
 */
export interface User {
    id: number
    name: string
    email: string
}

/**
 * UsersService — list + patch.
 */
@Injectable()
export class UsersService {
    private users: User[] = [
        { id: 1, name: "Alice", email: "alice@example.com" },
        { id: 2, name: "Bob", email: "bob@example.com" },
    ]

    /**
     * Return a snapshot of users.
     */
    findAll(): User[] {
        return [...this.users]
    }

    /**
     * Patch user by id; 404 when missing.
     */
    patch(id: number, change: { name?: string }): User {
        const idx = this.users.findIndex((u) => u.id === id)
        if (idx === -1) {
            throw new NotFoundException(`User ${id} not found`)
        }
        const updated: User = { ...this.users[idx], ...change }
        this.users[idx] = updated
        return updated
    }
}
