import { ListBox } from "@heroui/react"
import type { User } from "../../../lib/api"
import { UserListItem } from "../UserListItem"

interface UserListProps {
    users: User[]
    onDelete: (id: number) => void
}

/**
 * UserList — renders all users in a HeroUI ListBox.
 */
export function UserList({ users, onDelete }: UserListProps): JSX.Element {
    return (
        <ListBox
            aria-label="Users"
            selectionMode="none"
            data-testid="users-list"
            className="gap-3 p-0"
        >
            {users.map((user) => (
                <ListBox.Item
                    key={user.id}
                    id={String(user.id)}
                    textValue={user.name}
                    data-testid={`user-${user.id}`}
                    className="rounded-none p-0 data-[hovered=true]:bg-default-100"
                >
                    <UserListItem user={user} onDelete={onDelete} />
                </ListBox.Item>
            ))}
        </ListBox>
    )
}
