"use client"

import type { ReactNode } from "react"

import { useSyncCurrentUser } from "@/hooks/api/use-sync-current-user"

function UserSyncProvider({ children }: { children: ReactNode }) {
  useSyncCurrentUser()

  return children
}

export { UserSyncProvider }
