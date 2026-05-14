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
    <header className="bg-card flex h-16 shrink-0 items-center justify-between border-b px-7">
      <div>
        <div className="font-heading text-lg font-bold tracking-tight">
          {title}
        </div>
        {sub && (
          <div className="text-muted-foreground mt-0.5 text-xs">{sub}</div>
        )}
      </div>
      <div className="flex items-center gap-2.5">
        {actions}
        <Link
          href="/notifications"
          className="bg-card text-muted-foreground hover:text-foreground relative flex size-9 items-center justify-center rounded-md border transition-colors"
          aria-label="Notifications"
        >
          <RiNotification3Line className="size-4.5" />
          <span className="bg-overdue-foreground border-card absolute top-1.5 right-1.5 size-2 rounded-full border-2" />
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
    <>
      <OwnerPageHeader title={title} sub={sub} actions={actions} />
      <div className="min-h-0 flex-1 overflow-auto p-7">{children}</div>
    </>
  )
}

export { OwnerPageHeader, OwnerPage }
