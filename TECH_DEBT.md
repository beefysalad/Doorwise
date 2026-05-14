# Tech Debt

Tracked, intentional shortcuts to revisit. Keep this file honest — add entries
when you defer work, remove them when resolved.

## Doorwise UI is frontend-only — backend wiring deferred

**Context:** The Doorwise UI (owner app, tenant portal, landing page, onboarding
plan step) was built fast against mock data, by explicit decision, before any
backend work. Clerk auth + the existing org-creation flow are the only real
backend integrations.

**What's mocked / deferred:**

1. **Mock data layer** — `apps/web/lib/mock/doorwise.ts` holds all entities
   (org, properties, rooms, tenants, leases, bills, payments, notifications)
   plus formatters and derived helpers. Owner/tenant screens import it directly.
   - Needs: Prisma models + NestJS feature modules (org-scoped), `@workspace/shared`
     HTTP contracts, `apps/web/lib/api/*` wrappers, and TanStack Query hooks under
     `apps/web/hooks/*`. Screens must move from direct mock imports to query hooks
     with explicit `isPending` / `isLoading` / empty states.

2. **Subscription plans** — `apps/web/lib/mock/plans.ts` (Free / Starter / Medium)
   is frontend-only. `plan` is **not** part of the create-organization contract.
   - Needs: add `plan` to `@workspace/shared` create-org contract + API DTO + Prisma;
     enforce property/tenant limits server-side.
   - Seam: `// TODO: persist the selected plan` in
     `apps/web/components/onboarding/create-organization-form.tsx`.

3. **Onboarding plan step** — `onboarding-shell.tsx` holds `selectedPlanId` in
   component state only; pass it into the org-create mutation once the contract
   supports it.

4. **UI-only actions with no persistence** — generate-bills, record-payment,
   void bill, end lease, and notification-settings toggles are all wired to local
   state / dialogs only.
