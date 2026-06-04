"use client"

import { useQuery } from "@tanstack/react-query"
import { Avatar, Button, Card, Chip, Skeleton } from "@heroui/react"
import { motion } from "framer-motion"
import { fetchUsers, type User } from "../lib/api"

/** Deterministic avatar photo per user (seeded by email). */
const avatarUrl = (email: string) =>
    `https://i.pravatar.cc/120?u=${encodeURIComponent(email)}`

/**
 * UsersPanel — renders the user list via useQuery with HeroUI polish.
 *
 * Observe isPending (Skeleton initial), isFetching (refresh Chip + timestamp),
 * and dataUpdatedAt (last fetch time) to learn the cache lifecycle.
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
        <div className="mx-auto flex max-w-2xl flex-col gap-5">
            {/* lesson intro: title + description */}
            <header className="flex flex-col gap-1.5">
                <h1 className="text-2xl font-bold tracking-tight text-foreground">
                    useQuery &amp; Cache Lifecycle
                </h1>
                <p className="text-sm leading-relaxed text-default-500">
                    A single <code className="rounded bg-default-100 px-1 py-0.5 text-xs">useQuery</code> subscribes
                    to the cache. Watch the status flip to <strong>refreshing</strong> and the
                    timestamp change on window focus — the list renders instantly from cache
                    while it re-validates.
                </p>
            </header>

            {/* users table card */}
            <Card className="overflow-hidden p-0">
                {/* card header: status + last-updated + refresh */}
                <div className="flex items-center justify-between gap-3 border-b border-default-100 px-5 py-3.5">
                    <div className="flex items-center gap-2">
                        <h2 className="text-base font-semibold text-foreground">Users</h2>
                        <Chip
                            color={query.isFetching ? "warning" : "success"}
                            variant="flat"
                            size="sm"
                            data-testid="users-fetching"
                        >
                            {query.isFetching ? "refreshing" : "idle"}
                        </Chip>
                    </div>
                    <div className="flex items-center gap-3">
                        <span
                            className="hidden text-xs text-default-400 sm:inline"
                            data-testid="users-updated-at"
                        >
                            {query.dataUpdatedAt
                                ? new Date(query.dataUpdatedAt).toLocaleTimeString()
                                : "—"}
                        </span>
                        <Button
                            size="sm"
                            variant="flat"
                            isLoading={query.isFetching}
                            onPress={() => { void query.refetch() }}
                        >
                            Refresh
                        </Button>
                    </div>
                </div>

                {/* table head */}
                <div className="grid grid-cols-[1fr_1fr] gap-3 bg-default-50 px-5 py-2.5 text-xs font-medium uppercase tracking-wide text-default-400">
                    <span>Name</span>
                    <span>Email</span>
                </div>

                {/* body: skeleton → error → animated rows */}
                {query.isPending ? (
                    <div className="flex flex-col" data-testid="users-skeleton">
                        {[0, 1, 2].map((row) => (
                            <div
                                key={row}
                                className="flex items-center gap-3 border-t border-default-100 px-5 py-3"
                            >
                                <Skeleton className="size-9 shrink-0 rounded-full" />
                                <div className="flex flex-1 flex-col gap-1.5">
                                    <Skeleton className="h-3.5 w-28 rounded" />
                                    <Skeleton className="h-3 w-40 rounded" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : query.isError ? (
                    <p
                        className="px-5 py-8 text-center text-sm font-medium text-danger"
                        data-testid="users-error"
                    >
                        Error: {(query.error as Error).message}
                    </p>
                ) : (
                    <ul className="flex flex-col" data-testid="users-list">
                        {query.data.map((user, index) => (
                            <motion.li
                                key={user.id}
                                data-testid={`user-${user.id}`}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.25, delay: index * 0.05 }}
                                className="grid grid-cols-[1fr_1fr] items-center gap-3 border-t border-default-100 px-5 py-3 transition-colors hover:bg-default-50"
                            >
                                <div className="flex min-w-0 items-center gap-3">
                                    <Avatar
                                        src={avatarUrl(user.email)}
                                        name={user.name}
                                        size="sm"
                                        className="shrink-0"
                                    />
                                    <span className="truncate font-medium text-foreground">
                                        {user.name}
                                    </span>
                                </div>
                                <span className="truncate text-sm text-default-500">
                                    {user.email}
                                </span>
                            </motion.li>
                        ))}
                    </ul>
                )}
            </Card>
        </div>
    )
}
