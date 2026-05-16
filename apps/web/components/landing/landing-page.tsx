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
import {
  fadeUp,
  staggerContainer,
  float,
  floatSlow,
} from "@/components/motion/presets"
import { fmtLimit, PLANS } from "@/lib/mock/plans"

const viewportOnce = { once: true, amount: 0.22 }

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "For residents", href: "#residents" },
  { label: "Help", href: "#faq" },
]

const FEATURES = [
  {
    icon: RiReceiptLine,
    title: "Bills, generated.",
    body: "One click creates monthly bills for every active lease. Adjustable due day, prorated first month, automated SMS reminders.",
  },
  {
    icon: RiMoneyDollarCircleLine,
    title: "GCash & Maya, sorted.",
    body: "Record digital payments with reference numbers in seconds. Track who paid what, when, and how — no more screenshots in chat.",
  },
  {
    icon: RiErrorWarningLine,
    title: "Overdue, surfaced.",
    body: "See every resident who's behind, how many days late, and how much they owe. One tap to send a friendly reminder.",
  },
  {
    icon: RiGroupLine,
    title: "Residents get a portal.",
    body: 'Renters log in to see their bill, pay it, and pull up old receipts. No more "Sir, magkano ulit po?"',
  },
  {
    icon: RiBuilding2Line,
    title: "Multi-property by default.",
    body: "Run one boarding house, three apartments, and a transient unit from the same account. Numbers roll up cleanly.",
  },
  {
    icon: RiBarChartLine,
    title: "Real numbers, monthly.",
    body: "See expected vs collected vs overdue at a glance. Export to spreadsheet for your accountant when tax season hits.",
  },
]

const PAYMENT_ROWS = [
  {
    logo: "/gcash.jpeg",
    name: "GCash",
    color: "#ffffff",
    line: "₱6,500.00 · GC-2026050412987",
    image: true,
    fill: true,
  },
  {
    logo: "/Maya.svg",
    name: "Maya",
    color: "#050505",
    line: "₱7,500.00 · MY-2026050518224",
    image: true,
  },
  {
    logo: "/bdo.jpg",
    name: "Bank Transfer",
    color: "#ffffff",
    line: "₱9,250.00 · BPI-771029",
    image: true,
    fill: true,
  },
  {
    logo: "₱",
    name: "Cash",
    color: "#78716c",
    line: "₱4,500.00 · Hand-delivered",
  },
]

const TENANT_BULLETS = [
  "Current bill front and center, with status badge",
  "One-tap call or message to landlord",
  "Full payment history with reference numbers",
  "Optional Tagalog interface",
]

const HOW_IT_WORKS = [
  {
    n: "01",
    title: "Add your properties & rooms",
    body: "Set up your boarding house, apartments, or bed-spacer units in about five minutes. Import a spreadsheet or type them in.",
  },
  {
    n: "02",
    title: "Residents get their portal link",
    body: "Send each resident a link by SMS. They open it on their phone — no app install, no signup friction.",
  },
  {
    n: "03",
    title: "Collect and track",
    body: "Bills auto-generate every month. Record payments in one tap. Doorwise keeps the ledger clean for you.",
  },
]

const TESTIMONIALS = [
  {
    initials: "AC",
    avatarBg: "#fce7f3",
    avatarFg: "#9d174d",
    quote: "Dati Excel na Excel ako. Ngayon isang click na lang.",
    name: "Ate Cynthia",
    location: "Sampaloc",
    meta: "12 rooms",
  },
  {
    initials: "RS",
    avatarBg: "#dbeafe",
    avatarFg: "#1e40af",
    quote: "My tenants actually pay on time now because they get reminders.",
    name: "Ricky Santos",
    location: "Davao",
    meta: "8 units",
  },
  {
    initials: "GL",
    avatarBg: "#dcfce7",
    avatarFg: "#166534",
    quote: "Nag-refund ng sobrang bayad in 30 seconds. Sana all.",
    name: "Grace Lim",
    location: "Cebu City",
    meta: "3 boarding houses",
  },
]

const FAQS = [
  {
    q: "Do I need to install anything?",
    a: "No. Doorwise runs in your browser. There's also a mobile-friendly view so you can check things on the jeepney.",
  },
  {
    q: "Can I import my existing residents?",
    a: "Yes — drop in a spreadsheet of names, rooms, and rents and we'll set up bills for the next cycle automatically.",
  },
  {
    q: "How do payments work?",
    a: "Doorwise doesn't hold your money — residents pay you directly via GCash, Maya, bank, or cash. You just record the payment with one tap; we keep the ledger clean.",
  },
  {
    q: "Is my data safe?",
    a: "Your data lives in encrypted Philippine-based servers. We don't share or sell anything. Export and delete anytime.",
  },
  {
    q: "Can my staff log in too?",
    a: "On Pro you can invite staff with role-based access — they can record payments but not change rent or end leases.",
  },
  {
    q: "What if I have only one bedspacer?",
    a: "Doorwise is free up to 5 rooms forever. Use as much as you need; pay nothing until you outgrow it.",
  },
]

const FOOTER_COLS = [
  {
    title: "Product",
    links: ["Features", "Pricing", "Resident portal", "Changelog", "Roadmap"],
  },
  {
    title: "Company",
    links: ["About", "Customers", "Blog", "Careers", "Contact"],
  },
  {
    title: "Resources",
    links: ["Help center", "Guides", "API docs", "Status", "Security"],
  },
  {
    title: "Legal",
    links: ["Terms", "Privacy", "Data Privacy Act", "Cookies"],
  },
]

function Logo({ className }: { className?: string }) {
  return (
    <span
      className={`flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground ${className ?? ""}`}
    >
      <RiDoorClosedLine className="size-4" />
    </span>
  )
}

export function LandingPage() {
  return (
    <div className="min-h-svh bg-background text-foreground">
      {/* Dark hero + trust strip scope */}
      <div className="relative bg-zinc-950 text-white">
        {/* Nav */}
        <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/80 backdrop-blur-md">
          <div className="mx-auto flex max-w-6xl items-center gap-8 px-6 py-3.5">
            <Link href="/" className="flex items-center gap-2.5">
              <Logo />
              <span className="font-heading text-base font-bold tracking-tight text-white">
                Doorwise
              </span>
            </Link>
            <nav className="hidden items-center gap-6 text-[13.5px] text-zinc-400 md:flex">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="transition-colors hover:text-white"
                >
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
          {/* dot grid overlay tuned for dark bg */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.08)_1px,transparent_0)] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,black_30%,transparent_70%)] [background-size:20px_20px]"
          />
          {/* ambient glow blobs */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-32 left-1/2 size-[640px] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]"
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
                className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-300 ring-1 ring-white/10 backdrop-blur-sm"
              >
                <motion.span
                  animate={{ scale: [1, 1.6, 1], opacity: [1, 0.6, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="size-1.5 rounded-full bg-emerald-400"
                />
                Trusted by landlords across the Philippines
              </motion.div>
              <h1 className="bg-gradient-to-r from-white to-zinc-400 bg-clip-text font-heading text-4xl leading-[1.04] font-bold tracking-tight text-balance text-transparent md:text-5xl lg:text-[3.5rem]">
                Collect rent <em className="font-medium opacity-70">without</em>{" "}
                the group chat.
              </h1>
              <p className="mt-4 max-w-md text-[17px] leading-relaxed text-zinc-400">
                Doorwise is a calm, no-nonsense way to run your boarding house,
                apartment, or bed-spacer. Bills, payments, GCash receipts,
                overdue tracking — all in one place. Tagalog and English
                friendly.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-2.5">
                <LandingSignUpAction size="lg" className="rounded-md">
                  Start free
                  <RiArrowRightLine />
                </LandingSignUpAction>
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-md border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                >
                  <RiEyeLine />
                  Watch demo (2 min)
                </Button>
              </div>
              <div className="mt-4.5 flex flex-wrap gap-4 text-[12.5px] text-zinc-400">
                {["Free up to 5 rooms", "No credit card", "Setup in 5 min"].map(
                  (t) => (
                    <span key={t} className="inline-flex items-center gap-1.5">
                      <RiCheckLine className="size-3.5 text-emerald-400" />
                      {t}
                    </span>
                  )
                )}
              </div>
            </motion.div>
            <motion.div
              variants={fadeUp}
              transition={{ delay: 0.15 }}
              className="relative"
            >
              {/* Glowing blob behind the preview */}
              <motion.div
                aria-hidden
                animate={{ rotate: 360 }}
                transition={{ duration: 28, ease: "linear", repeat: Infinity }}
                className="absolute -inset-10 -z-10 rounded-full bg-gradient-to-r from-primary/40 via-fuchsia-500/20 to-cyan-400/30 blur-3xl"
              />
              <motion.div
                aria-hidden
                animate={{ opacity: [0.5, 0.85, 0.5] }}
                transition={{
                  duration: 4,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
                className="absolute inset-0 -z-10 rounded-3xl bg-primary/30 blur-2xl"
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
          className="pt-10 pb-2 text-center text-xs font-medium tracking-widest text-zinc-500 uppercase"
        >
          Trusted across Metro Manila, Cebu, and Davao
        </motion.div>
        <section className="border-y border-white/10 bg-zinc-900/60">
          <div className="relative overflow-hidden py-5">
            {/* fade edges */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-zinc-900 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-zinc-900 to-transparent" />
            <motion.div
              animate={{ x: ["-50%", "0%"] }}
              transition={{ duration: 22, ease: "linear", repeat: Infinity }}
              className="flex w-max items-center gap-16 text-xl font-semibold whitespace-nowrap text-zinc-500"
            >
              {/* duplicate set for seamless loop */}
              {[0, 1].map((copy) => (
                <div key={copy} className="flex items-center gap-16">
                  <span className="italic">Mabini Houses</span>
                  <span>
                    KATIPUNAN<span className="font-normal">Apts</span>
                  </span>
                  <span className="tracking-[0.25em]">
                    TAFT<span className="tracking-normal">·hub</span>
                  </span>
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
      </div>

      {/* Features */}
      <motion.section
        id="features"
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={staggerContainer}
        className="mx-auto max-w-6xl px-6 py-20"
      >
        <motion.div
          variants={fadeUp}
          className="mx-auto mb-12 max-w-xl text-center"
        >
          <div className="mb-3 text-xs font-semibold tracking-widest text-primary uppercase">
            Everything you need
          </div>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-balance md:text-4xl">
            A whole admin team in your pocket.
          </h2>
          <p className="mt-3.5 leading-relaxed text-muted-foreground">
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
                className="rounded-xl border border-t-2 border-t-primary/40 bg-card p-6 shadow-sm transition-shadow hover:shadow-lg"
              >
                <motion.div
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.4,
                  }}
                  className="mb-3.5 flex size-10 items-center justify-center rounded-md bg-accent text-primary"
                >
                  <Icon className="size-5" />
                </motion.div>
                <div className="mb-1.5 text-[15px] font-semibold">
                  {f.title}
                </div>
                <div className="text-[13.5px] leading-relaxed text-muted-foreground">
                  {f.body}
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </motion.section>

      {/* How it works */}
      <section className="border-y bg-card">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="mx-auto max-w-6xl px-6 py-20"
        >
          <motion.div
            variants={fadeUp}
            className="mx-auto mb-12 max-w-xl text-center"
          >
            <div className="mb-3 text-xs font-semibold tracking-widest text-primary uppercase">
              How it works
            </div>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-balance md:text-4xl">
              Three steps. That&apos;s it.
            </h2>
            <p className="mt-3.5 leading-relaxed text-muted-foreground">
              No onboarding calls, no training. Most landlords are collecting
              their first bill within the hour.
            </p>
          </motion.div>
          <div className="relative">
            {/* Connector line (desktop only) */}
            <div
              aria-hidden
              className="pointer-events-none absolute top-7 right-[12%] left-[12%] hidden h-px bg-gradient-to-r from-transparent via-border to-transparent md:block"
            />
            <motion.div
              variants={staggerContainer}
              className="relative grid gap-8 md:grid-cols-3 md:gap-6"
            >
              {HOW_IT_WORKS.map((step) => (
                <motion.div
                  key={step.n}
                  variants={fadeUp}
                  className="relative flex flex-col items-center text-center"
                >
                  <div className="relative mb-5">
                    <div className="absolute inset-0 -z-10 rounded-full bg-primary/20 blur-xl" />
                    <div className="flex size-14 items-center justify-center rounded-full border bg-background font-mono text-base font-bold text-primary shadow-sm ring-4 ring-card">
                      {step.n}
                    </div>
                  </div>
                  <div className="mb-2 text-[15.5px] font-semibold">
                    {step.title}
                  </div>
                  <div className="max-w-xs text-[13.5px] leading-relaxed text-muted-foreground">
                    {step.body}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Payments */}
      <section className="border-b bg-background">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-[5fr_6fr]"
        >
          <motion.div variants={fadeUp}>
            <div className="mb-3 text-xs font-semibold tracking-widest text-primary uppercase">
              Built for the Philippines
            </div>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-balance">
              Every payment method your residents actually use.
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Cash, GCash, Maya, bank transfer — whatever they use, Doorwise
              records it with the reference number, date, and method. No more
              guessing whose deposit slip is whose.
            </p>
            <div className="mt-5.5 flex flex-col gap-2.5">
              {PAYMENT_ROWS.map((p) => (
                <motion.div
                  key={p.name}
                  variants={fadeUp}
                  whileHover={{ x: 6 }}
                  className="group flex items-center gap-3.5 rounded-lg border bg-card p-3.5 transition-colors hover:border-primary/30"
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
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-semibold">{p.name}</div>
                    <div className="font-mono text-xs text-muted-foreground">
                      {p.line}
                    </div>
                  </div>
                  <RiCheckLine className="size-4 text-paid-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </motion.div>
              ))}
            </div>
          </motion.div>
          {/* Payment confirmed card */}
          <motion.div variants={fadeUp} className="mx-auto w-full max-w-sm">
            <div className="rounded-2xl border bg-card p-6 shadow-lg">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2.4, repeat: Infinity }}
                className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-paid text-paid-foreground"
              >
                <RiCheckLine className="size-7" />
              </motion.div>
              <div className="text-center text-[13px] text-muted-foreground">
                Payment recorded
              </div>
              <div className="text-center font-mono text-3xl font-semibold tracking-tight tabular-nums">
                ₱6,500.00
              </div>
              <div className="mb-4.5 text-center text-[13.5px] text-muted-foreground">
                from{" "}
                <span className="font-semibold text-foreground">
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

      {/* Resident portal */}
      <motion.section
        id="residents"
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
            <div className="mb-3 text-xs font-semibold tracking-widest text-primary uppercase">
              Your residents love it too
            </div>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-balance">
              A portal renters actually open.
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Residents get a clean, friendly view of their current bill,
              payment history, and your landlord contact info. Pay GCash
              directly to your number — Doorwise reminds them where to send it.
            </p>
            <ul className="mt-6 flex flex-col gap-3.5">
              {TENANT_BULLETS.map((b) => (
                <li key={b} className="flex items-start gap-3 text-[14.5px]">
                  <span className="mt-0.5 flex size-5.5 shrink-0 items-center justify-center rounded-full bg-paid text-paid-foreground">
                    <RiCheckLine className="size-3.5" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonials */}
      <section className="relative overflow-hidden border-y border-white/10 bg-zinc-950 text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_0)] [mask-image:radial-gradient(ellipse_60%_70%_at_50%_50%,black_40%,transparent_75%)] [background-size:24px_24px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-1/2 size-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[120px]"
        />
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="relative mx-auto max-w-6xl px-6 py-20"
        >
          <motion.div
            variants={fadeUp}
            className="mx-auto mb-12 max-w-xl text-center"
          >
            <div className="mb-3 text-xs font-semibold tracking-widest text-primary uppercase">
              Loved by landlords
            </div>
            <h2 className="bg-gradient-to-r from-white to-zinc-400 bg-clip-text font-heading text-3xl font-bold tracking-tight text-balance text-transparent md:text-4xl">
              Sana all, may Doorwise na.
            </h2>
            <p className="mt-3.5 leading-relaxed text-zinc-400">
              Real landlords, real boarding houses, real receipts. Here&apos;s
              what they say after switching from notebooks and group chats.
            </p>
          </motion.div>
          <motion.div
            variants={staggerContainer}
            className="grid gap-5 md:grid-cols-3"
          >
            {TESTIMONIALS.map((t) => (
              <motion.div
                key={t.name}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className="relative flex flex-col gap-4 rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur-sm transition-shadow hover:shadow-[0_0_40px_rgba(120,119,198,0.25)]"
              >
                <div className="flex gap-0.5 text-amber-400">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <svg
                      key={i}
                      viewBox="0 0 20 20"
                      className="size-4 fill-current"
                      aria-hidden
                    >
                      <path d="M10 1.5l2.7 5.47 6.04.88-4.37 4.26 1.03 6.01L10 15.27l-5.4 2.84 1.03-6.01L1.26 7.85l6.04-.88L10 1.5z" />
                    </svg>
                  ))}
                </div>
                <p className="text-[14.5px] leading-relaxed text-zinc-200">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-auto flex items-center gap-3 border-t border-white/10 pt-4">
                  <span
                    className="flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold"
                    style={{ background: t.avatarBg, color: t.avatarFg }}
                  >
                    {t.initials}
                  </span>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-white">
                      {t.name}
                    </div>
                    <div className="text-[12px] text-zinc-400">
                      {t.location} · {t.meta}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Pricing */}
      <motion.section
        id="pricing"
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={staggerContainer}
        className="mx-auto max-w-6xl px-6 py-20"
      >
        <motion.div
          variants={fadeUp}
          className="mx-auto mb-11 max-w-xl text-center"
        >
          <div className="mb-3 text-xs font-semibold tracking-widest text-primary uppercase">
            Pricing
          </div>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-balance md:text-4xl">
            Pay for what you manage, not per tenant.
          </h2>
          <p className="mt-3.5 leading-relaxed text-muted-foreground">
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
                  ? "relative flex flex-col gap-4.5 rounded-2xl bg-primary p-7 text-primary-foreground shadow-xl"
                  : "relative flex flex-col gap-4.5 rounded-2xl border bg-card p-7"
              }
            >
              {/* Animated glow behind the highlighted card */}
              {tier.highlight && (
                <motion.div
                  aria-hidden
                  animate={{
                    opacity: [0.4, 0.7, 0.4],
                    scale: [0.95, 1.02, 0.95],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -inset-1 -z-10 rounded-3xl bg-primary/30 blur-xl"
                />
              )}
              {tier.highlight && (
                <div className="absolute top-4 right-4 rounded-full bg-primary-foreground/15 px-2 py-0.5 text-[10.5px] font-semibold tracking-wide uppercase">
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
                    ? "flex items-center justify-between rounded-md bg-primary-foreground/10 px-3 py-2 text-[12.5px]"
                    : "flex items-center justify-between rounded-md bg-muted px-3 py-2 text-[12.5px] text-muted-foreground"
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
                      ? "h-3.5 w-px bg-primary-foreground/30"
                      : "h-3.5 w-px bg-border"
                  }
                />
                <span>
                  <span className="font-semibold">
                    {fmtLimit(tier.limits.residents)}
                  </span>{" "}
                  residents
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
                          : "mt-0.5 size-3.5 shrink-0 text-paid-foreground"
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
      <section id="faq" className="border-y bg-card">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={fadeUp}
          className="mx-auto max-w-3xl px-6 py-20"
        >
          <div className="mb-9 text-center">
            <div className="mb-3 text-xs font-semibold tracking-widest text-primary uppercase">
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
                  <div className="px-1 pb-4 text-sm leading-relaxed text-muted-foreground">
                    {f.a}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr]">
          <div>
            <div className="mb-3.5 flex items-center gap-2.5">
              <Logo />
              <span className="font-heading text-base font-bold tracking-tight">
                Doorwise
              </span>
            </div>
            <p className="max-w-xs text-[13px] leading-relaxed text-muted-foreground">
              Property management software for Filipino landlords. Made in
              Quezon City. SEC Reg. 2024-118273.
            </p>
          </div>
          {FOOTER_COLS.map((col) => (
            <div key={col.title}>
              <div className="mb-3 text-xs font-semibold tracking-wide uppercase">
                {col.title}
              </div>
              <ul className="flex flex-col gap-2 text-[13px] text-muted-foreground">
                {col.links.map((l) => (
                  <li
                    key={l}
                    className="transition-colors hover:text-foreground"
                  >
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-3 border-t px-6 py-5 text-xs text-muted-foreground sm:flex-row">
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
      <span className={mono ? "font-mono font-medium" : "font-medium"}>
        {v}
      </span>
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
    <div className="overflow-hidden rounded-2xl border bg-card shadow-xl">
      {/* browser bar */}
      <div className="flex items-center gap-2.5 border-b bg-muted px-3.5 py-2.5">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-[#fe5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#27c93f]" />
        </div>
        <div className="flex h-5.5 flex-1 items-center justify-center rounded border bg-card font-mono text-[11px] text-muted-foreground">
          app.doorwise.ph / dashboard
        </div>
      </div>
      <div className="p-4.5">
        <div className="mb-3.5 text-[13px] font-bold">Dashboard</div>
        <div className="mb-3.5 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-lg border bg-background p-2.5"
            >
              <div className="text-[9px] tracking-wide text-muted-foreground uppercase">
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
          <div className="flex items-center gap-2 bg-surface-subtle px-3 py-2 text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
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
              <span className="ml-auto text-[11px] text-muted-foreground">
                {o.room}
              </span>
              <span className="font-mono font-semibold">{o.amount}</span>
              <span className="rounded-full border border-overdue-border bg-overdue px-1.5 py-0.5 text-[10px] text-overdue-foreground">
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
    <div className="flex justify-center overflow-hidden rounded-3xl border bg-gradient-to-b from-surface-subtle to-background px-6 pt-10">
      <div className="w-64 rounded-t-3xl border border-b-0 bg-card p-5 shadow-xl">
        <div className="mb-4 flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-full bg-[#dbeafe] text-sm font-semibold text-[#1e40af]">
            MS
          </span>
          <div>
            <div className="text-[11px] text-muted-foreground">
              Good evening,
            </div>
            <div className="text-base font-bold tracking-tight">Maria</div>
          </div>
        </div>
        <div className="rounded-2xl bg-primary p-4 text-primary-foreground">
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
            <div className="flex h-8 flex-1 items-center justify-center rounded-md bg-primary-foreground text-[12px] font-semibold text-primary">
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
