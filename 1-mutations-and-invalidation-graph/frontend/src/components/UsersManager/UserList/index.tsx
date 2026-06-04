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
            className="gap-0.5"
        >
            {users.map((user) => (
                <ListBox.Item
                    key={user.id}
                    id={String(user.id)}
                    textValue={user.name}
                    data-testid={`user-${user.id}`}
                    className="rounded-xl px-2 py-2 data-[hovered=true]:bg-default-100"
                >
                    <UserListItem user={user} onDelete={onDelete} />
                </ListBox.Item>
            ))}
        </ListBox>
    )
}
