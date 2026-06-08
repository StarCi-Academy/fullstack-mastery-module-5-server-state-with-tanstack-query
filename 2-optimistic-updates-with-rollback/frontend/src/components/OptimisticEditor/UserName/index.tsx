import { Avatar, AvatarFallback, AvatarImage, Typography } from "@heroui/react"
import type { User } from "../../../lib/api"

interface UserNameProps {
    /** User row to display (name may reflect an optimistic cache write). */
    user: User
}

const avatarUrl = (email: string) =>
    `https://i.pravatar.cc/120?u=${encodeURIComponent(email)}`

const initials = (name: string) =>
    name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase()

/**
 * UserName — displays the current (possibly optimistic) name for user #1.
 */
export const UserName = ({ user }: UserNameProps): JSX.Element => {
    return (
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
                    data-testid={`user-${user.id}-name`}
                >
                    {user.name}
                </Typography.Paragraph>
                <Typography.Paragraph size="xs" color="muted" truncate>
                    {user.email}
                </Typography.Paragraph>
            </div>
        </div>
    )
}
