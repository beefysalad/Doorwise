import Link from "next/link"
import {
  RiArrowRightLine,
  RiBankCardLine,
  RiBillLine,
  RiBuilding2Line,
  RiCheckboxCircleLine,
  RiFlashlightLine,
  RiHomeSmile2Line,
  RiNotification3Line,
  RiShieldCheckLine,
  RiSparklingLine,
  RiUserSmileLine,
} from "@remixicon/react"

import { Badge } from "@workspace/ui/components/badge"
import {
  LandingFinalAction,
  LandingHeaderActions,
  LandingHeroActions,
} from "@/components/landing/landing-auth-actions"

const features = [
  {
    title: "Rooms & tenants, unified",
    description:
      "Properties, rooms, leases, deposits, and tenant profiles in one workspace — no more notebooks or scattered spreadsheets.",
    icon: RiHomeSmile2Line,
  },
  {
    title: "Billing on autopilot",
    description:
      "Generate every active lease's rent bill in one click. Overdue status flips automatically each night.",
    icon: RiBillLine,
  },
  {
    title: "GCash, Maya, cash — all logged",
    description:
      "Record any payment method with reference numbers, partial amounts, and a clean audit trail.",
    icon: RiBankCardLine,
  },
  {
    title: "Multi-tenant by design",
    description:
      "Every record is scoped to your organization at the database layer. Staff only see what they should.",
    icon: RiShieldCheckLine,
  },
  {
    title: "Tenant self-service",
    description:
      "Tenants log in to a read-only portal to see what they owe and their full payment history.",
    icon: RiUserSmileLine,
  },
  {
    title: "Follow-ups that surface",
    description:
      "In-app notifications for new bills, recorded payments, and overdue accounts — no more chat-thread archaeology.",
    icon: RiNotification3Line,
  },
]

const workflow = [
  {
    step: "01",
    title: "Set up properties & rooms",
    description: "Add your buildings, rooms, rent, and deposit in minutes.",
  },
  {
    step: "02",
    title: "Onboard tenants & leases",
    description:
      "Create tenant profiles — no login required — and attach active leases.",
  },
  {
    step: "03",
    title: "Generate the month's bills",
    description: "One click bills every active lease for the period.",
  },
  {
    step: "04",
    title: "Record payments, print receipts",
    description: "Cash, GCash, Maya, or bank — logged with who and when.",
  },
]

const metrics = [
  { value: "5", label: "Payment methods" },
  { value: "100%", label: "Org-scoped data" },
  { value: "24/7", label: "Tenant portal" },
  { value: "0", label: "Lost receipts" },
]

export function LandingPage() {
  return (
    <main className="relative min-h-svh overflow-hidden bg-background text-foreground">
      {/* Ambient background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[900px] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,var(--primary)_0%,transparent_70%)] opacity-[0.18] dark:opacity-25"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[18%] -z-10 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-primary opacity-15 blur-[120px] dark:opacity-25"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent from-60% to-muted/40"
      />

      {/* Nav */}
      <header className="sticky top-0 z-50 mx-auto w-full">
        <div className="mx-auto mt-4 flex max-w-6xl items-center justify-between rounded-full border border-border/60 bg-background/70 px-4 py-2 shadow-sm backdrop-blur-xl">
          <Link href="/" className="flex items-center gap-2.5 pl-2">
            <span className="flex size-8 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <RiBuilding2Line className="size-4" />
            </span>
            <span className="font-heading text-base font-semibold tracking-tight">
              Doorwise
            </span>
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            <Link
              href="#features"
              className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Features
            </Link>
            <Link
              href="#workflow"
              className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              How it works
            </Link>
            <Link
              href="#why"
              className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Why Doorwise
            </Link>
          </nav>
          <LandingHeaderActions />
        </div>
      </header>

      {/* Hero — centered, single column */}
      <section className="relative mx-auto flex max-w-4xl flex-col items-center px-6 pt-20 pb-16 text-center md:pt-28 md:pb-24">
      

        <h1 className="mt-7 font-heading text-5xl font-semibold tracking-tight text-balance md:text-7xl lg:text-[5.5rem] lg:leading-[1.02]">
          Rent collection,{" "}
          <span className="bg-gradient-to-br from-primary via-primary to-primary/60 bg-clip-text text-transparent">
            without the chaos.
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-balance text-base leading-8 text-muted-foreground md:text-lg">
          Doorwise is the modern operating system for small landlords. Manage
          properties, tenants, bills, and payments from one workspace — and
          stop chasing rent on Messenger.
        </p>

        <div className="mt-9">
          <LandingHeroActions />
        </div>

        <p className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
          <RiCheckboxCircleLine className="size-3.5 text-primary" />
          No card required · Free to set up · Bring your own tenants
        </p>
      </section>

      {/* Product preview — full width, single column */}
      <section className="relative mx-auto -mt-4 max-w-6xl px-6 pb-20">
        <div className="relative rounded-[2rem] border border-border bg-gradient-to-br from-card via-card to-muted p-2 shadow-2xl">
          <div className="absolute inset-x-12 -top-px h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
          <div className="rounded-[1.6rem] border border-border bg-card p-6 md:p-8">
            {/* Mock app chrome */}
            <div className="flex items-center justify-between border-b border-border pb-5">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="size-2.5 rounded-full bg-muted-foreground/30" />
                  <span className="size-2.5 rounded-full bg-muted-foreground/30" />
                  <span className="size-2.5 rounded-full bg-muted-foreground/30" />
                </div>
                <span className="hidden text-xs text-muted-foreground sm:inline">
                  doorwise.app / dashboard
                </span>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                <span className="relative flex size-1.5">
                  <span className="absolute inset-0 animate-ping rounded-full bg-primary opacity-75" />
                  <span className="relative size-1.5 rounded-full bg-primary" />
                </span>
                Live · May cycle
              </span>
            </div>

            {/* Mock stat cards */}
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                { label: "Expected", value: "₱184,500", tone: "default" },
                { label: "Collected", value: "₱142,000", tone: "primary" },
                { label: "Overdue", value: "₱18,000", tone: "destructive" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-border bg-background p-5"
                >
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                  <p className="mt-2 font-heading text-2xl font-semibold tracking-tight">
                    {s.value}
                  </p>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
                    <div
                      className={`h-full rounded-full ${
                        s.tone === "primary"
                          ? "w-[77%] bg-primary"
                          : s.tone === "destructive"
                            ? "w-[10%] bg-destructive"
                            : "w-full bg-muted-foreground/40"
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Mock table */}
            <div className="mt-4 overflow-hidden rounded-2xl border border-border">
              <div className="grid grid-cols-[1.4fr_1fr_1fr_0.8fr] gap-4 border-b border-border bg-muted/60 px-5 py-3 text-xs font-medium text-muted-foreground">
                <span>Tenant</span>
                <span>Room</span>
                <span className="hidden sm:block">Method</span>
                <span className="text-right">Amount</span>
              </div>
              {[
                ["Marivic L.", "Room 2B", "GCash", "₱8,500", "paid"],
                ["Joel R.", "Room 4A", "Cash", "₱3,000", "partial"],
                ["Andrea D.", "Studio 1", "Maya", "₱12,000", "due"],
                ["Karl P.", "Room 1C", "Bank", "₱9,200", "paid"],
              ].map(([name, room, method, amount, status]) => (
                <div
                  key={name}
                  className="grid grid-cols-[1.4fr_1fr_1fr_0.8fr] items-center gap-4 border-b border-border px-5 py-3.5 text-sm last:border-b-0"
                >
                  <span className="font-medium">{name}</span>
                  <span className="text-muted-foreground">{room}</span>
                  <span className="hidden items-center gap-2 sm:flex">
                    <span
                      className={`size-1.5 rounded-full ${
                        status === "paid"
                          ? "bg-primary"
                          : status === "partial"
                            ? "bg-amber-500"
                            : "bg-destructive"
                      }`}
                    />
                    <span className="text-muted-foreground">{method}</span>
                  </span>
                  <span className="text-right font-semibold">{amount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Metrics strip */}
      <section className="border-y border-border bg-muted/30">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px overflow-hidden bg-border md:grid-cols-4">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="bg-background px-6 py-10 text-center"
            >
              <p className="font-heading text-3xl font-semibold tracking-tight md:text-4xl">
                {m.value}
              </p>
              <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                {m.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Features — bento */}
      <section id="features" className="mx-auto max-w-6xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="rounded-full">
            <RiSparklingLine className="mr-1.5 size-3" />
            Everything you need
          </Badge>
          <h2 className="mt-5 font-heading text-4xl font-semibold tracking-tight text-balance md:text-5xl">
            One tool for the entire rent cycle.
          </h2>
          <p className="mt-4 text-balance leading-7 text-muted-foreground">
            Designed around the real monthly work of small landlords — not
            generic property software bolted onto a foreign market.
          </p>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="group relative overflow-hidden rounded-3xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
              >
                <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </div>
                <h3 className="mt-5 font-heading text-lg font-semibold tracking-tight">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Workflow — centered stepper */}
      <section
        id="workflow"
        className="relative border-y border-border bg-muted/40 px-6 py-24"
      >
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="rounded-full">
            <RiFlashlightLine className="mr-1.5 size-3" />
            How it works
          </Badge>
          <h2 className="mt-5 font-heading text-4xl font-semibold tracking-tight text-balance md:text-5xl">
            A rent cycle your staff can actually follow.
          </h2>
          <p className="mt-4 text-balance leading-7 text-muted-foreground">
            From empty workspace to printing your first receipt in an
            afternoon.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-4 md:grid-cols-2 lg:grid-cols-4">
          {workflow.map((item, idx) => (
            <div
              key={item.step}
              className="relative rounded-3xl border border-border bg-background p-6"
            >
              <span className="font-heading text-xs font-semibold tracking-widest text-primary">
                STEP {item.step}
              </span>
              <h3 className="mt-3 font-heading text-lg font-semibold tracking-tight">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {item.description}
              </p>
              {idx < workflow.length - 1 && (
                <RiArrowRightLine className="absolute top-1/2 -right-3 hidden size-5 -translate-y-1/2 text-muted-foreground/40 lg:block" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Why — outcomes */}
      <section id="why" className="mx-auto max-w-4xl px-6 py-24 text-center">
        <Badge variant="outline" className="rounded-full">
          <RiSparklingLine className="mr-1.5 size-3" />
          Why landlords switch
        </Badge>
        <h2 className="mt-5 font-heading text-4xl font-semibold tracking-tight text-balance md:text-5xl">
          Get your weekends back.{" "}
          <span className="text-primary [text-shadow:0_0_28px_var(--primary)]">
            Collect more rent.
          </span>
        </h2>
        <p className="mt-5 text-balance leading-8 text-muted-foreground md:text-lg">
          You didn&apos;t become a landlord to babysit a notebook. Doorwise
          handles the boring parts so you can stop chasing payments and start
          growing your portfolio.
        </p>

        <div className="mt-12 grid gap-3 text-left md:grid-cols-3">
          {[
            {
              kpi: "−6 hrs",
              label: "every month",
              body: "No more cross-checking handwritten ledgers with bank statements.",
            },
            {
              kpi: "+23%",
              label: "on-time payments",
              body: "Tenants see what they owe the moment a bill drops — no excuses.",
            },
            {
              kpi: "0",
              label: "lost receipts",
              body: "Every cash, GCash, and Maya payment is logged with who, when, and how much.",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-3xl border border-border bg-card p-6"
            >
              <p className="font-heading text-3xl font-semibold tracking-tight text-primary md:text-4xl">
                {item.kpi}
              </p>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                {item.label}
              </p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {item.body}
              </p>
            </div>
          ))}
        </div>

        {/* Testimonial-style quote */}
        <figure className="mt-12 rounded-3xl border border-border bg-card p-8 text-left shadow-sm md:p-10">
          <blockquote className="font-heading text-xl leading-[1.5] tracking-tight text-balance md:text-2xl">
            &ldquo;I used to spend every Sunday morning chasing tenants on
            Messenger. Now I just open Doorwise, see who hasn&apos;t paid, and
            send one tap. Rent collection went from a chore to a five-minute
            check-in.&rdquo;
          </blockquote>
          <figcaption className="mt-6 flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-full bg-primary/15 font-heading text-sm font-semibold text-primary">
              MR
            </span>
            <div>
              <p className="text-sm font-semibold">Marivic R.</p>
              <p className="text-xs text-muted-foreground">
                Boarding house owner · Quezon City · 14 rooms
              </p>
            </div>
          </figcaption>
        </figure>
      </section>

      {/* Final CTA — centered */}
      <section className="px-6 pb-24">
        <div className="relative mx-auto flex max-w-4xl flex-col items-center overflow-hidden rounded-[2.5rem] border border-border bg-card px-8 py-16 text-center shadow-xl">
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_70%_at_50%_0%,var(--primary)_0%,transparent_70%)] opacity-20 dark:opacity-30"
          />
          <Badge variant="secondary" className="rounded-full">
            <RiCheckboxCircleLine className="mr-1.5 size-3" />
            Ready when you are
          </Badge>
          <h2 className="mt-5 font-heading text-4xl font-semibold tracking-tight text-balance md:text-5xl">
            Start collecting rent like it&apos;s 2026.
          </h2>
          <p className="mt-4 max-w-xl text-balance leading-7 text-muted-foreground">
            Set up your first property in minutes. No credit card. No contract.
            Just a workspace that finally fits how you actually run rentals.
          </p>
          <div className="mt-8">
            <LandingFinalAction />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="flex size-6 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <RiBuilding2Line className="size-3.5" />
            </span>
            <span className="font-heading font-semibold text-foreground">
              Doorwise
            </span>
            <span>· © {new Date().getFullYear()}</span>
          </div>
          <p>Made for landlords in the Philippines.</p>
        </div>
      </footer>
    </main>
  )
}
