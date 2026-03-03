# PROJECT.md — Blog Project Rules

> This document is for agents. Written in English.

## Tech Stack

- **Language:** TypeScript (strict mode)
- **Package Manager:** pnpm
- **Node:** v23+

## Code Conventions

- **Semicolons:** No (omit)
- **Quotes:** Single quotes
- **Indentation:** 2 spaces
- **Trailing comma:** ES5
- **Line length:** 100 max
- **Naming:**
  - Files/folders: `kebab-case`
  - Components: `PascalCase`
  - Functions/variables: `camelCase`
  - Constants: `UPPER_SNAKE_CASE`
  - Types/Interfaces: `PascalCase` (no `I` prefix)
- **Imports:** Use path aliases (`@/`)
- **No `any`:** Use `unknown` if type is uncertain

## Linting & Formatting

- **ESLint:** Flat config (`eslint.config.mjs`)
  - `@typescript-eslint/recommended`
  - `no-console: warn` (except `console.error`)
  - `no-unused-vars: error`
- **Prettier:** Config in `prettier.config.mjs`
  - Matches code conventions above (no semi, single quote, 2 space, trailing comma es5)
  - Print width: 100
- **Husky + lint-staged:** Pre-commit hook runs lint + format on staged files
- Run `pnpm lint` and `pnpm format:check` before committing

## Branch Strategy

- **`main`** — Production-ready, always deployable
- **`dev`** — Integration branch, agents work here
- **`feat/<name>`** — Feature branches off `dev`
- **`fix/<name>`** — Bug fix branches off `dev`
- **Flow:** `feat/*` → PR to `dev` → PR to `main`
- Never push directly to `main`

## PR Rules

- PR title follows conventional commit format
- Description: what changed and why
- Reviewer (agent) must approve before merge
- Squash merge to keep history clean
- Delete branch after merge

## Testing

- **Framework:** Vitest
- **Coverage target:** 80%+ for utilities/logic, components tested for render
- **Test files:** Colocated as `*.test.ts` or `*.test.tsx`
- **Naming:** `describe('ModuleName', () => { it('should do X', ...) })`
- Run `pnpm test` before committing

## Environment Variables

- **Prefix:** `NEXT_PUBLIC_` for client-side (if Next.js), otherwise framework convention
- **File:** `.env.local` for local, `.env.example` committed with dummy values
- **Naming:** `UPPER_SNAKE_CASE`
- **Never commit secrets** — `.env*` in `.gitignore` (except `.env.example`)
- Access via `import.meta.env` or framework-provided method

## Error Handling

- **API/Data fetching:** Always use try/catch, return typed error objects
- **Components:** Use Error Boundaries for React
- **Pattern:**
  ```ts
  type Result<T> = { ok: true; data: T } | { ok: false; error: string }
  ```
- **No silent failures** — always log or surface errors
- **User-facing errors:** Friendly messages in 한국어

## Logging

- **Dev:** `console.error` and `console.warn` only (no `console.log`)
- **Production:** Use structured logging if server-side
- **Format:** `[module] message` (e.g., `[api] fetch failed`)
- **Sensitive data:** Never log tokens, passwords, or PII

## Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

feat:     New feature
fix:      Bug fix
docs:     Documentation
style:    Formatting (no logic change)
refactor: Code restructure (no behavior change)
test:     Tests
chore:    Build, deps, config
```

- Subject: lowercase, imperative, no period
- Scope: optional (e.g., `feat(auth): add login`)

## Folder Structure

```
blog/
├── PROJECT.md          # This file
├── WORKFLOW.md         # Agent workflow
├── REQUIREMENTS.md     # Project requirements (한국어)
├── roles/              # Agent role definitions
│   ├── architect.md
│   ├── developer.md
│   └── reviewer.md
├── docs/               # Design docs & specs (한국어)
└── src/                # Source code (created during dev)
```

## Communication Rules

- **Agent-to-agent:** English
- **User-facing docs** (REQUIREMENTS.md, docs/): 한국어
- **Code comments:** English
- **Commit messages:** English
