# Doorwise — Implementation Plan

Eight-week MVP. Each week ends with a verifiable demo. Verification commands are listed; do not run migrations or `npm install` without explicit approval (per `CLAUDE.md`).

Conventions assumed throughout: NestJS controller → service → repository; Prisma calls only in repositories; Zod-validated DTOs in `packages/shared`; TanStack Query hooks for all server state; light + dark mode from day one.

---

## Week 1 — Foundation: Auth, Orgs, Tenant Scope

**Goal:** A signed-in Clerk user can create an organization and the API resolves `organizationId` from session on every authenticated route.

### Backend

1. **Schema baseline.** Extend `apps/api/prisma/schema.prisma` with `Organization`, `OrganizationMember`, `OrganizationInvite` + enums. Add `clerkId` index on `User` if missing.
   - Migration name: `add_organizations`.
2. **Clerk sync.** Extend `apps/api/src/webhooks` to handle `user.created` / `user.updated` / `user.deleted` and upsert into `User`.
3. **`TenantScope` (request-scoped).** New module `apps/api/src/common/tenant-scope/`. Resolves `userId`, `organizationId`, `role`, `tenantProfileId` from the Clerk JWT + an `OrganizationMember` lookup. Selects active org via `X-Active-Org` header (validated against memberships) or the user's only membership.
4. **`TenantScopeInterceptor`** registered globally after `ClerkAuthGuard`. Rejects 401 if no membership exists for the requested org.
5. **Prisma extension.** A `$extends` query extension that, for the scoped models, asserts `where.organizationId` is present. Throws in `NODE_ENV !== 'production'`, logs + reports otherwise.
6. **Organizations module:** `POST /organizations`, `GET /organizations/me`, `PATCH /organizations/current`. Owner role granted to the creator inside a transaction.
7. **Invites module:** `POST /organizations/current/invites`, `POST /invites/:token/accept`. Tokens are 32-byte URL-safe, stored hashed; single-use; expire in 7 days.

### Frontend

8. **Onboarding flow:** post-Clerk-signup, if `GET /organizations/me` returns empty, redirect to `/onboarding` with "Create organization" / "Have an invite code?" choice.
9. **Org switcher** in the protected layout header (skipped visually if only one membership).
10. **Axios interceptor** attaches `X-Active-Org` from a `useActiveOrg()` hook backed by localStorage + server hydration.

### Tests

- Unit: `TenantScope` resolution paths (no membership → 401, multiple → header required, single → auto).
- Integration: org A token cannot read org B via any of the routes above.

**Verify:** `npm run typecheck` · `npm run build -w api` · `npm run test -w api`.

---

## Week 2 — Properties, Rooms

**Goal:** Owner/staff can manage properties and rooms; rooms enforce status state machine.

### Backend

1. Schema: `Property`, `Room` with enums and indexes from `architecture.md` §5. Migration: `add_properties_rooms`.
2. Modules `apps/api/src/properties` and `apps/api/src/rooms` (controller/service/repository). All repository methods take only `TenantScope` plus the operation args — never raw `organizationId`.
3. CRUD endpoints per §8 in architecture. Soft delete sets `deletedAt`; list endpoints filter it.
4. DTOs in `packages/shared/src/properties.ts`, `rooms.ts`. Zod schemas mirrored in `apps/web/lib/validations/`.

### Frontend

5. `/properties` list + create/edit drawer; `/properties/[id]` detail with rooms table.
6. Room create/edit form: rent, deposit (Decimal-safe input), capacity, status badge.
7. TanStack Query hooks in `apps/web/hooks/`: `useProperties`, `useProperty`, `useRooms`, etc. All consumers handle `isPending`.

### Tests

- Integration: cross-org isolation per resource.
- Unit: room status transitions allowed by service.

**Verify:** `npm run typecheck` · `npm run build` · manual: create org, add property, add room.

---

## Week 3 — Tenant Profiles & Tenant Invites

**Goal:** Staff can create tenant profiles without a login; tenants can claim via invite.

### Backend

1. Schema: `TenantProfile`. Migration: `add_tenant_profiles`.
2. `tenants` module: CRUD + `POST /tenants/:id/invite` (generates a `OrganizationInvite` with `tenantProfileId` set, role `tenant`).
3. `POST /invites/:token/accept` extended: when the invite's `tenantProfileId` is set, link `TenantProfile.userId = currentUser.id` and create the `tenant` `OrganizationMember` row in a transaction.

### Frontend

4. `/tenants` list with status filter; create/edit form (full name, contact, emergency contact).
5. "Send claim invite" action on a tenant row → copies link to clipboard.
6. Invite-accept page at `/invite/[token]` (public, behind Clerk sign-in/sign-up redirect).

### Tests

- Integration: claiming an invite is single-use; replay returns 410.
- Integration: tenant role cannot hit staff routes.

---

## Week 4 — Leases

**Goal:** Lease lifecycle is correct and the "one active lease per room" rule is structurally enforced.

### Backend

1. Schema: `Lease` + the raw-SQL partial unique index from architecture §5. Migration: `add_leases`.
2. `leases` module:
   - `POST /leases` — transaction: insert lease (`active`), set `Room.status = occupied`. The partial unique index rejects a second active lease per room.
   - `PATCH /leases/:id` — disallow editing rent/deposit on a lease that already has bills (would tempt retroactive changes); allow editing dates within bounds.
   - `POST /leases/:id/end` — transaction: set `endDate`, `status = 'ended'`, `Room.status = 'available'`. Cancellation uses `status = 'cancelled'` with the same room reset.

### Frontend

3. Lease create wizard: pick property → room (only `available`/`reserved`) → tenant → set rent/deposit/`dueDayOfMonth` (1–28) / `billingStartDate`.
4. Lease detail page: tenant info, room info, bills list (placeholder this week), "End lease" dialog.

### Tests

- Concurrency: two simultaneous `POST /leases` for the same room → one succeeds, one fails with 409.
- End-lease transaction: failure path leaves both rows untouched.

---

## Week 5 — Billing

**Goal:** Monthly bills are generated idempotently for all active leases; overdue detection works.

### Backend

1. Schema: `Bill` with `@@unique([leaseId, periodStart])`. Migration: `add_bills`.
2. `bills` module:
   - `POST /bills/generate` — body `{ periodStart: 'YYYY-MM-01' }`. Iterates active leases whose `billingStartDate <= periodStart`. For each, builds `periodEnd = last day of month`, `dueDate = max(periodStart, dueDay)`, `totalAmount = Lease.monthlyRent`. Uses `createMany({ skipDuplicates: true })` to enforce the no-proration policy and idempotency.
   - `GET /bills?status=&tenantId=&leaseId=` with pagination.
   - `PATCH /bills/:id/void` — only if `paidAmount == 0`.
3. **Scheduler.** Add `@nestjs/schedule`. Daily 02:00 PHT cron flips `unpaid`/`partially_paid` bills past `dueDate` to `overdue` and enqueues `bill.overdue` notifications.
4. `POST /bills/check-overdue` exposes the same logic for tests and manual triggers.

### Frontend

5. `/bills` list with status tabs and filters; "Generate bills for [Month]" action.
6. Bill detail drawer: line totals, status, period, due date, payments list (next week).

### Tests

- Idempotency: running `/bills/generate` twice for the same period inserts zero duplicates.
- Overdue: a bill with `dueDate = yesterday` flips on the cron tick (use Jest fake timers + manual trigger).

---

## Week 6 — Payments

**Goal:** Recording payments updates bill status correctly, including partial and overpayment, and supports void.

### Backend

1. Schema: `Payment` with `voidedAt`, `voidReason`. Migration: `add_payments`.
2. `payments` module:
   - `POST /payments` — transaction:
     1. Reject if bill is `voided`.
     2. Insert `Payment` with `recordedBy = scope.userId`.
     3. `Bill.paidAmount += amount`.
     4. Recompute `Bill.status` (`paid` if `paidAmount >= totalAmount`, `partially_paid` if `> 0`, else unchanged).
     5. If overpayment: emit `payment.overpaid` notification to org owners.
     6. Emit `payment.recorded` notification.
   - `POST /payments/:id/void` — transaction: set `voidedAt`, subtract from `Bill.paidAmount`, recompute status, emit notification.
3. Receipt route `GET /bills/:id/receipt` returns a render-ready DTO (org info, tenant, bill, payments).

### Frontend

4. "Record payment" dialog from the bill detail. Method selector with **GCash** and **Maya** prominent, plus cash / bank transfer / other. Reference number + notes.
5. Printable receipt view at `/bills/[id]/receipt` (light/dark agnostic, print stylesheet uses `prefers-color-scheme: light` for paper).
6. Void payment action — confirm dialog, requires reason.

### Tests

- Partial payment chain: `unpaid → partially_paid → paid`.
- Overpayment: status goes to `paid`, overpayment notification fires.
- Void: reverts status correctly (covers `paid → partially_paid` and `partially_paid → unpaid`).

---

## Week 7 — Dashboard, Tenant Portal, Notifications

**Goal:** Owners see this month's snapshot; tenants see their own bills read-only; both get in-app notifications.

### Backend

1. `GET /dashboard/summary` returns: expected rent (sum of `totalAmount` for current month), collected (sum of non-voided `Payment.amount` in current month), unpaid+overdue total, occupancy rate (`occupied / total non-deleted rooms`), overdue tenants (top N), recent payments (last 10).
2. **Tenant portal endpoints:** `GET /me/bills`, `GET /me/payments`. Repositories enforce `tenantId = scope.tenantProfileId` — already automatic from `TenantScope`.
3. **`Notification` model** + module: `GET /notifications`, `PATCH /notifications/:id/read`. Emit on `bill.generated`, `payment.recorded`, `payment.overpaid`, `bill.overdue` (already wired in earlier weeks via a `NotificationsService.emit()` helper).

### Frontend

4. `/dashboard` cards + table sections; loading skeletons; empty states.
5. `/portal/bills` and `/portal/payments` (tenant-role layout); read-only.
6. Notification bell in header with unread count; dropdown list; "mark all read".

### Tests

- Cross-org isolation on `/dashboard/summary`.
- Tenant role: `/me/bills` returns only this tenant's bills across two tenants in one org.

---

## Week 8 — Hardening, Polish, Cross-Org Test Suite

**Goal:** Ship-ready. UX polish, real cross-org leak test sweep, perf passes.

1. **Cross-org E2E suite.** Two orgs, two staff, two tenants. For every route in §8: assert 404 or empty on the wrong org/tenant. Wire into CI (`npm run test -w api`).
2. **Form polish.** Every form has Zod errors surfaced inline; every Query consumer renders an `isPending` skeleton and an empty state.
3. **Mobile responsiveness** pass — landlords are on phones.
4. **Receipt** print review; ensure totals match Decimal math.
5. **Manual smoke checklist** in `docs/qa-smoke.md` (separate doc — create only if requested).
6. **Performance:** add indexes hit by the dashboard query if EXPLAIN shows seq scans. Confirm `Bill (organizationId, status, dueDate)` is used.
7. **Doc pass:** update `AGENTS.md` only if conventions change; otherwise no changes to root docs.

**Definition of done for MVP:**

- All routes in architecture §8 implemented.
- Cross-org E2E suite passes in CI.
- Daily overdue cron is enabled and observable in logs.
- Dashboard, owner CRUD, and tenant portal all work end-to-end against the Docker Postgres at `localhost:5433`.

---

## Risks & Pre-Decisions

| Decision                    | Choice                                     | Reason                                                                                                                                |
| --------------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| Auth                        | Clerk (not hand-rolled email/password)     | Already wired in repo (`@clerk/backend`, `User.clerkId`). Tenants without logins still supported via nullable `TenantProfile.userId`. |
| Proration                   | **No proration** on mid-month lease starts | Simpler MVP; document in UI; revisit in v2.                                                                                           |
| Rent edits on active leases | Allowed only if no bills exist             | Prevents retroactive bill mutation; staff can end + re-create lease instead.                                                          |
| Overpayment                 | Accept + notify                            | Avoids silent data loss; credit-balance ledger deferred to v2.                                                                        |
| Payment delete              | Replaced with **void** (audit-preserving)  | Financial records should never disappear.                                                                                             |
| One-active-lease-per-room   | Partial unique SQL index                   | Structural — cannot be bypassed by buggy service code.                                                                                |
| Money type                  | `Decimal(12, 2)` + `Decimal.js` in app     | Float math on PHP currency causes ₱0.01 drift.                                                                                        |
| Calendar dates              | `@db.Date`                                 | Avoids timezone bugs on `dueDate`, `periodStart`.                                                                                     |

## Command Cheatsheet (run only when asked)

```bash
# Per-app verification (narrowest first)
npm run typecheck -w web
npm run typecheck -w api
npm run build -w api          # runs prisma generate
npm run test -w api -- <pattern>

# Full-repo
npm run typecheck
npm run build
npm run lint

# Prisma (api workspace)
npm run db:generate
npm run db:migrate:deploy     # require explicit user approval
npm run db:seed
```
