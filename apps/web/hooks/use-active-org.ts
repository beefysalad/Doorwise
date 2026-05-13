"use client"

import { useCallback, useSyncExternalStore } from "react"

const STORAGE_KEY = "doorwise.activeOrgId"

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {}
  const handler = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) callback()
  }
  window.addEventListener("storage", handler)
  return () => window.removeEventListener("storage", handler)
}

function getSnapshot(): string | null {
  if (typeof window === "undefined") return null
  return window.localStorage.getItem(STORAGE_KEY)
}

function getServerSnapshot(): string | null {
  return null
}

function useActiveOrg() {
  const activeOrgId = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  )

  const setActiveOrgId = useCallback((organizationId: string | null) => {
    if (typeof window === "undefined") return
    if (organizationId) {
      window.localStorage.setItem(STORAGE_KEY, organizationId)
    } else {
      window.localStorage.removeItem(STORAGE_KEY)
    }
    window.dispatchEvent(
      new StorageEvent("storage", { key: STORAGE_KEY, newValue: organizationId })
    )
  }, [])

  return { activeOrgId, setActiveOrgId }
}

export { useActiveOrg }
