"use client"

import { useQuery } from "@tanstack/react-query"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
    Button,
    ErrorMessage,
    ListBox,
    Skeleton,
    Spinner,
    Typography,
} from "@heroui/react"
import { fetchUsers, type User } from "../../lib/api"

/** Deterministic avatar photo per user (seeded by email). */
const avatarUrl = (email: string) =>
    `https://i.pravatar.cc/120?u=${encodeURIComponent(email)}`

/** Two-letter initials fallback from a name. */
const initials = (name: string) =>
    name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase()

/**
 * UsersClient — the shared lesson content used by both Local and Sandbox.
 *
 * Renders the user list via useQuery. Observe isPending (Skeleton initial) and
 * isFetching (spinner on the refresh button) to learn the cache lifecycle. The
 * title/description are owned by App, so this body has no heading of its own.
 */
export const UsersClient = (): JSX.Element => {
    const query = useQuery<User[]>({
        queryKey: ["users"],
        queryFn: fetchUsers,
        // 'always' makes the window-focus flow refetch regardless of staleTime —
        // the cache still returns instantly while it re-validates in the background.
        refetchOnWindowFocus: "always",
    })

    return (
        <div className="flex flex-col gap-6">
            {/* refresh action */}
            <div className="flex justify-start">
                <Button
                    variant="primary"
                    isPending={query.isFetching}
                    onPress={() => { void query.refetch() }}
                >
                    {({ isPending }) => (
                        <>
                            {isPending ? <Spinner color="current" size="sm" /> : null}
                            Refetch
                        </>
                    )}
                </Button>
            </div>

            {/* body: skeleton → error → list */}
            {query.isPending ? (
                <div className="flex flex-col gap-3" data-testid="users-skeleton">
                    {[0, 1, 2].map((row) => (
                        <div key={row} className="flex items-center gap-3">
                            <Skeleton className="size-9 shrink-0 rounded-full" />
                            <div className="flex flex-1 flex-col">
                                <Skeleton className="h-3.5 w-28 rounded-md" />
                                <Skeleton className="h-3 w-40 rounded-md" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : query.isError ? (
                <ErrorMessage
                    data-testid="users-error"
                >
                    Error: {(query.error as Error).message}
                </ErrorMessage>
            ) : (
                <ListBox
                    aria-label="Users"
                    selectionMode="none"
                    data-testid="users-list"
                    className="gap-1 p-0"
                >
                    {query.data.map((user) => (
                        <ListBox.Item
                            key={user.id}
                            id={String(user.id)}
                            textValue={user.name}
                            data-testid={`user-${user.id}`}
                            className="data-[hovered=true]:bg-default-100"
                        >
                            <div className="flex items-center gap-3">
                                <Avatar size="sm" className="shrink-0">
                                    <AvatarImage src={avatarUrl(user.email)} alt={user.name} />
                                    <AvatarFallback>{initials(user.name)}</AvatarFallback>
                                </Avatar>
                                <div className="flex min-w-0 flex-col">
                                    <Typography.Paragraph
                                        size="sm"
                                        weight="medium"
                                        truncate
                                    >
                                        {user.name}
                                    </Typography.Paragraph>
                                    <Typography.Paragraph
                                        size="xs"
                                        color="muted"
                                        truncate
                                    >
                                        {user.email}
                                    </Typography.Paragraph>
                                </div>
                            </div>
                        </ListBox.Item>
                    ))}
                </ListBox>
            )}
        </div>
    )
}
