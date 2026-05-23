import { Injectable, NotFoundException } from "@nestjs/common"
import type { CreateUserDto } from "./dto"

/**
 * Kiểu User (EN: User type).
 */
export interface User {
    id: number
    name: string
    email: string
}

/**
 * UsersService — in-memory store hỗ trợ list/create/delete.
 * (EN: UsersService — in-memory store supporting list/create/delete.)
 */
@Injectable()
export class UsersService {
    private users: User[] = [
        { id: 1, name: "Alice", email: "alice@example.com" },
        { id: 2, name: "Bob", email: "bob@example.com" },
    ]
    private nextId = 3

    /**
     * Trả về snapshot danh sách users.
     * (EN: Return a snapshot of the users list.)
     */
    findAll(): User[] {
        return [...this.users]
    }

    /**
     * Tạo user mới và push vào cuối list.
     * (EN: Create a new user and push to the end of the list.)
     */
    create(input: CreateUserDto): User {
        const user: User = { id: this.nextId, name: input.name, email: input.email }
        this.nextId += 1
        this.users.push(user)
        return user
    }

    /**
     * Xoá user theo id; 404 nếu không tồn tại.
     * (EN: Delete user by id; 404 if not found.)
     */
    remove(id: number): void {
        const before = this.users.length
        this.users = this.users.filter((u) => u.id !== id)
        if (this.users.length === before) {
            throw new NotFoundException(`User ${id} not found`)
        }
    }
}
