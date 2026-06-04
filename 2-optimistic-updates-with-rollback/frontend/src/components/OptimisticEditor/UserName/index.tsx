import { Avatar, AvatarFallback, AvatarImage } from "@heroui/react"
import type { User } from "../../../lib/api"

interface UserNameProps {
    user: User
}

const avatarUrl = (email: string) =>
    `https://i.pravatar.cc/120?u=${encodeURIComponent(email)}`

const initials = (name: string) =>
    name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase()

/**
 * UserName — displays the current (possibly optimistic) name for user #1.
 */
export function UserName({ user }: UserNameProps): JSX.Element {
    return (
        <div className="flex items-center gap-3 rounded-xl px-2 py-2">
            <Avatar size="sm" className="shrink-0">
                <AvatarImage src={avatarUrl(user.email)} alt={user.name} />
                <AvatarFallback>{initials(user.name)}</AvatarFallback>
            </Avatar>
            <div className="flex min-w-0 flex-col">
                <span
                    className="truncate text-sm font-medium text-foreground"
                    data-testid={`user-${user.id}-name`}
                >
                    {user.name}
                </span>
                <span className="truncate text-xs text-muted">{user.email}</span>
            </div>
        </div>
    )
}
