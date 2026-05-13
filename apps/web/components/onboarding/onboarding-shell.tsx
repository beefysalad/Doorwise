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
    override === "cleared"
      ? null
      : (override ?? user?.intendedRole ?? null)

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
    <main className="flex min-h-svh items-center justify-center bg-background px-6 py-16">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            <RiBuilding2Line className="size-6" />
          </span>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Welcome to Doorwise
          </p>
          <h1 className="font-heading text-3xl font-semibold tracking-tight md:text-4xl">
            {role === "owner"
              ? "Set up your workspace"
              : role === "tenant"
                ? "Join your landlord's workspace"
                : "Tell us who you are"}
          </h1>
          <p className="max-w-sm text-sm text-muted-foreground">
            {role === "owner"
              ? "Create a workspace for your properties, tenants, and rent records. You can invite staff and tenants later."
              : role === "tenant"
                ? "Tenants join through an invite from their landlord."
                : "We'll set up your account based on how you use Doorwise."}
          </p>
        </div>

        {role === null && (
          <Card>
            <CardHeader>
              <CardTitle>Choose your role</CardTitle>
              <CardDescription>
                You can change this later, but it helps us start you in the
                right place.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <OnboardingRolePicker value={role} onChange={handleChoose} />
            </CardContent>
          </Card>
        )}

        {role === "owner" && (
          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <div className="space-y-1">
                <CardTitle>New workspace</CardTitle>
                <CardDescription>
                  You&apos;ll be set as the owner.
                </CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
                aria-label="Back"
              >
                <RiArrowLeftLine className="size-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <CreateOrganizationForm />
            </CardContent>
          </Card>
        )}

        {role === "tenant" && (
          <Card>
            <CardContent className="pt-6">
              <TenantWaitingCard onBack={handleBack} />
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  )
}

export { OnboardingShell }
