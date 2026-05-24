"use client"
import { Button, Input, Label, TextField } from "@heroui/react"
import { useFormik } from "formik"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createUser, deleteUser, fetchUsers, type User } from "../lib/api"

/**
 * UsersManager — list + add form (Formik + HeroUI TextField) + delete button.
 * useMutation gọi invalidateQueries(["users"]) trong onSuccess để cập nhật danh sách.
 * (EN: UsersManager — list + add form [Formik + HeroUI TextField] + delete button.
 * useMutation calls invalidateQueries(["users"]) in onSuccess to refresh the list.)
 */
export function UsersManager(): JSX.Element {
    const qc = useQueryClient()

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
     * Formik xử lý state form + validate + reset.
     * (EN: Formik manages form state, validation, and reset.)
     */
    const formik = useFormik<{ name: string; email: string }>({
        initialValues: { name: "", email: "" },
        validate: (values) => {
            const errors: Partial<Record<"name" | "email", string>> = {}
            if (!values.name) errors.name = "name is required"
            if (!values.email) errors.email = "email is required"
            return errors
        },
        onSubmit: (values, { resetForm }) => {
            addMutation.mutate(values, {
                onSuccess: () => resetForm(),
            })
        },
    })

    if (usersQuery.isPending) return <div data-testid="users-skeleton">Loading…</div>
    if (usersQuery.isError) return <div data-testid="users-error">Error</div>

    return (
        <div className="flex flex-col gap-3">
            <form onSubmit={formik.handleSubmit} data-testid="add-form" className="flex flex-col gap-2">
                <TextField
                    name="name"
                    value={formik.values.name}
                    onChange={(v: string) => formik.setFieldValue("name", v)}
                >
                    <Label>Name</Label>
                    <Input data-testid="input-name" placeholder="name" />
                </TextField>
                <TextField
                    name="email"
                    type="email"
                    value={formik.values.email}
                    onChange={(v: string) => formik.setFieldValue("email", v)}
                >
                    <Label>Email</Label>
                    <Input data-testid="input-email" placeholder="email" />
                </TextField>
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
                            onPress={() => removeMutation.mutate(u.id)}
                        >
                            Delete
                        </Button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
