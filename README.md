# Fullstack Mastery — Module 5 — Server State with TanStack Query

FE-primary scaffold for the 4 lessons of M5 (mount slot `4-server-state-with-tanstack-query`).

## Lessons

- `0-usequery-and-cache-lifecycle` — useQuery + queryKey + staleTime/gcTime + refetch-on-focus
- `1-mutations-and-invalidation-graph` — useMutation + invalidateQueries cascade
- `2-optimistic-updates-with-rollback` — onMutate/onError optimistic + rollback
- `3-infinite-query-and-pagination` — useInfiniteQuery + cursor pagination

## Layout per lesson (FE-primary)

```
<L>-<slug>/
├── src/              Next.js (port 3001) — primary subject
├── .server/          NestJS stub (port 3000) — data source
├── .playwright/      Playwright config + scripts (1 spec per content flow)
├── .docker/          Infra-only compose (no api/web)
├── package.json      FE root (next + @tanstack/react-query + @playwright/test)
├── tsconfig.json
├── next.config.ts
└── .env.local
```

## Run a lesson

```bash
cd <L>-<slug>

# Terminal 1 — start NestJS stub (port 3000)
cd .server && npm install && npm run start:dev

# Terminal 2 — start Next.js FE (port 3001)
npm install && npm run dev

# Terminal 3 — run a Playwright flow
npx playwright test .playwright/scripts/flow-1-<slug>.spec.ts --headed
```
