"use client"

import { useState } from "react"
import { RiArrowLeftLine, RiBuilding2Line } from "@remixicon/react"
import { toast } from "sonner"

import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"

import { useSetIntendedRole } from "@/hooks/api/use-set-intended-role"
import { useSyncCurrentUser } from "@/hooks/api/use-sync-current-user"
import { CreateOrganizationForm } from "./create-organization-form"
import {
  OnboardingRolePicker,
  type OnboardingRole,
} from "./onboarding-role-picker"
import { TenantWaitingCard } from "./tenant-waiting-card"

function OnboardingShell() {
  const { data: user } = useSyncCurrentUser()
  const setRoleMutation = useSetIntendedRole()
  const [override, setOverride] = useState<OnboardingRole | null | "cleared">(
    null
  )

  const role: OnboardingRole | null =
    override === "cleared" ? null : (override ?? user?.intendedRole ?? null)

  const handleChoose = (next: OnboardingRole) => {
    setOverride(next)
    setRoleMutation.mutate(next, {
      onError: () => {
        toast.error("Could not save your selection. Please try again.")
      },
    })
  }

  const handleBack = () => setOverride("cleared")

  return (
    <main className="relative min-h-svh overflow-hidden bg-background px-4 py-8 text-foreground sm:px-6 lg:px-8">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-gradient-to-b from-muted to-transparent"
      />
      <div className="mx-auto flex min-h-[calc(100svh-4rem)] w-full max-w-5xl items-center justify-center">
        <div className="w-full space-y-6">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
            <span className="flex size-14 items-center justify-center rounded-3xl bg-primary text-primary-foreground shadow-sm">
              <RiBuilding2Line className="size-6" />
            </span>
            <div className="space-y-3">
              <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
                Welcome to Doorwise
              </p>
              <h1 className="font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl md:text-5xl">
                {role === "owner"
                  ? "Set up your workspace"
                  : role === "tenant"
                    ? "Join your landlord's workspace"
                    : "Tell us who you are"}
              </h1>
              <p className="mx-auto max-w-xl text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
                {role === "owner"
                  ? "Create a workspace for your properties, tenants, and rent records. You can invite staff and tenants later."
                  : role === "tenant"
                    ? "Tenants join through an invite from their landlord."
                    : "We'll set up your account based on how you use Doorwise."}
              </p>
            </div>
          </div>

          {role === null && (
            <Card className="mx-auto w-full max-w-3xl rounded-3xl shadow-sm">
              <CardHeader className="gap-2 px-5 pt-5 sm:px-6 sm:pt-6">
                <CardTitle className="text-xl">Choose your role</CardTitle>
                <CardDescription className="leading-6">
                  You can change this later, but it helps us start you in the
                  right place.
                </CardDescription>
              </CardHeader>
              <CardContent className="px-5 pb-5 sm:px-6 sm:pb-6">
                <OnboardingRolePicker value={role} onChange={handleChoose} />
              </CardContent>
            </Card>
          )}

          {role === "owner" && (
            <Card className="mx-auto w-full max-w-xl rounded-[2rem] shadow-sm">
              <CardHeader className="gap-5 px-5 pt-5 sm:px-7 sm:pt-7">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBack}
                  className="w-fit gap-2 rounded-2xl px-2"
                >
                  <RiArrowLeftLine className="size-4" />
                  Change role
                </Button>
                <div className="space-y-2">
                  <CardTitle className="font-heading text-2xl tracking-tight">
                    Workspace details
                  </CardTitle>
                  <CardDescription className="leading-6">
                    Use the name tenants and staff will recognize. You can edit
                    these details later.
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="px-5 pb-5 sm:px-7 sm:pb-7">
                <CreateOrganizationForm />
              </CardContent>
            </Card>
          )}

          {role === "tenant" && (
            <Card className="mx-auto w-full max-w-xl rounded-3xl shadow-sm">
              <CardContent className="p-5 sm:p-6">
                <TenantWaitingCard onBack={handleBack} />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </main>
  )
}

export { OnboardingShell }
