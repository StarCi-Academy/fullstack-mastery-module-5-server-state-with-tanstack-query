import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import { ArrowRight, ArrowLeft, UsersThree } from "@phosphor-icons/react"
import { HeroUIProvider } from "./components/providers"
import { QueryProvider } from "./lib/query-client"
import { UsersPanel } from "./components"

/**
 * Home page — the lesson intro. Links to /users; navigating between the two
 * routes within staleTime must NOT trigger a refetch (flow 2).
 */
function HomePage(): JSX.Element {
    return (
        <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center gap-6 p-6">
            <div className="flex flex-col items-center gap-4 text-center">
                <div className="grid size-14 place-items-center rounded-2xl bg-accent/15 text-accent">
                    <UsersThree size={30} weight="duotone" />
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                    useQuery &amp; Cache Lifecycle
                </h1>
                <p className="max-w-md text-sm leading-relaxed text-default-500">
                    Open the users page, then come back and open it again within 30
                    seconds — the list renders instantly from cache with no second
                    network request. Blur and refocus the tab to watch a background
                    refetch.
                </p>
                <Link
                    to="/users"
                    data-testid="link-users"
                    className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition hover:opacity-90"
                >
                    Open users
                    <ArrowRight size={16} weight="bold" />
                </Link>
            </div>
        </main>
    )
}

/**
 * Users page — renders the cached user list with a link back home.
 */
function UsersPage(): JSX.Element {
    return (
        <main className="mx-auto flex min-h-screen max-w-2xl flex-col gap-5 p-6">
            <Link
                to="/"
                data-testid="link-home"
                className="inline-flex w-fit items-center gap-1.5 text-sm text-default-500 transition hover:text-foreground"
            >
                <ArrowLeft size={15} weight="bold" />
                Home
            </Link>
            <UsersPanel />
        </main>
    )
}

/**
 * App root — providers + client-side routing between Home and Users so the
 * cache-lifecycle flows (navigate within staleTime, refetch on focus) work.
 */
export default function App(): JSX.Element {
    return (
        <HeroUIProvider>
            <QueryProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/users" element={<UsersPage />} />
                    </Routes>
                </BrowserRouter>
            </QueryProvider>
        </HeroUIProvider>
    )
}
