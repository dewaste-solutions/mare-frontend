# Standards

## Naming conventions

- `kebab-case` - for all folders/files.
- `PascalCase` - for classes and types.
- `snake_case` - for database tables and columns.
- `camelCase` - for functions, zod schemas and etc.

## Folder structure
We're going to use this [Feature-Based structure](https://dev.to/sathishskdev/part-2-folder-structure-building-a-solid-foundation-omh).

### Root
- `src/` - Main source code directory.

## Router
- `src/<router-name>/page.tsx` – Home page route.
- `src/<router-name>/layout.tsx` – React nested layout for the page.
- `src/<router-name>/error.tsx` – React error boundary.
- `src/<router-name>/loading.tsx` – React Suspense fallback.
- `src/<router-name>/not-found.tsx` – React 404 fallback.

## Feature
- `src/feature/<router-name>/components` - Components specific to the page
- `src/feature/<router-name>/constants` - Static values/constants for the page
- `src/feature/<router-name>/data` - Data access layer. (e.g. `api`, `database`).
- `src/feature/<router-name>/mutation` - `react-query` mutation. **(Only if needed)**
- `src/feature/<router-name>/query` - `react-query` query. **(Only if needed)**
- `src/feature/<router-name>/stores` - Zustand stores specific to the page
- `src/feature/<router-name>/types` - Type definitions for the page
- `src/feature/<router-name>/utils` - Utility functions for the page
- `src/feature/<router-name>/hooks` - Hooks for the page
- `src/feature/<router-name>/action` - Server Action for the page

### Shared (only use this folder if the function use twice in different pages)

- `src/shared` - Shared modules.
  - `src/shared/components` - Shared components.
    - `src/shared/components/shadcn/ui/*` - Shared shadcn ui components (`button`, `input` & etc).
  - `src/shared/constants` - Shared constants.
  - `src/shared/data` - Data access layer. (e.g. `api`, `database`).
  - `src/shared/mutation` - Shared `react-query` mutation. **(Only if needed)**
  - `src/shared/query` - Shared `react-query` query. **(Only if needed)**
  - `src/shared/stores` - Shared zustand stores.
  - `src/shared/types` - Shared types.
  - `src/shared/utils` - Shared utilities.
  - `src/feature/<router-name>/hooks` - Hooks for the page
  - `src/feature/<router-name>/action` - Server Action for the page

---
## notes
- Always run `npm run biome:write` (not necessarily after every change, but always before pushing to GitHub)
  - This ensures you catch errors early before GitHub Actions run.
- client component will render once in server
- Don't put "use client" in `page.tsx`, it's ideally for components.
- margin
  - [Margin considered harmful](https://mxstbr.com/thoughts/margin)
  - [The Rules of Margin Collapse](https://www.joshwcomeau.com/css/rules-of-margin-collapse/)