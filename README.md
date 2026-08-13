# Labora

**Where talent meets opportunity** — a modern freelance job marketplace.

Labora is a React SPA that connects skilled professionals with clients. Users can
browse and apply to jobs, company members can post and manage listings, and
admins oversee the platform from a role-based dashboard.

[Live Demo](https://labora-7a232.web.app/) · [Backend repo](https://github.com/programmerrakibul/labora-server)

## Tech Stack

| Layer            | Tools                                                                                    |
| ---------------- | ---------------------------------------------------------------------------------------- |
| **Framework**    | React 19, Vite 7, React Router 7                                                         |
| **Styling**      | Tailwind CSS 4 (CSS-first config), shadcn / Base UI / Ark UI, tw-animate-css             |
| **Data**         | TanStack Query 5, Axios, Zustand                                                         |
| **Forms**        | React Hook Form, Zod, @hookform/resolvers                                                |
| **Auth**         | better-auth (cookie-based sessions, Google OAuth)                                        |
| **UI / Extras**  | Sonner (toasts), next-themes (dark mode), Recharts (dashboard), date-fns, lucide-react   |

> JavaScript (JSX), not TypeScript.

## Getting Started

Requires **Node.js 18+** and **pnpm**.

```bash
# 1. Install dependencies
pnpm install

# 2. Configure environment variables
cp .env.example .env.local

# 3. Start the dev server (http://localhost:3000)
pnpm run dev
```

### Environment Variables

```env
# Base URL of the REST API. The client appends /api automatically.
VITE_API_BASE_URL=http://localhost:8000
```

| Variable             | Description                                     | Default               |
| -------------------- | ----------------------------------------------- | --------------------- |
| `VITE_API_BASE_URL`  | Backend origin (client requests `{url}/api/*`)  | `http://localhost:8000` |

## Scripts

| Command              | Description                            |
| -------------------- | -------------------------------------- |
| `pnpm run dev`       | Start the Vite dev server (port 3000)  |
| `pnpm run build`     | Build for production to `dist/`        |
| `pnpm run preview`   | Preview the production build           |
| `pnpm run lint`      | Run ESLint                             |

## Architecture

```
src/
├── app/router.jsx        # Route definitions (createBrowserRouter)
├── components/           # Reusable UI primitives (ui/, forms/, shared/)
├── constants/enums.js    # Domain enums (roles, job types, statuses, ...)
├── features/             # Feature-based modules
│   └── <feature>/
│       ├── components/   # Feature-specific components
│       ├── hooks/        # TanStack Query hooks (data fetching)
│       ├── pages/        # Route pages
│       ├── services/     # Axios API wrappers
│       ├── validation/   # Zod schemas
│       └── utils/
├── hooks/                # Shared hooks
├── layouts/              # RootLayout, DashboardLayout
├── lib/                  # axios, query-client, utils (cn)
├── providers/            # QueryProvider, ThemeProvider
└── stores/               # Zustand stores (auth, job-filters)
```

### Data Flow

1. **Service layer** — thin Axios wrappers (`features/*/services/`) call
   `{VITE_API_BASE_URL}/api/*` with cookies (`withCredentials: true`).
2. **Query hooks** — TanStack Query hooks wrap services with centralized query
   keys; mutations invalidate `["jobs"]`, `["users"]`, `["applications"]`,
   `["companies"]`.
3. **State** — server state lives in TanStack Query; client state (auth session,
   job filters) in Zustand.
4. **Auth** — `App.jsx` calls `fetchSession()` on boot; `PrivateRoute` /
   `RoleGuard` gate `/dashboard` routes by role.

### Routing

- `/` — public site under `RootLayout` (homepage, companies, all jobs, job
  details, auth)
  - `companies` — browse all companies, view details in a modal, request to
    join (job seekers), and jump to a company's jobs via
    `/all-jobs?companyId=...`
- `/dashboard` — private, role-guarded:
  - Company roles (`COMPANY_OWNER` / `COMPANY_MEMBER`): `add-job`, `my-jobs`,
    `applications`, `company`
  - Job seeker: `applications`
  - Admin: `manage-users`, `companies`
  - All users: `profile`

### Roles & Permissions

Every account starts as `JOB_SEEKER`; recruiting roles are granted only via
company actions (create a company → `COMPANY_OWNER`, get approved to join →
`COMPANY_MEMBER`). The client never sends `role`.

`USER_ROLE` (from `src/constants/enums.js`):

| Role            | Capabilities                                               |
| --------------- | ---------------------------------------------------------- |
| `JOB_SEEKER`    | Browse & apply to jobs, track applications, request to join a company |
| `COMPANY_OWNER` | Manage company profile, approve join requests, manage members, post/edit/delete jobs, view applications |
| `COMPANY_MEMBER`| Post/edit/delete jobs, view applications, leave the company |
| `ADMIN`         | Manage users & companies, full platform oversight                |

### Company Flow

`src/features/companies/` implements the whole lifecycle:

- **Onboarding** — the homepage renders a `CompanyOnboardingSection` for
  `JOB_SEEKER` users only (renders `null` for everyone else). It mirrors the
  states from `useMyMembership()`: `pending` (card with Cancel request),
  `active` (re-fetches the session), or no affiliation (choose Create vs Join).
  It polls every 15s and calls `fetchSession()` once a request is approved.
- **Create** — the "Create a Company" card opens a `CreateCompanyDialog`
  containing `CompanyForm` + `useCreateCompany` (optimistically applies
  `COMPANY_OWNER`/`companyId` via `updateUser`, then `fetchSession()`), then
  redirects to `/dashboard`.
- **Join** — the "Join a Company" card navigates to the public `/companies`
  page: a debounced search plus a paginated grid of reusable `CompanyCard`s.
  Job seekers get a "Request to Join" button (`useJoinCompany`, 409 → toast);
  everyone gets "Details" (opened via `CompanyDetailsModal`) and "View Jobs"
  (`/all-jobs?companyId=...`).
- **Management** (`/dashboard/company`) — owner sees editable `CompanyForm`,
  `PendingRequestsTable` (Approve/Reject via `useRespondToRequest`), and
  `MembersTable` (Remove via `useRemoveMember`); member sees a read-only
  profile + Leave Company (confirm dialog → `useLeaveCompany`, which reverts
  the store to `JOB_SEEKER`).
- **Admin Oversight** (`/dashboard/companies`) — admins manage the whole
  platform via a debounced search (name/email/industry), a status filter
  (All/Active/Suspended), and a paginated `CompanyCard` grid. Each card offers
  Details (`CompanyDetailsModal`), an inline status select
  (`useUpdateCompanyStatus`), and Delete (confirm dialog →
  `useDeleteCompany`). The page passes `isAdmin: "true"` to `useCompanies` so
  the default view lists every company regardless of status.

Membership state comes from `GET /companies/me/membership`
(`{ status: "active" | "pending" | "none" }`). The homepage "top companies"
section is also dynamic (`useCompanies({ limit: 6 })`) and reuses the same
`CompanyCard`.

## Workflow

1. Run the backend server (see the [labora-server](https://github.com/programmerrakibul/labora-server) repo).
2. Point `VITE_API_BASE_URL` at it.
3. `pnpm run dev` and open `http://localhost:3000`.

## Contributing

Feel free to open issues or submit pull requests. Built by
[Rakibul](https://github.com/programmerrakibul).
