import { UsersManager } from "../UsersManager"

/**
 * Local — the default (no `?sandbox`) content: a single users manager.
 *
 * This is the canonical product UI that runs on `npm run dev` and that the
 * Playwright specs drive.
 */
export const Local = (): JSX.Element => {
    return <UsersManager />
}
