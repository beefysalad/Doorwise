import type { ReactNode } from "react"
import Link from "next/link"
import { RiNotification3Line } from "@remixicon/react"

type OwnerPageHeaderProps = {
  title: string
  sub?: ReactNode
  actions?: ReactNode
}

/** Doorwise topbar — page title + subtitle on the left, actions + bell right. */
function OwnerPageHeader({ title, sub, actions }: OwnerPageHeaderProps) {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b bg-card px-7">
      <div>
        <div className="font-heading text-lg font-bold tracking-tight">
          {title}
        </div>
        {sub && (
          <div className="mt-0.5 text-xs text-muted-foreground">{sub}</div>
        )}
      </div>
      <div className="flex items-center gap-2.5">
        {actions}
        <Link
          href="/notifications"
          className="relative flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Notifications"
        >
          <RiNotification3Line className="size-4.5" />
          <span className="absolute top-2 right-2 size-1.5 rounded-full bg-overdue-foreground" />
        </Link>
      </div>
    </header>
  )
}

type OwnerPageProps = OwnerPageHeaderProps & {
  children: ReactNode
}

/** Full owner page scaffold — sticky topbar + scrollable padded body. */
function OwnerPage({ title, sub, actions, children }: OwnerPageProps) {
  return (
    <section className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <OwnerPageHeader title={title} sub={sub} actions={actions} />
      <div className="min-h-0 flex-1 overflow-auto overscroll-none p-7">
        {children}
      </div>
    </section>
  )
}

export { OwnerPageHeader, OwnerPage }
