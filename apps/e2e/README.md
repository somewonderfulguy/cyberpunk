# @repo/e2e

Minimal Playwright end-to-end test app for `@repo/cyberpunk`.

## Usage

- Install deps at repo root (recommended):

```sh
pnpm install
```

- Install Playwright browsers (first time only):

```sh
pnpm --filter @repo/e2e install:browsers
```

- Run tests (this starts `@repo/cyberpunk` on port 7010 automatically):

```sh
pnpm --filter @repo/e2e test
```

- Open Playwright UI:

```sh
pnpm --filter @repo/e2e test:ui
```

The config is in `apps/e2e/playwright.config.ts` and uses a `webServer` to run `@repo/cyberpunk` via `pnpm --filter @repo/cyberpunk dev` and points tests to `http://localhost:7010`.
