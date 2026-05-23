"use client"
import { Button, Input, Label, TextField } from "@heroui/react"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useState, type FormEvent } from "react"
import { createUser, deleteUser, fetchUsers, type User } from "../lib/api"

/**
 * UsersManager — list + add form + delete button.
 * useMutation gọi invalidateQueries(["users"]) trong onSuccess để cập nhật danh sách.
 * (EN: UsersManager — list + add form + delete button.
 * useMutation calls invalidateQueries(["users"]) in onSuccess to refresh the list.)
 */
export function UsersManager(): JSX.Element {
    const qc = useQueryClient()
    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")

    const usersQuery = useQuery<User[]>({ queryKey: ["users"], queryFn: fetchUsers })

    const addMutation = useMutation({
        mutationFn: createUser,
        onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] }),
    })
    const removeMutation = useMutation({
        mutationFn: deleteUser,
        onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] }),
    })

    /**
     * Submit form thêm user (EN: Submit add-user form).
     */
    const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        if (!name || !email) return
        addMutation.mutate({ name, email })
        setName("")
        setEmail("")
    }

    if (usersQuery.isPending) return <div data-testid="users-skeleton">Loading…</div>
    if (usersQuery.isError) return <div data-testid="users-error">Error</div>

    return (
        <div>
            <form onSubmit={onSubmit} data-testid="add-form">
                <Input
                    data-testid="input-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="name"
                />
                <Input
                    data-testid="input-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email"
                />
                <Button type="submit" data-testid="btn-add">
                    Add user
                </Button>
            </form>

            <ul data-testid="users-list">
                {usersQuery.data.map((u) => (
                    <li key={u.id} data-testid={`user-${u.id}`}>
                        {u.name} — {u.email}
                        <Button
                            type="button"
                            data-testid={`delete-${u.id}`}
                            onClick={() => removeMutation.mutate(u.id)}
                        >
                            Delete
                        </Button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
