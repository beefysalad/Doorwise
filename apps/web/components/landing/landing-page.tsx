"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  RiArrowRightLine,
  RiBarChartLine,
  RiBuilding2Line,
  RiCheckLine,
  RiDoorClosedLine,
  RiErrorWarningLine,
  RiEyeLine,
  RiGroupLine,
  RiMoneyDollarCircleLine,
  RiReceiptLine,
} from "@remixicon/react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@workspace/ui/components/accordion"
import { Button } from "@workspace/ui/components/button"

import {
  LandingHeaderActions,
  LandingSignUpAction,
} from "@/components/landing/landing-auth-actions"
import { fadeUp, staggerContainer, float, floatSlow } from "@/components/motion/presets"
import { fmtLimit, PLANS } from "@/lib/mock/plans"

const viewportOnce = { once: true, amount: 0.22 }

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "For tenants", href: "#tenants" },
  { label: "Help", href: "#faq" },
]

const FEATURES = [
  { icon: RiReceiptLine, title: "Bills, generated.", body: "One click creates monthly bills for every active lease. Adjustable due day, prorated first month, automated SMS reminders." },
  { icon: RiMoneyDollarCircleLine, title: "GCash & Maya, sorted.", body: "Record digital payments with reference numbers in seconds. Track who paid what, when, and how — no more screenshots in chat." },
  { icon: RiErrorWarningLine, title: "Overdue, surfaced.", body: "See every tenant who's behind, how many days late, and how much they owe. One tap to send a friendly reminder." },
  { icon: RiGroupLine, title: "Tenants get a portal.", body: 'Renters log in to see their bill, pay it, and pull up old receipts. No more "Sir, magkano ulit po?"' },
  { icon: RiBuilding2Line, title: "Multi-property by default.", body: "Run one boarding house, three apartments, and a transient unit from the same account. Numbers roll up cleanly." },
  { icon: RiBarChartLine, title: "Real numbers, monthly.", body: "See expected vs collected vs overdue at a glance. Export to spreadsheet for your accountant when tax season hits." },
]

const PAYMENT_ROWS = [
  { logo: "/gcash.jpeg", name: "GCash", color: "#ffffff", line: "₱6,500.00 · GC-2026050412987", image: true, fill: true },
  { logo: "/Maya.svg", name: "Maya", color: "#050505", line: "₱7,500.00 · MY-2026050518224", image: true },
  { logo: "/bdo.jpg", name: "Bank Transfer", color: "#ffffff", line: "₱9,250.00 · BPI-771029", image: true, fill: true },
  { logo: "₱", name: "Cash", color: "#78716c", line: "₱4,500.00 · Hand-delivered" },
]

const TENANT_BULLETS = [
  "Current bill front and center, with status badge",
  "One-tap call or message to landlord",
  "Full payment history with reference numbers",
  "Optional Tagalog interface",
]

const FAQS = [
  { q: "Do I need to install anything?", a: "No. Doorwise runs in your browser. There's also a mobile-friendly view so you can check things on the jeepney." },
  { q: "Can I import my existing tenants?", a: "Yes — drop in a spreadsheet of names, rooms, and rents and we'll set up bills for the next cycle automatically." },
  { q: "How do payments work?", a: "Doorwise doesn't hold your money — tenants pay you directly via GCash, Maya, bank, or cash. You just record the payment with one tap; we keep the ledger clean." },
  { q: "Is my data safe?", a: "Your data lives in encrypted Philippine-based servers. We don't share or sell anything. Export and delete anytime." },
  { q: "Can my staff log in too?", a: "On Pro you can invite staff with role-based access — they can record payments but not change rent or end leases." },
  { q: "What if I have only one bedspacer?", a: "Doorwise is free up to 5 rooms forever. Use as much as you need; pay nothing until you outgrow it." },
]

const FOOTER_COLS = [
  { title: "Product", links: ["Features", "Pricing", "Tenant portal", "Changelog", "Roadmap"] },
  { title: "Company", links: ["About", "Customers", "Blog", "Careers", "Contact"] },
  { title: "Resources", links: ["Help center", "Guides", "API docs", "Status", "Security"] },
  { title: "Legal", links: ["Terms", "Privacy", "Data Privacy Act", "Cookies"] },
]

function Logo({ className }: { className?: string }) {
  return (
    <span
      className={`bg-primary text-primary-foreground flex size-7 items-center justify-center rounded-lg ${className ?? ""}`}
    >
      <RiDoorClosedLine className="size-4" />
    </span>
  )
}

export function LandingPage() {
  return (
    <div className="bg-background text-foreground min-h-svh">
      {/* Nav */}
      <header className="bg-background/85 sticky top-0 z-50 border-b backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center gap-8 px-6 py-3.5">
          <Link href="/" className="flex items-center gap-2.5">
            <Logo />
            <span className="font-heading text-base font-bold tracking-tight">
              Doorwise
            </span>
          </Link>
          <nav className="text-muted-foreground hidden items-center gap-6 text-[13.5px] md:flex">
            {NAV_LINKS.map((l) => (
              <Link key={l.label} href={l.href} className="hover:text-foreground transition-colors">
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="ml-auto">
            <LandingHeaderActions />
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle_at_1px_1px,var(--border)_1px,transparent_0)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,black_30%,transparent_70%)]"
        />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 md:py-20 lg:grid-cols-[5fr_6fr]"
        >
          <motion.div variants={fadeUp}>
            <motion.div
              whileHover={{ y: -2 }}
              className="bg-card text-muted-foreground mb-5 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium shadow-sm"
            >
              <motion.span
                animate={{ scale: [1, 1.6, 1], opacity: [1, 0.6, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="bg-paid-foreground size-1.5 rounded-full"
              />
              Trusted by 1,800+ landlords across the Philippines
            </motion.div>
            <h1 className="font-heading text-4xl leading-[1.04] font-bold tracking-tight text-balance md:text-5xl lg:text-[3.5rem]">
              Collect rent{" "}
              <em className="text-muted-foreground font-medium">without</em> the
              group chat.
            </h1>
            <p className="text-muted-foreground mt-4 max-w-md text-[17px] leading-relaxed">
              Doorwise is a calm, no-nonsense way to run your boarding house,
              apartment, or bed-spacer. Bills, payments, GCash receipts, overdue
              tracking — all in one place. Tagalog and English friendly.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-2.5">
              <LandingSignUpAction size="lg" className="rounded-md">
                Start free
                <RiArrowRightLine />
              </LandingSignUpAction>
              <Button variant="outline" size="lg" className="rounded-md">
                <RiEyeLine />
                Watch demo (2 min)
              </Button>
            </div>
            <div className="text-muted-foreground mt-4.5 flex flex-wrap gap-4 text-[12.5px]">
              {["Free up to 5 rooms", "No credit card", "Setup in 5 min"].map(
                (t) => (
                  <span key={t} className="inline-flex items-center gap-1.5">
                    <RiCheckLine className="text-paid-foreground size-3.5" />
                    {t}
                  </span>
                ),
              )}
            </div>
          </motion.div>
          <motion.div
            variants={fadeUp}
            transition={{ delay: 0.15 }}
            className="relative"
          >
            <motion.div
              aria-hidden
              animate={{ rotate: 360 }}
              transition={{ duration: 28, ease: "linear", repeat: Infinity }}
              className="from-primary/20 via-paid/20 to-overdue/20 absolute -inset-6 -z-10 rounded-full bg-gradient-to-r blur-3xl"
            />
            <motion.div animate={floatSlow}>
              <HeroPreview />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Trust strip — marquee */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={fadeUp}
        className="text-muted-foreground pt-10 pb-2 text-center text-xs font-medium tracking-widest uppercase"
      >
        Trusted across Metro Manila, Cebu, and Davao
      </motion.div>
      <section className="bg-card border-y">
        <div className="relative overflow-hidden py-5">
          {/* fade edges */}
          <div className="from-card pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r to-transparent" />
          <div className="from-card pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l to-transparent" />
          <motion.div
            animate={{ x: ["-50%", "0%"] }}
            transition={{ duration: 22, ease: "linear", repeat: Infinity }}
            className="text-muted-foreground/50 flex w-max items-center gap-16 whitespace-nowrap text-xl font-semibold"
          >
            {/* duplicate set for seamless loop */}
            {[0, 1].map((copy) => (
              <div key={copy} className="flex items-center gap-16">
                <span className="italic">Mabini Houses</span>
                <span>KATIPUNAN<span className="font-normal">Apts</span></span>
                <span className="tracking-[0.25em]">TAFT<span className="tracking-normal">·hub</span></span>
                <span className="font-mono">halfway/quarter</span>
                <span>Cebu Living Co.</span>
                <span>Sampaloc Suites</span>
                <span className="font-mono">EDSA/rooms</span>
                <span className="italic">Davao Dorm Co.</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <motion.section
        id="features"
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={staggerContainer}
        className="mx-auto max-w-6xl px-6 py-20"
      >
        <motion.div variants={fadeUp} className="mx-auto mb-12 max-w-xl text-center">
          <div className="text-primary mb-3 text-xs font-semibold tracking-widest uppercase">
            Everything you need
          </div>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-balance md:text-4xl">
            A whole admin team in your pocket.
          </h2>
          <p className="text-muted-foreground mt-3.5 leading-relaxed">
            Built for people who got into rentals to make money, not to spend
            Sundays chasing payments in a notebook.
          </p>
        </motion.div>
        <motion.div
          variants={staggerContainer}
          className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {FEATURES.map((f, i) => {
            const Icon = f.icon
            return (
              <motion.div
                key={f.title}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className="bg-card rounded-xl border p-6 shadow-sm transition-shadow hover:shadow-lg"
              >
                <motion.div
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
                  className="bg-accent text-primary mb-3.5 flex size-10 items-center justify-center rounded-md"
                >
                  <Icon className="size-5" />
                </motion.div>
                <div className="mb-1.5 text-[15px] font-semibold">
                  {f.title}
                </div>
                <div className="text-muted-foreground text-[13.5px] leading-relaxed">
                  {f.body}
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </motion.section>

      {/* Payments */}
      <section className="bg-card border-y">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-[5fr_6fr]"
        >
          <motion.div variants={fadeUp}>
            <div className="text-primary mb-3 text-xs font-semibold tracking-widest uppercase">
              Built for the Philippines
            </div>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-balance">
              Every payment method your tenants actually use.
            </h2>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              Cash, GCash, Maya, bank transfer — whatever they use, Doorwise
              records it with the reference number, date, and method. No more
              guessing whose deposit slip is whose.
            </p>
            <div className="mt-5.5 flex flex-col gap-3">
              {PAYMENT_ROWS.map((p) => (
                <motion.div
                  key={p.name}
                  variants={fadeUp}
                  whileHover={{ x: 6 }}
                  className="bg-background flex items-center gap-3.5 rounded-md border p-3.5"
                >
                  <div
                    className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-md border text-sm font-bold text-white"
                    style={{ background: p.color }}
                  >
                    {p.image ? (
                      <Image
                        src={p.logo}
                        alt={`${p.name} logo`}
                        width={28}
                        height={28}
                        className={
                          p.fill
                            ? "h-full w-full object-cover"
                            : "h-7 w-7 object-contain"
                        }
                      />
                    ) : (
                      p.logo
                    )}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{p.name}</div>
                    <div className="text-muted-foreground font-mono text-xs">
                      {p.line}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          {/* Payment confirmed card */}
          <motion.div variants={fadeUp} className="mx-auto w-full max-w-sm">
            <div className="bg-background rounded-2xl border p-6 shadow-lg">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2.4, repeat: Infinity }}
                className="bg-paid text-paid-foreground mx-auto mb-4 flex size-14 items-center justify-center rounded-full"
              >
                <RiCheckLine className="size-7" />
              </motion.div>
              <div className="text-muted-foreground text-center text-[13px]">
                Payment recorded
              </div>
              <div className="text-center font-mono text-3xl font-semibold tracking-tight tabular-nums">
                ₱6,500.00
              </div>
              <div className="text-muted-foreground mb-4.5 text-center text-[13.5px]">
                from{" "}
                <span className="text-foreground font-semibold">
                  Maria Santos
                </span>
              </div>
              <div className="flex flex-col gap-2 border-t pt-3.5 text-[13px]">
                <KV k="Method" v="GCash" />
                <KV k="Reference" v="GC-2026050412987" mono />
                <KV k="Date" v="May 4, 2026" />
                <KV k="Room" v="Room 101 · Mabini" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Tenant portal */}
      <motion.section
        id="tenants"
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={staggerContainer}
        className="mx-auto max-w-6xl px-6 py-20"
      >
        <div className="grid items-center gap-12 lg:grid-cols-[6fr_5fr]">
          <motion.div variants={fadeUp}>
            <motion.div animate={float}>
              <TenantPreview />
            </motion.div>
          </motion.div>
          <motion.div variants={fadeUp}>
            <div className="text-primary mb-3 text-xs font-semibold tracking-widest uppercase">
              Your tenants love it too
            </div>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-balance">
              A portal renters actually open.
            </h2>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              Tenants get a clean, friendly view of their current bill, payment
              history, and your landlord contact info. Pay GCash directly to
              your number — Doorwise reminds them where to send it.
            </p>
            <ul className="mt-6 flex flex-col gap-3.5">
              {TENANT_BULLETS.map((b) => (
                <li key={b} className="flex items-start gap-3 text-[14.5px]">
                  <span className="bg-paid text-paid-foreground mt-0.5 flex size-5.5 shrink-0 items-center justify-center rounded-full">
                    <RiCheckLine className="size-3.5" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.section>

      {/* Pricing */}
      <motion.section
        id="pricing"
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={staggerContainer}
        className="mx-auto max-w-6xl px-6 py-20"
      >
        <motion.div variants={fadeUp} className="mx-auto mb-11 max-w-xl text-center">
          <div className="text-primary mb-3 text-xs font-semibold tracking-widest uppercase">
            Pricing
          </div>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-balance md:text-4xl">
            Pay for what you manage, not per tenant.
          </h2>
          <p className="text-muted-foreground mt-3.5 leading-relaxed">
            Start free, upgrade when you outgrow it. Cancel anytime — no
            contract, no exit fees.
          </p>
        </motion.div>
        <motion.div
          variants={staggerContainer}
          className="grid items-stretch gap-4.5 md:grid-cols-3"
        >
          {PLANS.map((tier) => (
            <motion.div
              key={tier.name}
              variants={fadeUp}
              whileHover={{ y: -8 }}
              className={
                tier.highlight
                  ? "bg-primary text-primary-foreground relative flex flex-col gap-4.5 rounded-2xl p-7 shadow-xl"
                  : "bg-card relative flex flex-col gap-4.5 rounded-2xl border p-7"
              }
            >
              {/* Animated glow behind the highlighted card */}
              {tier.highlight && (
                <motion.div
                  aria-hidden
                  animate={{ opacity: [0.4, 0.7, 0.4], scale: [0.95, 1.02, 0.95] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="bg-primary/30 absolute -inset-1 -z-10 rounded-3xl blur-xl"
                />
              )}
              {tier.highlight && (
                <div className="bg-primary-foreground/15 absolute top-4 right-4 rounded-full px-2 py-0.5 text-[10.5px] font-semibold tracking-wide uppercase">
                  Most popular
                </div>
              )}
              <div>
                <div className="text-sm font-semibold opacity-80">
                  {tier.name}
                </div>
                <div className="mt-2.5 flex items-baseline gap-2">
                  <div className="font-mono text-4xl font-bold tracking-tight">
                    {tier.price}
                  </div>
                  {tier.price !== "₱0" && (
                    <div className="text-[13px] opacity-70">/ month</div>
                  )}
                </div>
                <div className="mt-1 text-[13px] opacity-80">
                  {tier.priceNote}
                </div>
              </div>
              <div
                className={
                  tier.highlight
                    ? "bg-primary-foreground/10 flex items-center justify-between rounded-md px-3 py-2 text-[12.5px]"
                    : "bg-muted text-muted-foreground flex items-center justify-between rounded-md px-3 py-2 text-[12.5px]"
                }
              >
                <span>
                  <span className="font-semibold">
                    {fmtLimit(tier.limits.properties)}
                  </span>{" "}
                  properties
                </span>
                <span
                  className={
                    tier.highlight
                      ? "bg-primary-foreground/30 h-3.5 w-px"
                      : "bg-border h-3.5 w-px"
                  }
                />
                <span>
                  <span className="font-semibold">
                    {fmtLimit(tier.limits.tenants)}
                  </span>{" "}
                  tenants
                </span>
              </div>
              <LandingSignUpAction
                variant={tier.highlight ? "secondary" : "default"}
                className="w-full rounded-md"
              >
                {tier.cta}
              </LandingSignUpAction>
              <ul className="flex flex-col gap-2.5">
                {tier.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-[13.5px] opacity-95"
                  >
                    <RiCheckLine
                      className={
                        tier.highlight
                          ? "mt-0.5 size-3.5 shrink-0 opacity-85"
                          : "text-paid-foreground mt-0.5 size-3.5 shrink-0"
                      }
                    />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* FAQ */}
      <section id="faq" className="bg-card border-y">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={fadeUp}
          className="mx-auto max-w-3xl px-6 py-20"
        >
          <div className="mb-9 text-center">
            <div className="text-primary mb-3 text-xs font-semibold tracking-widest uppercase">
              FAQ
            </div>
            <h2 className="font-heading text-3xl font-bold tracking-tight">
              Questions, answered.
            </h2>
          </div>
          <Accordion
            type="single"
            collapsible
            defaultValue="faq-0"
            className="bg-background"
          >
            {FAQS.map((f, i) => (
              <AccordionItem key={f.q} value={`faq-${i}`}>
                <AccordionTrigger className="px-5 py-4 text-[15px] font-semibold hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="text-muted-foreground px-1 pb-4 text-sm leading-relaxed">
                    {f.a}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr]">
          <div>
            <div className="mb-3.5 flex items-center gap-2.5">
              <Logo />
              <span className="font-heading text-base font-bold tracking-tight">
                Doorwise
              </span>
            </div>
            <p className="text-muted-foreground max-w-xs text-[13px] leading-relaxed">
              Property management software for Filipino landlords. Made in
              Quezon City. SEC Reg. 2024-118273.
            </p>
          </div>
          {FOOTER_COLS.map((col) => (
            <div key={col.title}>
              <div className="mb-3 text-xs font-semibold tracking-wide uppercase">
                {col.title}
              </div>
              <ul className="text-muted-foreground flex flex-col gap-2 text-[13px]">
                {col.links.map((l) => (
                  <li
                    key={l}
                    className="hover:text-foreground transition-colors"
                  >
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="text-muted-foreground mx-auto flex max-w-6xl flex-col justify-between gap-3 border-t px-6 py-5 text-xs sm:flex-row">
          <span>© 2026 Doorwise Technologies, Inc. All rights reserved.</span>
          <span className="flex gap-3.5">
            <span>Twitter</span>
            <span>Facebook</span>
            <span>LinkedIn</span>
          </span>
        </div>
      </footer>
    </div>
  )
}

function KV({ k, v, mono }: { k: string; v: string; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{k}</span>
      <span className={mono ? "font-mono font-medium" : "font-medium"}>{v}</span>
    </div>
  )
}

/** Stylized in-browser dashboard preview for the hero. */
function HeroPreview() {
  const stats = [
    { label: "Expected", value: "₱261,500", tone: "" },
    { label: "Collected", value: "₱186,500", tone: "text-paid-foreground" },
    { label: "Overdue", value: "₱25,500", tone: "text-overdue-foreground" },
    { label: "Occupancy", value: "85%", tone: "" },
  ]
  const overdue = [
    { name: "Paolo Ramirez", room: "Room 104", amount: "₱6,500" },
    { name: "Carlos Bautista", room: "Room 203", amount: "₱7,500" },
    { name: "Sofia Navarro", room: "Unit C", amount: "₱19,000" },
  ]
  return (
    <div className="bg-card overflow-hidden rounded-2xl border shadow-xl">
      {/* browser bar */}
      <div className="bg-muted flex items-center gap-2.5 border-b px-3.5 py-2.5">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-[#fe5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#27c93f]" />
        </div>
        <div className="bg-card text-muted-foreground flex h-5.5 flex-1 items-center justify-center rounded border font-mono text-[11px]">
          app.doorwise.ph / dashboard
        </div>
      </div>
      <div className="p-4.5">
        <div className="mb-3.5 text-[13px] font-bold">Dashboard</div>
        <div className="mb-3.5 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-background rounded-lg border p-2.5">
              <div className="text-muted-foreground text-[9px] tracking-wide uppercase">
                {s.label}
              </div>
              <div
                className={`font-mono text-[13px] font-semibold tabular-nums ${s.tone}`}
              >
                {s.value}
              </div>
            </div>
          ))}
        </div>
        <div className="overflow-hidden rounded-lg border">
          <div className="bg-surface-subtle text-muted-foreground flex items-center gap-2 px-3 py-2 text-[11px] font-semibold tracking-wide uppercase">
            <span className="relative flex size-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-destructive opacity-75" />
              <span className="relative size-1.5 rounded-full bg-destructive" />
            </span>
            Needs attention
          </div>
          {overdue.map((o, i) => (
            <div
              key={o.name}
              className={`flex items-center gap-2 px-3 py-2 text-xs ${i > 0 ? "border-t" : ""}`}
            >
              <span className="font-medium">{o.name}</span>
              <span className="text-muted-foreground ml-auto text-[11px]">
                {o.room}
              </span>
              <span className="font-mono font-semibold">{o.amount}</span>
              <span className="bg-overdue text-overdue-foreground border-overdue-border rounded-full border px-1.5 py-0.5 text-[10px]">
                Overdue
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/** Stylized tenant-portal phone preview. */
function TenantPreview() {
  return (
    <div className="from-surface-subtle to-background flex justify-center overflow-hidden rounded-3xl border bg-gradient-to-b px-6 pt-10">
      <div className="bg-card w-64 rounded-t-3xl border border-b-0 p-5 shadow-xl">
        <div className="mb-4 flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-full bg-[#dbeafe] text-sm font-semibold text-[#1e40af]">
            MS
          </span>
          <div>
            <div className="text-muted-foreground text-[11px]">
              Good evening,
            </div>
            <div className="text-base font-bold tracking-tight">Maria</div>
          </div>
        </div>
        <div className="bg-primary text-primary-foreground rounded-2xl p-4">
          <div className="text-[11px] tracking-wide uppercase opacity-85">
            Amount due
          </div>
          <div className="font-mono text-2xl font-semibold tracking-tight tabular-nums">
            ₱6,500.00
          </div>
          <div className="mt-2 text-[12px] opacity-90">
            May 2026 · Due May 5, 2026
          </div>
          <div className="mt-3.5 flex gap-2">
            <div className="bg-primary-foreground text-primary flex h-8 flex-1 items-center justify-center rounded-md text-[12px] font-semibold">
              Pay now
            </div>
            <div className="flex h-8 items-center px-3 text-[12px] opacity-90">
              View bill
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
