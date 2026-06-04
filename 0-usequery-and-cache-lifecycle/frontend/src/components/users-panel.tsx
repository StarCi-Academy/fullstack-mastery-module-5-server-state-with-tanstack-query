"use client"

import { useQuery } from "@tanstack/react-query"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
    Button,
    ListBox,
    Skeleton,
    Spinner,
} from "@heroui/react"
import { ArrowsClockwise } from "@phosphor-icons/react"
import { fetchUsers, type User } from "../lib/api"

/** Deterministic avatar photo per user (seeded by email). */
const avatarUrl = (email: string) =>
    `https://i.pravatar.cc/120?u=${encodeURIComponent(email)}`

/** Two-letter initials fallback from a name. */
const initials = (name: string) =>
    name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase()

/**
 * UsersPanel — renders the user list via useQuery.
 *
 * Observe isPending (Skeleton initial) and isFetching (spinner on the refresh
 * button) to learn the cache lifecycle.
 */
export function UsersPanel(): JSX.Element {
    const query = useQuery<User[]>({
        queryKey: ["users"],
        queryFn: fetchUsers,
        // 'always' makes the window-focus flow refetch regardless of staleTime —
        // the cache still returns instantly while it re-validates in the background.
        refetchOnWindowFocus: "always",
    })

    return (
        <div className="flex flex-col">
            {/* lesson intro */}
            <div className="text-base font-semibold text-foreground">
                useQuery &amp; Cache Lifecycle
            </div>
            <div className="h-3" />
            <div className="text-sm text-muted">
                A single useQuery subscribes to the cache — it renders instantly from
                cache and re-validates in the background on window focus.
            </div>

            <div className="h-6" />

            {/* refresh action */}
            <div className="flex justify-end">
                <Button
                    variant="primary"
                    isPending={query.isFetching}
                    onPress={() => { void query.refetch() }}
                >
                    {({ isPending }) => (
                        <>
                            Refresh
                            {isPending
                                ? <Spinner />
                                : <ArrowsClockwise className="size-5" weight="bold" />}
                        </>
                    )}
                </Button>
            </div>

            <div className="h-3" />

            {/* body: skeleton → error → list */}
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
                <p className="py-6 text-center text-sm font-medium text-danger" data-testid="users-error">
                    Error: {(query.error as Error).message}
                </p>
            ) : (
                <ListBox
                    aria-label="Users"
                    selectionMode="none"
                    data-testid="users-list"
                    className="gap-0.5"
                >
                    {query.data.map((user) => (
                        <ListBox.Item
                            key={user.id}
                            id={String(user.id)}
                            textValue={user.name}
                            data-testid={`user-${user.id}`}
                            className="rounded-xl px-2 py-2 data-[hovered=true]:bg-default-100"
                        >
                            <div className="flex items-center gap-3">
                                <Avatar size="sm" className="shrink-0">
                                    <AvatarImage src={avatarUrl(user.email)} alt={user.name} />
                                    <AvatarFallback>{initials(user.name)}</AvatarFallback>
                                </Avatar>
                                <div className="flex min-w-0 flex-col">
                                    <span className="truncate text-sm font-medium text-foreground">
                                        {user.name}
                                    </span>
                                    <span className="truncate text-xs text-muted">
                                        {user.email}
                                    </span>
                                </div>
                            </div>
                        </ListBox.Item>
                    ))}
                </ListBox>
            )}
        </div>
    )
}
