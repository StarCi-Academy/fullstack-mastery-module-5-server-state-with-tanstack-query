import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import { Typography } from "@heroui/react"
import { UsersClient } from "../UsersClient"

/** Shared link styling (clickable, neutral). */
const LINK_CLASS =
    "text-sm font-medium text-foreground underline underline-offset-4 decoration-default-300 hover:decoration-foreground"

/**
 * Home — the `/` route. The users query is NOT mounted here, so leaving and
 * returning to `/users` is what demonstrates the cache lifecycle.
 */
function Home(): JSX.Element {
    return (
        <div className="flex flex-col">
            <Typography.Paragraph size="sm" color="muted">
                The users query is not mounted on this page. Open the users list to
                fetch (and cache) it, then come back here and return — the second
                visit is served from cache within <Typography.Code>staleTime</Typography.Code>.
            </Typography.Paragraph>
            <div className="h-3" />
            <Link to="/users" data-testid="link-users" className={LINK_CLASS}>
                Go to users →
            </Link>
        </div>
    )
}

/**
 * UsersRoute — the `/users` route: a back link plus the cached users list.
 */
function UsersRoute(): JSX.Element {
    return (
        <div className="flex flex-col">
            <Link to="/" data-testid="link-home" className={LINK_CLASS}>
                ← Back home
            </Link>
            <div className="h-3" />
            <UsersClient />
        </div>
    )
}

/**
 * Local — the default (no `?sandbox`) content: a two-route SPA so the cache
 * lifecycle is observable across navigation. `/` mounts no query; `/users`
 * mounts `UsersClient`. The QueryClient lives above this (in App), so the cache
 * survives route changes — re-entering `/users` within `staleTime` hits the
 * cache with no extra request. This is exactly what the Playwright specs drive
 * (`goto("/users")`, `link-home`/`link-users`).
 */
export function Local(): JSX.Element {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/users" element={<UsersRoute />} />
            </Routes>
        </BrowserRouter>
    )
}
