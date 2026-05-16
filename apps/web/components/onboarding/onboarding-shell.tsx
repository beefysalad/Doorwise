"use client"

import { useState } from "react"
import {
  RiArrowLeftLine,
  RiArrowRightLine,
  RiDoorClosedLine,
} from "@remixicon/react"
import { toast } from "sonner"
import type { PlanTier } from "@workspace/shared"

import { StepIndicator } from "@/components/doorwise/step-indicator"
import { Button } from "@workspace/ui/components/button"

import { useSetIntendedRole } from "@/hooks/api/use-set-intended-role"
import { useSyncCurrentUser } from "@/hooks/api/use-sync-current-user"
import { CreateOrganizationForm } from "./create-organization-form"
import { OnboardingPlanPicker } from "./onboarding-plan-picker"
import {
  OnboardingRolePicker,
  type OnboardingRole,
} from "./onboarding-role-picker"
import { TenantWaitingCard } from "./tenant-waiting-card"

type OwnerStep = "plan" | "details"

function OnboardingShell() {
  const { data: user } = useSyncCurrentUser()
  const setRoleMutation = useSetIntendedRole()
  const [override, setOverride] = useState<OnboardingRole | null | "cleared">(
    null
  )
  const [ownerStep, setOwnerStep] = useState<OwnerStep>("plan")
  const [selectedPlanId, setSelectedPlanId] = useState<PlanTier>("free")

  const role: OnboardingRole | null =
    override === "cleared" ? null : (override ?? user?.intendedRole ?? null)

  const handleChoose = (next: OnboardingRole) => {
    setRoleMutation.mutate(next, {
      onSuccess: () => {
        setOverride(next)
        if (next === "owner") setOwnerStep("plan")
      },
      onError: () => {
        toast.error("Could not save your selection. Please try again.")
      },
    })
  }

  const handleBackToRole = () => {
    setOverride("cleared")
    setOwnerStep("plan")
  }

  // Step 1 role · Step 2 plan · Step 3 workspace details
  const step =
    role === null ? 1 : role === "owner" && ownerStep === "details" ? 3 : 2

  return (
    <main className="flex min-h-svh flex-col bg-background px-6 py-8 text-foreground sm:px-10">
      {/* Top bar */}
      <div className="mx-auto flex w-full max-w-5xl items-center gap-2.5">
        <span className="flex size-7.5 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <RiDoorClosedLine className="size-4.5" />
        </span>
        <span className="font-heading text-base font-bold tracking-tight">
          Doorwise
        </span>
        <span className="ml-auto text-[13px] text-muted-foreground">
          Step {step} of 3
        </span>
      </div>

      {/* Content */}
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center py-10 has-[.plan-picker]:max-w-5xl">
        <StepIndicator step={step} total={3} className="mb-8" />

        {role === null && (
          <div className="text-center">
            <h1 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">
              Hi! Who are you? 👋
            </h1>
            <p className="mx-auto mt-3 max-w-md text-balance text-muted-foreground">
              Tell us a little about yourself so we can set things up just
              right.
            </p>
            <div className="mt-9 text-left">
              <OnboardingRolePicker value={role} onChange={handleChoose} />
            </div>
            <p className="mt-8 text-[12.5px] text-muted-foreground/70">
              Need both? You can switch roles later in account settings.
            </p>
          </div>
        )}

        {role === "owner" && ownerStep === "plan" && (
          <div className="plan-picker">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackToRole}
              className="mb-5 -ml-2 gap-1.5 rounded-md"
            >
              <RiArrowLeftLine className="size-4" />
              Change role
            </Button>
            <h1 className="font-heading text-2xl font-bold tracking-tight">
              Pick the plan for your rental setup
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Start with the size that matches your operation today. Billing
              upgrades will be verified later, so this just shapes the setup
              flow for now.
            </p>
            <div className="mt-7">
              <OnboardingPlanPicker
                value={selectedPlanId}
                onChange={setSelectedPlanId}
              />
            </div>
            <div className="mt-7 flex justify-end">
              <Button
                size="lg"
                className="rounded-md"
                onClick={() => setOwnerStep("details")}
              >
                Continue
                <RiArrowRightLine />
              </Button>
            </div>
          </div>
        )}

        {role === "owner" && ownerStep === "details" && (
          <div className="mx-auto w-full max-w-md">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setOwnerStep("plan")}
              className="mb-5 -ml-2 gap-1.5 rounded-md"
            >
              <RiArrowLeftLine className="size-4" />
              Change plan
            </Button>
            <h1 className="font-heading text-2xl font-bold tracking-tight">
              Let&apos;s set up your place 🏠
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              This is your organization. You can add more properties later.
            </p>
            <div className="mt-7">
              <CreateOrganizationForm planId={selectedPlanId} />
            </div>
          </div>
        )}

        {role === "resident" && (
          <div className="mx-auto w-full max-w-md">
            <TenantWaitingCard onBack={handleBackToRole} />
          </div>
        )}
      </div>
    </main>
  )
}

export { OnboardingShell }
