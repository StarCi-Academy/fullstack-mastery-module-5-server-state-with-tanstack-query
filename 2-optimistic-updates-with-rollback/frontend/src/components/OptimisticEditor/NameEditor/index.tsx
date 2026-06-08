import { Button, Checkbox, Input, Label, Spinner, TextField } from "@heroui/react"

interface NameEditorProps {
    draft: string
    shouldFail: boolean
    isPending: boolean
    onDraftChange: (v: string) => void
    onShouldFailChange: (v: boolean) => void
    onSave: () => void
}

/**
 * NameEditor — new-name input, fail checkbox, and save button.
 */
export const NameEditor = ({
    draft,
    shouldFail,
    isPending,
    onDraftChange,
    onShouldFailChange,
    onSave,
}: NameEditorProps): JSX.Element => {
    return (
        <div className="flex flex-col gap-3">
            <TextField
                className="flex flex-col gap-1.5"
                value={draft}
                onChange={onDraftChange}
            >
                <Label className="text-sm text-muted">New name</Label>
                <Input data-testid="input-name" placeholder="new name" />
            </TextField>

            <Checkbox
                data-testid="cb-fail"
                isSelected={shouldFail}
                onChange={onShouldFailChange}
            >
                <Checkbox.Control>
                    <Checkbox.Indicator />
                </Checkbox.Control>
                <Checkbox.Content>
                    <Label className="text-sm text-muted">Force server 500</Label>
                </Checkbox.Content>
            </Checkbox>

            <Button
                variant="primary"
                isPending={isPending}
                data-testid="btn-save"
                onPress={onSave}
            >
                {({ isPending: pending }) => (
                    <>
                        {pending ? <Spinner color="current" size="sm" /> : null}
                        Save
                    </>
                )}
            </Button>
        </div>
    )
}
