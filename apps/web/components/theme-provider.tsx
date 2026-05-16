"use client"

import { type ComponentProps } from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

import { BrandThemeProvider } from "@/components/theme/brand-theme-provider"

function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      forcedTheme="dark"
      disableTransitionOnChange
      {...props}
    >
      <BrandThemeProvider>{children}</BrandThemeProvider>
    </NextThemesProvider>
  )
}

export { ThemeProvider }
