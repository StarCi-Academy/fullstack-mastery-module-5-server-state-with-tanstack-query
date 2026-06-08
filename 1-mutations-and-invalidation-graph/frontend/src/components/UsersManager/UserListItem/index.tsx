import { Avatar, AvatarFallback, AvatarImage, Button, Typography } from "@heroui/react"
import type { User } from "../../../lib/api"

interface UserListItemProps {
    user: User
    onDelete: (id: number) => void
}

const avatarUrl = (email: string) =>
    `https://i.pravatar.cc/120?u=${encodeURIComponent(email)}`

const initials = (name: string) =>
    name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase()

/**
 * UserListItem — avatar + name + email + delete button row.
 */
export const UserListItem = ({ user, onDelete }: UserListItemProps): JSX.Element => {
    return (
        <div className="flex items-center gap-3">
            <Avatar size="sm" className="shrink-0">
                <AvatarImage src={avatarUrl(user.email)} alt={user.name} />
                <AvatarFallback>{initials(user.name)}</AvatarFallback>
            </Avatar>
            <div className="flex min-w-0 flex-1 flex-col">
                <Typography.Paragraph size="sm" weight="medium" truncate>
                    {user.name}
                </Typography.Paragraph>
                <Typography.Paragraph size="xs" color="muted" truncate>
                    {user.email}
                </Typography.Paragraph>
            </div>
            <Button
                variant="danger"
                size="sm"
                data-testid={`delete-${user.id}`}
                onPress={() => onDelete(user.id)}
                aria-label={`Delete ${user.name}`}
            >
                Delete
            </Button>
        </div>
    )
}
