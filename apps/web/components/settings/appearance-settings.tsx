"use client"

import { useTheme } from "next-themes"
import {
  RiCheckLine,
  RiComputerLine,
  RiMoonLine,
  RiSunLine,
} from "@remixicon/react"
import { BrandThemeSettings } from "@/components/dashboard/brand-theme-settings"
import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { cn } from "@workspace/ui/lib/utils"

const themeOptions = [
  {
    icon: RiSunLine,
    label: "Light",
    value: "light",
  },
  {
    icon: RiMoonLine,
    label: "Dark",
    value: "dark",
  },
  {
    icon: RiComputerLine,
    label: "System",
    value: "system",
  },
]

export function AppearanceSettings() {
  const { setTheme, theme } = useTheme()

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Display theme</CardTitle>
          <CardDescription>
            Select how Doorwise looks on your device.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          {themeOptions.map((option) => {
            const Icon = option.icon
            const isActive = theme === option.value

            return (
              <Button
                key={option.value}
                type="button"
                variant="outline"
                aria-pressed={isActive}
                onClick={() => setTheme(option.value)}
                className={cn(
                  "relative h-auto flex-col items-center gap-3 rounded-xl bg-background p-6 text-center transition-all hover:border-primary hover:bg-accent",
                  isActive &&
                    "border-primary bg-accent ring-primary ring-1"
                )}
              >
                <div
                  className={cn(
                    "bg-muted flex size-12 items-center justify-center rounded-full transition-colors",
                    isActive && "bg-primary text-primary-foreground"
                  )}
                >
                  <Icon className="size-6" />
                </div>
                <div className="space-y-1">
                  <p className="font-medium">{option.label}</p>
                </div>
                {isActive && (
                  <div className="absolute top-3 right-3">
                    <RiCheckLine className="text-primary size-5" />
                  </div>
                )}
              </Button>
            )
          })}
        </CardContent>
      </Card>

      <BrandThemeSettings />
    </div>
  )
}
