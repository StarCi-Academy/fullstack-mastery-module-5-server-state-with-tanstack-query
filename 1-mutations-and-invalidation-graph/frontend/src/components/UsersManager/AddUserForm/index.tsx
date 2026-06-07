import { Button, Input, Label, Spinner, TextField } from "@heroui/react"

interface AddUserFormProps {
    name: string
    email: string
    onNameChange: (v: string) => void
    onEmailChange: (v: string) => void
    isPending: boolean
    onSubmit: () => void
}

/**
 * AddUserForm — controlled form with name + email inputs and an add button.
 */
export function AddUserForm({
    name,
    email,
    onNameChange,
    onEmailChange,
    isPending,
    onSubmit,
}: AddUserFormProps): JSX.Element {
    return (
        <form
            className="flex flex-col gap-3"
            onSubmit={(e) => {
                e.preventDefault()
                onSubmit()
            }}
        >
            <TextField
                value={name}
                onChange={onNameChange}
            >
                <Label className="text-sm text-muted">Name</Label>
                <Input data-testid="input-name" placeholder="Alice" />
            </TextField>

            <TextField
                value={email}
                onChange={onEmailChange}
            >
                <Label className="text-sm text-muted">Email</Label>
                <Input data-testid="input-email" placeholder="alice@example.com" />
            </TextField>

            <Button
                type="submit"
                variant="primary"
                isPending={isPending}
                data-testid="btn-add"
            >
                {({ isPending: pending }) => (
                    <>
                        {pending ? <Spinner color="current" size="sm" /> : null}
                        Add user
                    </>
                )}
            </Button>
        </form>
    )
}
