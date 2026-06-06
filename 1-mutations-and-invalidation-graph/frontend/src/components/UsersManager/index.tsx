import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Skeleton } from "@heroui/react"
import { createUser, deleteUser, fetchUsers, type User } from "../../lib/api"
import { AddUserForm } from "./AddUserForm"
import { UserList } from "./UserList"

/**
 * UsersManager — the shared lesson content used by both Local and Sandbox.
 *
 * useQuery + useMutation(create/delete) + invalidateQueries. Each mutation calls
 * invalidateQueries on success so the list re-fetches automatically — no manual
 * setState needed. The title/description are owned by App, so this body has no
 * heading of its own.
 */
export function UsersManager(): JSX.Element {
    const qc = useQueryClient()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")

    const query = useQuery<User[]>({ queryKey: ["users"], queryFn: fetchUsers })

    const addMutation = useMutation({
        mutationFn: createUser,
        onSuccess: () => {
            void qc.invalidateQueries({ queryKey: ["users"] })
            setName("")
            setEmail("")
        },
    })

    const deleteMutation = useMutation({
        mutationFn: deleteUser,
        onSuccess: () => void qc.invalidateQueries({ queryKey: ["users"] }),
    })

    return (
        <div className="flex flex-col">
            <AddUserForm
                name={name}
                email={email}
                onNameChange={setName}
                onEmailChange={setEmail}
                isPending={addMutation.isPending}
                onSubmit={() => {
                    if (name && email) {
                        addMutation.mutate({ name, email })
                    }
                }}
            />

            <div className="h-3" />

            {query.isPending ? (
                <div className="flex flex-col gap-1" data-testid="users-skeleton">
                    {[0, 1, 2].map((row) => (
                        <div key={row} className="flex items-center gap-3 px-2 py-2">
                            <Skeleton className="size-9 shrink-0 rounded-full" />
                            <div className="flex flex-1 flex-col gap-1.5">
                                <Skeleton className="h-3.5 w-28 rounded-md" />
                                <Skeleton className="h-3 w-40 rounded-md" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : query.isError ? (
                <p
                    className="py-6 text-center text-sm font-medium text-danger"
                    data-testid="users-error"
                >
                    Error: {(query.error as Error).message}
                </p>
            ) : (
                <UserList
                    users={query.data}
                    onDelete={(id) => deleteMutation.mutate(id)}
                />
            )}
        </div>
    )
}
