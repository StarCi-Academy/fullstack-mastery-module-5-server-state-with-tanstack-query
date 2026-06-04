"use client"

import { useQuery } from "@tanstack/react-query"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
    Button,
    Card,
    Chip,
    Skeleton,
} from "@heroui/react"
import { motion } from "framer-motion"
import {
    ArrowsClockwise,
    Clock,
    EnvelopeSimple,
    UsersThree,
} from "@phosphor-icons/react"
import { fetchUsers, type User } from "../lib/api"

/** Deterministic avatar photo per user (seeded by email). */
const avatarUrl = (email: string) =>
    `https://i.pravatar.cc/120?u=${encodeURIComponent(email)}`

/** Two-letter initials fallback from a name. */
const initials = (name: string) =>
    name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase()

/**
 * UsersPanel — renders the user list via useQuery with HeroUI v3 polish.
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
        <div className="mx-auto flex max-w-2xl flex-col gap-6">
            {/* lesson intro: icon badge + title + description */}
            <header className="flex items-start gap-4">
                <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-accent/15 text-accent">
                    <UsersThree size={26} weight="duotone" />
                </div>
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">
                        useQuery &amp; Cache Lifecycle
                    </h1>
                    <p className="text-sm leading-relaxed text-default-500">
                        One <code className="rounded bg-default-100 px-1 py-0.5 text-xs">useQuery</code> subscribes
                        to the cache. The status flips to <strong>refreshing</strong> and the
                        timestamp updates on focus — the list renders instantly from cache
                        while re-validating.
                    </p>
                </div>
            </header>

            {/* users table card */}
            <Card className="overflow-hidden p-0 shadow-sm">
                {/* card header: title + count + status + refresh */}
                <div className="flex items-center justify-between gap-3 border-b border-default-100 px-5 py-4">
                    <div className="flex items-center gap-2.5">
                        <h2 className="text-base font-semibold text-foreground">Users</h2>
                        {!query.isPending && !query.isError && (
                            <Chip size="sm" variant="soft" color="default">
                                {query.data.length}
                            </Chip>
                        )}
                        <Chip
                            size="sm"
                            variant="soft"
                            color={query.isFetching ? "warning" : "success"}
                            data-testid="users-fetching"
                        >
                            {query.isFetching ? "refreshing" : "idle"}
                        </Chip>
                    </div>
                    <div className="flex items-center gap-3">
                        <span
                            className="hidden items-center gap-1 text-xs text-default-400 sm:flex"
                            data-testid="users-updated-at"
                        >
                            <Clock size={13} weight="bold" />
                            {query.dataUpdatedAt
                                ? new Date(query.dataUpdatedAt).toLocaleTimeString()
                                : "—"}
                        </span>
                        <Button
                            size="sm"
                            variant="secondary"
                            isPending={query.isFetching}
                            onPress={() => { void query.refetch() }}
                        >
                            <ArrowsClockwise size={15} weight="bold" />
                            Refresh
                        </Button>
                    </div>
                </div>

                {/* table head */}
                <div className="grid grid-cols-[1.2fr_1fr] gap-3 bg-default-50 px-5 py-2.5 text-xs font-medium uppercase tracking-wide text-default-400">
                    <span>Name</span>
                    <span>Email</span>
                </div>

                {/* body: skeleton → error → animated rows */}
                {query.isPending ? (
                    <div className="flex flex-col" data-testid="users-skeleton">
                        {[0, 1, 2].map((row) => (
                            <div
                                key={row}
                                className="flex items-center gap-3 border-t border-default-100 px-5 py-3.5"
                            >
                                <Skeleton className="size-10 shrink-0 rounded-full" />
                                <div className="flex flex-1 flex-col gap-1.5">
                                    <Skeleton className="h-3.5 w-28 rounded-md" />
                                    <Skeleton className="h-3 w-44 rounded-md" />
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
                                className="grid grid-cols-[1.2fr_1fr] items-center gap-3 border-t border-default-100 px-5 py-3.5 transition-colors hover:bg-default-50"
                            >
                                <div className="flex min-w-0 items-center gap-3">
                                    <Avatar size="sm" className="shrink-0">
                                        <AvatarImage src={avatarUrl(user.email)} alt={user.name} />
                                        <AvatarFallback>{initials(user.name)}</AvatarFallback>
                                    </Avatar>
                                    <span className="truncate font-medium text-foreground">
                                        {user.name}
                                    </span>
                                </div>
                                <span className="flex min-w-0 items-center gap-1.5 text-sm text-default-500">
                                    <EnvelopeSimple size={14} weight="bold" className="shrink-0 text-default-400" />
                                    <span className="truncate">{user.email}</span>
                                </span>
                            </motion.li>
                        ))}
                    </ul>
                )}
            </Card>
        </div>
    )
}
