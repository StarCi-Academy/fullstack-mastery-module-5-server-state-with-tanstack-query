"use client"
import { Avatar, Button, Card, Chip, Input, Label, Skeleton, TextField } from "@heroui/react"
import { useFormik } from "formik"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createUser, deleteUser, fetchUsers, type User } from "../lib/api"

/**
 * UsersManager — list + add form (Formik + HeroUI) + delete button with polish.
 *
 * `useMutation` calls `invalidateQueries(["users"])` in `onSuccess` to refresh the list.
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
     * Formik manages form state, validation, and reset.
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

    if (usersQuery.isPending) {
        return (
            <Card className="p-6 flex flex-col gap-3" data-testid="users-skeleton">
                <Skeleton className="h-10 w-full rounded-medium" />
                <Skeleton className="h-10 w-full rounded-medium" />
                <Skeleton className="h-12 w-full rounded-medium" />
            </Card>
        )
    }
    if (usersQuery.isError) {
        return (
            <Card
                className="p-6 border border-danger-200 bg-danger-50"
                data-testid="users-error"
            >
                <p className="text-danger font-semibold">Error loading users</p>
            </Card>
        )
    }

    return (
        <div className="flex flex-col gap-4">
            <Card className="p-6">
                <form
                    onSubmit={formik.handleSubmit}
                    data-testid="add-form"
                    className="flex flex-col gap-3"
                >
                    <h2 className="text-lg font-semibold">Add a user</h2>
                    <TextField
                        name="name"
                        value={formik.values.name}
                        onChange={(v: string) => formik.setFieldValue("name", v)}
                        className="flex flex-col gap-1"
                    >
                        <Label className="text-sm text-default-500">Name</Label>
                        <Input data-testid="input-name" placeholder="Alice" />
                    </TextField>
                    <TextField
                        name="email"
                        type="email"
                        value={formik.values.email}
                        onChange={(v: string) => formik.setFieldValue("email", v)}
                        className="flex flex-col gap-1"
                    >
                        <Label className="text-sm text-default-500">Email</Label>
                        <Input data-testid="input-email" placeholder="alice@example.com" />
                    </TextField>
                    <Button
                        type="submit"
                        color="primary"
                        isLoading={addMutation.isPending}
                        data-testid="btn-add"
                    >
                        Add user
                    </Button>
                </form>
            </Card>

            <Card className="p-6">
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-lg font-semibold">Users</h2>
                    <Chip
                        size="sm"
                        variant="flat"
                        color={usersQuery.isFetching ? "warning" : "default"}
                    >
                        {usersQuery.isFetching ? "refreshing" : `${usersQuery.data.length} total`}
                    </Chip>
                </div>
                <ul
                    data-testid="users-list"
                    className="flex flex-col gap-2"
                >
                    {usersQuery.data.map((u) => (
                        <li
                            key={u.id}
                            data-testid={`user-${u.id}`}
                            className="flex items-center gap-3 p-3 rounded-medium bg-default-50"
                        >
                            <Avatar name={u.name} size="sm" color="primary" />
                            <div className="flex flex-col flex-1 min-w-0">
                                <span className="font-semibold text-foreground truncate">
                                    {u.name}
                                </span>
                                <span className="text-default-500 text-sm truncate">
                                    {u.email}
                                </span>
                            </div>
                            <Button
                                type="button"
                                size="sm"
                                variant="flat"
                                color="danger"
                                data-testid={`delete-${u.id}`}
                                onPress={() => removeMutation.mutate(u.id)}
                            >
                                Delete
                            </Button>
                        </li>
                    ))}
                </ul>
            </Card>
        </div>
    )
}
