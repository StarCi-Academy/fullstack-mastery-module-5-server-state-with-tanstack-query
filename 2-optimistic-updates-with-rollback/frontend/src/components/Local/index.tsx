import { OptimisticEditor } from "../OptimisticEditor"

/**
 * Local — the default (no `?sandbox`) content: a single optimistic editor.
 *
 * This is the canonical product UI that runs on `npm run dev` and that the
 * Playwright specs drive.
 */
export function Local(): JSX.Element {
    return <OptimisticEditor />
}
