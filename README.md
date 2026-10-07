# Atelier

Next.js (App Router) + TypeScript + Tailwind CSS v4, with Better Auth, Drizzle ORM and Neon Postgres.

## Setup

```bash
pnpm install
cp .env.example .env.local   # fill in DATABASE_URL and BETTER_AUTH_SECRET
pnpm dev
```

## Structure

```
src/
  app/api/auth/[...all]/route.ts  Better Auth route handler
  db/index.ts                     Drizzle client (Neon serverless HTTP driver)
  db/schema.ts                    Drizzle schema entry point
  lib/auth.ts                     Better Auth server instance
  lib/auth-client.ts              Better Auth React client
drizzle.config.ts                 Drizzle Kit config
```

## Scripts

| Script               | Description                                        |
| -------------------- | -------------------------------------------------- |
| `pnpm dev`           | Start the dev server                               |
| `pnpm build`         | Production build                                   |
| `pnpm typecheck`     | Type-check with `tsc`                              |
| `pnpm lint`          | Lint with ESLint                                   |
| `pnpm auth:generate` | Generate Better Auth tables into `src/db/auth-schema.ts` |
| `pnpm db:generate`   | Generate SQL migrations from the schema            |
| `pnpm db:migrate`    | Apply migrations                                   |
| `pnpm db:push`       | Push the schema directly (prototyping)             |
| `pnpm db:studio`     | Open Drizzle Studio                                |

## Adding the auth tables

```bash
pnpm auth:generate
# then add to src/db/schema.ts:  export * from "./auth-schema";
pnpm db:generate && pnpm db:migrate
```
