import type { ReactNode } from "react"

import { OwnerSidebar } from "@/components/owner/owner-sidebar"

type OwnerShellProps = {
  children: ReactNode
}

/** Doorwise owner web app shell — persistent sidebar + scrollable main.
 *  Each page renders its own <OwnerPageHeader /> as the first child. */
function OwnerShell({ children }: OwnerShellProps) {
  return (
    <div className="flex h-svh w-full overflow-hidden bg-background">
      <OwnerSidebar />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {children}
      </div>
    </div>
  )
}

export { OwnerShell }
