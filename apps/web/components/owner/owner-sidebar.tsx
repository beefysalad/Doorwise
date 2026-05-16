"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { UserButton } from "@clerk/nextjs"
import { RiDoorClosedLine, RiSettings3Line } from "@remixicon/react"

import { useDashboardUser } from "@/components/dashboard/dashboard-user-provider"
import { useCurrentOrganizationState } from "@/components/organizations/current-organization-provider"
import { ownerNavItems } from "@/components/owner/owner-nav"
import { cn } from "@workspace/ui/lib/utils"

function OwnerSidebar() {
  const pathname = usePathname()
  const user = useDashboardUser()
  const { activeMembership } = useCurrentOrganizationState()
  const organizationName = activeMembership?.organization.name ?? "Doorwise"

  return (
    <aside className="flex w-58 shrink-0 flex-col border-r bg-card">
      {/* Brand */}
      <div className="flex h-16 items-center gap-2.5 border-b px-4.5">
        <span className="flex size-7.5 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <RiDoorClosedLine className="size-4.5" />
        </span>
        <div className="leading-tight">
          <div className="font-heading text-sm font-bold tracking-tight">
            Doorwise
          </div>
          <div className="text-[11px] text-muted-foreground">
            {organizationName}
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex flex-1 flex-col gap-0.5 p-2.5">
        {ownerNavItems.map((item) => {
          const Icon = item.icon
          const activeHrefs = item.activeHrefs ?? [item.href]
          const isActive = activeHrefs.some(
            (href) => pathname === href || pathname.startsWith(href + "/")
          )
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2.5 rounded-md px-2.5 py-2 text-[13.5px] transition-colors",
                isActive
                  ? "bg-accent font-semibold text-primary"
                  : "font-medium text-muted-foreground hover:bg-accent/60"
              )}
            >
              <Icon className="size-4.5" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Org footer */}
      <div className="flex items-center gap-2.5 border-t px-4.5 py-3">
        <UserButton
          appearance={{
            elements: {
              avatarBox: "size-8",
              userButtonAvatarBox: "size-8",
              userButtonTrigger: "size-8",
            },
          }}
        />
        <div className="min-w-0 flex-1">
          <div className="truncate text-[13px] font-semibold">{user.name}</div>
          <div className="text-[11px] text-muted-foreground">Owner</div>
        </div>
        <Link
          href="/settings"
          className="flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Settings"
        >
          <RiSettings3Line className="size-4" />
        </Link>
      </div>
    </aside>
  )
}

export { OwnerSidebar }
