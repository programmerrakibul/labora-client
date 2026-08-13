# AGENTS.md

Guidance for AI agents working in this repository.

## Overview

Labora is a React 19 + Vite 7 single-page app for a freelance job marketplace.
Plain JavaScript (JSX) — **no TypeScript**. It talks to a REST backend at
`{VITE_API_BASE_URL}/api` using cookie-based sessions (better-auth).

## Commands

- Install: `pnpm install` (pnpm is the package manager — never use npm/yarn)
- Dev server: `pnpm run dev` (port 3000)
- Build: `pnpm run build`
- Lint: `pnpm run lint` (ESLint flat config, `eslint .`)
- Preview: `pnpm run preview`

There is no test runner, typecheck, or CI configured.

## Environment Variables

Only one variable is read by the app:

| Variable            | Usage                                                                                                                            |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `VITE_API_BASE_URL` | Axios base URL (`{VITE_API_BASE_URL}/api`) in `src/lib/axios.js`; better-auth `createAuthClient` baseURL in `src/stores/auth.js` |

Copy `.env.example` to `.env.local` for local development. Do not commit real
`.env.local` values.

## Architecture

```
src/
├── app/router.jsx        # All route definitions (createBrowserRouter)
├── components/
│   ├── ui/               # shadcn-style primitives (button, dialog, toast, ...)
│   ├── forms/            # Field/Label/Input/Textarea/Select/Error primitives
│   └── shared/           # navbar, footer, card, pagination, skeleton, ...
├── constants/enums.js    # Domain enums + getEnum* helpers
├── features/<feature>/   # Feature-based modules
│   ├── components/       # Feature components
│   ├── hooks/            # TanStack Query hooks (use-*.js)
│   ├── pages/            # Route pages (kebab-case.jsx)
│   ├── services/         # Axios API wrappers (xxxApi)
│   ├── validation/       # Zod schemas
│   └── utils/
├── hooks/                # Shared hooks (e.g. use-is-mobile.jsx)
├── layouts/              # RootLayout (navbar/footer/toaster), DashboardLayout
├── lib/                  # axios.js, query-client.js, local-storage.js, utils.js (cn)
├── providers/            # QueryProvider, ThemeProvider
└── stores/               # Zustand stores: auth.js, job-filters.js
```

Features present: `auth`, `companies`, `jobs`, `applications`, `dashboard`,
`users`, `public`.

## Conventions

- **Files**: kebab-case for pages/components/hooks/services
  (`all-jobs-page.jsx`, `use-jobs.js`); PascalCase for layouts
  (`RootLayout.jsx`).
- **Imports**: use the `@/` alias for cross-feature imports (`@/lib/utils`,
  `@/components/ui/button`); relative imports within a feature.
- **Style**: double quotes, semicolons, trailing commas, `cn()` for conditional
  classes.
- **API layer**: each feature exposes an object (e.g. `jobApi`) wrapping axios;
  query hooks live in `features/<feature>/hooks/use-*.js`.
- **Query keys**: use centralized `xxxQueryKeys` factories; scope keys by
  `user?.email` when data is per-user. Mutations invalidate `["jobs"]`,
  `["users"]`, `["applications"]`, `["companies"]`.
- **State**: server state via TanStack Query; client state via Zustand
  (`stores/auth.js`, `stores/job-filters.js`). No React Context stores.
- **API response shape**: backend wraps payloads as `{ data, pagination }`.
  Pages read `response.data?.data` and `response.data?.pagination`.
- **Forms**: React Hook Form + `zodResolver`; schemas in
  `features/<feature>/validation/`.
- **Routing guards**: `PrivateRoute` (auth) and `RoleGuard` (role) from
  `features/auth/components/`. Role values come from `constants/enums.js`
  (`USER_ROLE`). There is **no `RECRUITER` role** — recruiting roles are
  `COMPANY_OWNER` / `COMPANY_MEMBER`.

## Role Model & Company Flow

Every account registers as `JOB_SEEKER`; the client never sends `role`. A user
becomes `COMPANY_OWNER` by creating a company, or `COMPANY_MEMBER` by being
approved to join one (server assigns both). Routes under `/dashboard` use
`RoleGuard` with the company roles where appropriate.

`src/features/companies/` implements the whole lifecycle:

- **Onboarding** — homepage `CompanyOnboardingSection` (renders only when
  `user.role === "JOB_SEEKER"`, else `null`). Three states from
  `useMyMembership()`: `pending` (card with Cancel request), `active` (calls
  `fetchSession()` so guards/nav unlock), or no affiliation (choose Create vs
  Join). Polls via `useMyMembership({ refetchInterval: 15000 })`.
- **Create** — the "Create a Company" card opens `CreateCompanyDialog`
  (`CompanyForm` + `useCreateCompany`; optimistically applies
  `COMPANY_OWNER`/`companyId` via `updateUser`, then `fetchSession()`, then
  navigates to `/dashboard`).
- **Join** — the "Join a Company" card navigates to the public `/companies`
  page: debounced `useCompanies({ search })`, paginated grid of reusable
  `CompanyCard`s, `CompanyDetailsModal`, and a "View Jobs" link →
  `/all-jobs?companyId={id}`. "Request to Join" (shown only to `JOB_SEEKER`) →
  `useJoinCompany` (409 → toast), then navigates home so the onboarding section
  shows the pending state.
- **My Company** (`/dashboard/company`) — owner sees editable `CompanyForm`,
  `PendingRequestsTable` (Approve/Reject via `useRespondToRequest`), and
  `MembersTable` (Remove via `useRemoveMember`); member sees a read-only
  profile + Leave Company (confirm dialog → `useLeaveCompany`, which reverts
  the store to `JOB_SEEKER`).

`getMyMembership` returns `{ status: "active" | "pending" | "none" }` (server
normalizes `APPROVED` → `active`); read it as `data?.data?.status`. Query keys
live in `companyQueryKeys` (`list`, `single`, `requests`, `members`,
`myMembership`).

## Reusable Company UI

- `CompanyCard` is the single reusable card for companies (homepage top
  companies + `/companies`). Config-driven: `showSeats`, `showJoin`,
  `isJoining`, `onJoin`, `showDetails`, `onViewDetails`, `showViewJobs`.
- `CompanyCardSkeleton` is the matching loading state; `NotFound` (shared)
  covers empty states; `Pagination` (shared) drives the `/companies` grid.
- `CompanyProfileInfo` is shared by `MyCompanyPage` and `CompanyDetailsModal`.
- The `/all-jobs` page supports a `?companyId=` filter: it hydrates from the
  URL, passes `companyId` to `useJobs`, and renders `CompanyFilterBanner`
  (in `features/jobs/components/`) to clear it. The field lives in the
  `job-filters` Zustand store alongside the other filters.

## Auth Flow

1. `App.jsx` calls `fetchSession()` on mount (better-auth `getSession`), which
   populates the Zustand auth store. The store also infers `companyId` via
   `inferAdditionalFields`, so the session payload carries the current
   affiliation.
2. Registration has no role field — every account starts as `JOB_SEEKER`
   (`register(name, email, password)`). Roles change only via company actions;
   company mutations (`useCreateCompany`, `useLeaveCompany`) call
   `updateUser(...)` then `fetchSession()` to keep the store in sync.
3. Axios and the better-auth client both use `withCredentials: true`
   (cookie-based session; `lib/local-storage.js` token helpers are unused).
4. `PrivateRoute` redirects unauthenticated users to `/auth/login`; `RoleGuard`
   redirects wrong-role users to `/dashboard`.

## Gotchas

- `src/providers/AuthProvider.jsx` is **dead code** (circular self-import, never
  used) — do not rely on it or import it.
- Unused packages: `gsap`, `lottie-react`, `tailwind-variants`, `react-icons`.
  `src/data/` and `lotties/` are leftover assets not referenced by live code.
- Google sign-in callback URL is hardcoded to `http://localhost:3000` in
  `src/features/auth/components/google-sign-in-button.jsx`.
- Styling is CSS-first Tailwind v4 configured entirely in `src/index.css` (no
  `tailwind.config.*`). Dark mode via `next-themes` with `.dark` class.
