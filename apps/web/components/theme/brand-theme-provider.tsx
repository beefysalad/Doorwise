"use client"

import { type ReactNode, useEffect } from "react"

function BrandThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty("--primary", "oklch(0.86 0.2 132)")
    root.style.setProperty("--primary-foreground", "oklch(0.13 0.04 135)")
    root.style.setProperty("--ring", "oklch(0.76 0.16 132)")
    root.style.setProperty("--sidebar-primary", "oklch(0.86 0.2 132)")
    root.style.setProperty(
      "--sidebar-primary-foreground",
      "oklch(0.13 0.04 135)"
    )
  }, [])

  return <>{children}</>
}

export { BrandThemeProvider }
