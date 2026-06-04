import { Chip } from "@heroui/react"

type Status = "idle" | "saving" | "error"

interface StatusChipProps {
    status: Status
}

const colorMap: Record<Status, "default" | "warning" | "danger"> = {
    idle: "default",
    saving: "warning",
    error: "danger",
}

/**
 * StatusChip — shows the active mutation state (saving / error). Renders nothing
 * while idle, so the editor header stays clean until something is happening.
 */
export function StatusChip({ status }: StatusChipProps): JSX.Element | null {
    if (status === "idle") {
        return null
    }
    return (
        <Chip
            variant="soft"
            color={colorMap[status]}
            size="sm"
            data-testid="status"
        >
            {status}
        </Chip>
    )
}
