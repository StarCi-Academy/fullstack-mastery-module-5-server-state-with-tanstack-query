import { Avatar, AvatarFallback, AvatarImage } from "@heroui/react"
import type { User } from "../../../lib/api"

interface UserListItemProps {
    user: User
}

const avatarUrl = (email: string) =>
    `https://i.pravatar.cc/120?u=${encodeURIComponent(email)}`

const initials = (name: string) =>
    name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase()

/**
 * UserListItem — avatar + name + email row.
 */
export function UserListItem({ user }: UserListItemProps): JSX.Element {
    return (
        <div className="flex items-center gap-3">
            <Avatar size="sm" className="shrink-0">
                <AvatarImage src={avatarUrl(user.email)} alt={user.name} />
                <AvatarFallback>{initials(user.name)}</AvatarFallback>
            </Avatar>
            <div className="flex min-w-0 flex-col">
                <span className="truncate text-sm font-medium text-foreground">
                    {user.name}
                </span>
                <span className="truncate text-xs text-muted">{user.email}</span>
            </div>
        </div>
    )
}
