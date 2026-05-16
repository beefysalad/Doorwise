# Doorwise — Architecture

> Multi-tenant rental property management for small Philippine landlords. Replaces notebooks, spreadsheets, and Messenger threads with one place to manage rooms, tenants, bills, and payments. GCash and Maya are first-class payment methods.

## 1. Stack & Repo Shape

We build on the existing monorepo — no new top-level apps or packages are required.

| Layer          | Location                          | Notes                                                                          |
| -------------- | --------------------------------- | ------------------------------------------------------------------------------ |
| Frontend       | `apps/web`                        | Next.js App Router, TanStack Query, RHF + Zod, Axios, `@workspace/ui` (shadcn) |
| Backend        | `apps/api`                        | NestJS modules per feature, Prisma + `@prisma/adapter-pg`, Clerk for auth      |
| HTTP contracts | `packages/shared`                 | Type-only DTOs/response shapes imported as `@workspace/shared`                 |
| UI primitives  | `packages/ui`                     | Shared shadcn components                                                       |
| DB             | Postgres (Docker, host port 5433) | Single shared schema, scoped by `organizationId`                               |

Routes live under `apps/web/app/(protected)/**`. Backend feature modules under `apps/api/src/<feature>/` follow the existing `users/` + `webhooks/` pattern: thin controller → service → repository.

## 2. Auth Model

The repo already integrates **Clerk** (`@clerk/backend` on api, Clerk on web; `User.clerkId` exists in `schema.prisma`). We use Clerk instead of hand-rolled email+password.

- **Owner / Staff**: Clerk-managed users. Staff are added by **invite only** (no self-registration creates an Org membership).
- **Tenant**: a `TenantProfile` row can exist with `userId = null` (staff creates it). The tenant later "claims" the profile via a single-use invite link that completes Clerk sign-up and links `User.id` → `TenantProfile.userId`.
- The api resolves the Clerk user via a `ClerkAuthGuard` (already in use for `webhooks` / `users`), then resolves the active `OrganizationMember` row server-side. **`organizationId` is never read from a request body, query, or header.**

Clerk webhooks (`user.created`, `user.updated`, `user.deleted`) keep the local `User` table in sync — extend the existing `webhooks` module.

## 3. Multi-Tenancy

Shared DB, shared schema, scoped by `organizationId`. Three structural guarantees:

### 3.1 `organizationId` on every business table

Every model below carries `organizationId String` + an index. Composite uniques include `organizationId` where appropriate (e.g. `Property.slug` per org, `Room.roomName` per property).

### 3.2 `tenantScope()` request context

A NestJS request-scoped service resolves once per request:

```ts
// apps/api/src/common/tenant-scope/tenant-scope.service.ts
@Injectable({ scope: Scope.REQUEST })
export class TenantScope {
  readonly userId: string
  readonly organizationId: string
  readonly role: "owner" | "staff" | "tenant"
  readonly tenantProfileId?: string // set when role === 'tenant'
}
```

Resolved by a global `TenantScopeInterceptor` that runs after `ClerkAuthGuard`. Every repository takes `TenantScope` via DI and **always** adds `where: { organizationId: scope.organizationId, deletedAt: null }` to Prisma calls. Repositories never accept `organizationId` as a parameter from controllers.

### 3.3 Prisma extension as a belt-and-suspenders check

A Prisma `$extends` query extension asserts that `where.organizationId` is present for all reads/writes on scoped models — throws in non-prod, logs + reports in prod. This catches accidental unscoped queries even if a repo forgets.

### 3.4 Tenant-portal scoping

When `role === 'tenant'`, the same interceptor sets `scope.tenantProfileId`. The bills/payments repositories add `tenantId = scope.tenantProfileId` automatically for tenant-role requests. This is enforced at the **DB query layer**, not by hiding routes in the UI.

## 4. Soft Deletes

`deletedAt: DateTime?` on `OrganizationMember`, `Property`, `Room`, `TenantProfile`, `Bill`. **Payments are never deleted** — they are reversed by an explicit "void" with an audit reason (see §7). Repository helpers always filter `deletedAt: null` unless an admin path explicitly requests inclusion.

## 5. Data Model (Prisma)

Additions to the existing `schema.prisma`. Names match the user's spec; types in Prisma syntax.

```prisma
enum OrgRole          { owner staff tenant }
enum PropertyType     { apartment boarding_house dormitory transient other }
enum RoomStatus       { available occupied reserved maintenance }
enum TenantStatus     { active inactive moved_out }
enum LeaseStatus      { active ended cancelled }
enum BillStatus       { unpaid partially_paid paid overdue voided }
enum PaymentMethod    { cash gcash maya bank_transfer other }

model Organization {
  id        String   @id @default(uuid())
  name      String
  slug      String   @unique
  address   String?
  phone     String?
  logoUrl   String?
  createdAt DateTime @default(now())
  members   OrganizationMember[]
  // ... back-relations
}

model OrganizationMember {
  id             String   @id @default(uuid())
  organizationId String
  userId         String
  role           OrgRole
  joinedAt       DateTime @default(now())
  deletedAt      DateTime?
  @@unique([organizationId, userId])
  @@index([userId])
}

model OrganizationInvite {
  id             String   @id @default(uuid())
  organizationId String
  email          String
  role           OrgRole
  token          String   @unique
  tenantProfileId String? // set when inviting an existing tenant profile to claim
  expiresAt      DateTime
  consumedAt     DateTime?
  createdAt      DateTime @default(now())
  @@index([organizationId])
}

model Property {
  id             String       @id @default(uuid())
  organizationId String
  name           String
  address        String?
  type           PropertyType
  notes          String?
  createdAt      DateTime     @default(now())
  updatedAt      DateTime     @updatedAt
  deletedAt      DateTime?
  @@index([organizationId, deletedAt])
}

model Room {
  id              String     @id @default(uuid())
  organizationId  String
  propertyId      String
  roomName        String
  floor           String?
  capacity        Int        @default(1)
  monthlyRent     Decimal    @db.Decimal(12, 2)
  depositAmount   Decimal    @db.Decimal(12, 2) @default(0)
  status          RoomStatus @default(available)
  notes           String?
  createdAt       DateTime   @default(now())
  updatedAt       DateTime   @updatedAt
  deletedAt       DateTime?
  @@unique([propertyId, roomName])
  @@index([organizationId, status, deletedAt])
}

model TenantProfile {
  id                       String       @id @default(uuid())
  organizationId           String
  userId                   String?      // null until tenant claims via invite
  fullName                 String
  phone                    String?
  email                    String?
  address                  String?
  emergencyContactName     String?
  emergencyContactPhone    String?
  status                   TenantStatus @default(active)
  createdAt                DateTime     @default(now())
  updatedAt                DateTime     @updatedAt
  deletedAt                DateTime?
  @@unique([organizationId, userId])
  @@index([organizationId, status, deletedAt])
}

model Lease {
  id                String      @id @default(uuid())
  organizationId    String
  roomId            String
  tenantId          String
  monthlyRent       Decimal     @db.Decimal(12, 2)
  depositAmount     Decimal     @db.Decimal(12, 2) @default(0)
  billingStartDate  DateTime    @db.Date
  startDate         DateTime    @db.Date
  endDate           DateTime?   @db.Date
  dueDayOfMonth     Int         // 1..28 enforced via Zod, not at DB
  status            LeaseStatus @default(active)
  createdAt         DateTime    @default(now())
  updatedAt         DateTime    @updatedAt
  @@index([organizationId, status])
  @@index([roomId, status])
  @@index([tenantId, status])
}

// One active lease per room — partial unique index, see migration SQL below.

model Bill {
  id              String     @id @default(uuid())
  organizationId  String
  leaseId         String
  tenantId        String
  periodStart     DateTime   @db.Date
  periodEnd       DateTime   @db.Date
  dueDate         DateTime   @db.Date
  totalAmount     Decimal    @db.Decimal(12, 2)
  paidAmount      Decimal    @db.Decimal(12, 2) @default(0)
  status          BillStatus @default(unpaid)
  createdAt       DateTime   @default(now())
  updatedAt       DateTime   @updatedAt
  deletedAt       DateTime?
  @@unique([leaseId, periodStart]) // duplicate prevention
  @@index([organizationId, status, dueDate])
  @@index([tenantId, status])
}

model Payment {
  id              String        @id @default(uuid())
  organizationId  String
  billId          String
  tenantId        String
  recordedBy      String        // userId
  amount          Decimal       @db.Decimal(12, 2)
  paymentMethod   PaymentMethod
  referenceNumber String?
  notes           String?
  paidAt          DateTime
  createdAt       DateTime      @default(now())
  voidedAt        DateTime?
  voidReason      String?
  @@index([organizationId, paidAt])
  @@index([billId])
}

model Notification {
  id              String   @id @default(uuid())
  organizationId  String
  userId          String
  type            String   // 'payment.recorded' | 'bill.generated' | 'bill.overdue'
  title           String
  body            String
  isRead          Boolean  @default(false)
  createdAt       DateTime @default(now())
  @@index([userId, isRead, createdAt])
}
```

**Raw SQL companions** (added in the migration `_init` or a follow-up):

```sql
-- One active lease per room
CREATE UNIQUE INDEX lease_room_active_unique
  ON "Lease" ("roomId")
  WHERE status = 'active';

-- Money columns: never use float. Decimal(12,2) above handles this.
```

## 6. Money & Dates

- All money is `Decimal(12, 2)` in DB; in app code use `Decimal.js` (`@prisma/client` returns `Decimal`). Never `number` arithmetic on money.
- Dates that represent a calendar day (`periodStart`, `dueDate`, `billingStartDate`) are stored as `@db.Date` to dodge timezone drift. All timestamp fields are `DateTime` (UTC).
- Render in Asia/Manila on the client via a single `formatPHP` / `formatDate` helper.

## 7. Domain Rules

### 7.1 Billing

- Generation: a single endpoint `POST /bills/generate` iterates all active leases for the org and creates one bill per lease for the target month. The `Bill.@@unique([leaseId, periodStart])` constraint guarantees idempotency — duplicate inserts are caught and skipped.
- **Proration policy (decided upfront): no proration on mid-month starts.** A lease that starts mid-month is first billed on the next full cycle beginning on or after `billingStartDate`. Document this in the lease creation UI.
- Editing `Lease.monthlyRent` does **not** retroactively change past `Bill.totalAmount` — bills are snapshots.
- Ending a lease mid-month: the in-progress bill (if any) is **not** prorated; staff may manually void or partially adjust via a payment + credit note flow (deferred fine-grained adjustment to v2 — MVP allows void + manual re-bill).

### 7.2 Overdue detection

- A daily Nest scheduler (`@nestjs/schedule`) job at 02:00 PHT scans bills with `dueDate < today AND status IN ('unpaid','partially_paid')` and sets `status = 'overdue'`, emits a `bill.overdue` notification.
- Same logic exposed as `POST /bills/check-overdue` for on-demand triggering and for tests.

### 7.3 Payments

- Recording a payment runs in a transaction:
  1. Insert `Payment`.
  2. `Bill.paidAmount += payment.amount`.
  3. Recompute `Bill.status` from `paidAmount` vs `totalAmount` (`paid` if `>=`, `partially_paid` if `> 0`, else unchanged). Overdue → paid transitions are allowed.
- **Overpayment**: if `paidAmount > totalAmount`, accept it, mark `paid`, and persist the excess as `Notification` of type `payment.overpaid` for staff follow-up (credit-store is v2). Never silently swallow.
- **Voided bills** reject new payments at the service layer (400).
- **Voiding a payment** (replaces "deleting"): sets `voidedAt` + `voidReason`, subtracts from `Bill.paidAmount` in the same transaction, recomputes status. The Payment row stays for audit.

### 7.4 Leases & Rooms

- Creating an active lease sets `Room.status = 'occupied'` in the same transaction.
- Ending/cancelling a lease sets `Room.status = 'available'` in the same transaction.
- The partial unique index on `Lease(roomId) WHERE status='active'` enforces "one active lease per room" structurally.
- A tenant with leases in multiple rooms is allowed — UI lists all and prompts for selection when relevant.

### 7.5 Invitations

- Single-use, expiring tokens (`OrganizationInvite.token`, `expiresAt`, `consumedAt`). Tokens are random 32-byte URL-safe strings, stored hashed.
- Three invite flows share the same model: staff invite, tenant-claim invite, owner re-invite.

## 8. API Surface (MVP)

All routes are under `/api/v1` and require Clerk auth + an active org membership (except invite-claim).

```
POST   /organizations                       create org (caller becomes owner)
GET    /organizations/me                    list memberships
PATCH  /organizations/current               update current org
POST   /organizations/current/invites       owner: invite staff/tenant
POST   /invites/:token/accept               consume invite

GET    /properties
POST   /properties
PATCH  /properties/:id
DELETE /properties/:id                      soft delete

GET    /rooms?propertyId=
POST   /rooms
PATCH  /rooms/:id
DELETE /rooms/:id

GET    /tenants
POST   /tenants
PATCH  /tenants/:id
DELETE /tenants/:id
POST   /tenants/:id/invite                  generate claim invite

GET    /leases
POST   /leases
PATCH  /leases/:id
POST   /leases/:id/end                      body: { endDate, reason }

GET    /bills?status=&tenantId=&leaseId=
POST   /bills/generate                      body: { periodStart }  // first-of-month date
POST   /bills/check-overdue
PATCH  /bills/:id/void

GET    /payments
POST   /payments                            body: { billId, amount, method, ... }
POST   /payments/:id/void

GET    /dashboard/summary                   aggregates (this month)
GET    /me/bills                            tenant portal: own bills
GET    /me/payments                         tenant portal: own payments

GET    /notifications
PATCH  /notifications/:id/read
```

Request/response DTO types live in `packages/shared/src/<feature>.ts` and are imported type-only on both ends.

## 9. Frontend Architecture

Mirrors existing patterns (CLAUDE.md):

- `apps/web/app/(protected)/` — owner/staff routes: `dashboard`, `properties`, `rooms`, `tenants`, `leases`, `bills`, `payments`, `settings/organization`, `settings/members`.
- `apps/web/app/(protected)/portal/` — tenant-role routes: `bills`, `payments`. The layout for this segment redirects non-tenant roles to `/dashboard`.
- `apps/web/components/<feature>/` — feature components (e.g. `properties/property-form.tsx`).
- `apps/web/hooks/use-<resource>.ts` — TanStack Query hooks; one file per resource. All consumers handle `isPending` explicitly.
- `apps/web/lib/api/<feature>.ts` — Axios wrappers returning typed `@workspace/shared` shapes.
- `apps/web/lib/validations/<feature>.ts` — Zod schemas reused by RHF and posted to api.
- Money/date formatting helpers in `apps/web/lib/format.ts` (Asia/Manila, PHP).

Light + dark mode from day one; protected pages use the shared intro pattern (muted eyebrow → `font-heading` title → muted description).

## 10. Cross-Org Leak Defense (testing strategy)

- Unit: `tenantScope()` interceptor — asserts `organizationId` resolution and rejection when membership is missing.
- Integration: every controller has at least one "Org A user requests Org B resource → 404" test.
- E2E: a single Jest suite spins up two orgs, two users, a tenant in each, and asserts that no cross-org id returns data on any GET/PATCH/DELETE route. Run on CI.
- Prisma extension throws in test env on any unscoped query — guarantees the assertion is real.

## 11. Out of Scope (v2)

Utility billing, expenses, maintenance requests, file uploads, PDF receipts, SMS/email/Messenger reminders, automated GCash/Maya APIs, move-in/out checklists, public listings, audit log, CSV/Excel export, prorated mid-month billing, formal credit-balance store.
