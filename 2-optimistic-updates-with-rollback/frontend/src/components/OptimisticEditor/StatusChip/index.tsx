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
 * StatusChip — shows current mutation state (idle / saving / error).
 */
export function StatusChip({ status }: StatusChipProps): JSX.Element {
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
