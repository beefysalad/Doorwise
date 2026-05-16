"use client"

import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { Button } from "@workspace/ui/components/button"
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"

import type { PlanTier } from "@workspace/shared"

import { useCreateOrganization } from "@/hooks/api/use-create-organization"
import { useActiveOrg } from "@/hooks/use-active-org"
import { getPlan } from "@/lib/mock/plans"
import {
  createOrganizationSchema,
  type CreateOrganizationFormValues,
} from "@/lib/validations/organization"

type CreateOrganizationFormProps = {
  /** Plan chosen in onboarding. Billing upgrades must be verified server-side. */
  planId?: PlanTier
}

function CreateOrganizationForm({ planId }: CreateOrganizationFormProps) {
  const router = useRouter()
  const { setActiveOrgId } = useActiveOrg()
  const createOrg = useCreateOrganization()
  const selectedPlan = planId ? getPlan(planId) : undefined

  const form = useForm<CreateOrganizationFormValues>({
    resolver: zodResolver(createOrganizationSchema),
    defaultValues: { name: "", address: "", phone: "" },
  })

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      const membership = await createOrg.mutateAsync({
        name: values.name,
        address: values.address || undefined,
        phone: values.phone || undefined,
      })
      setActiveOrgId(membership.organization.id)
      toast.success(`Welcome to ${membership.organization.name}`)
      router.push("/dashboard")
    } catch {
      toast.error("Could not create organization. Please try again.")
    }
  })

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {selectedPlan && (
        <div className="flex items-center justify-between rounded-md bg-muted px-3.5 py-2.5 text-[13px]">
          <span className="text-muted-foreground">
            Selected plan:{" "}
            <span className="font-semibold text-foreground">
              {selectedPlan.name}
            </span>{" "}
            <span className="font-mono">
              {selectedPlan.price}
              {selectedPlan.price !== "₱0" ? "/mo" : ""}
            </span>
          </span>
        </div>
      )}

      <FieldGroup className="gap-5">
        <Field data-invalid={Boolean(form.formState.errors.name)}>
          <FieldContent>
            <FieldLabel htmlFor="org-name">
              Organization name<span className="text-red-500">*</span>
            </FieldLabel>
          </FieldContent>
          <Input
            id="org-name"
            placeholder="Juan Dela Cruz Rentals"
            autoComplete="organization"
            aria-invalid={Boolean(form.formState.errors.name)}
            {...form.register("name")}
          />
          <FieldError errors={[form.formState.errors.name]} />
        </Field>

        <Field>
          <FieldContent>
            <FieldLabel htmlFor="org-address">Address</FieldLabel>
          </FieldContent>
          <Input
            id="org-address"
            placeholder="123 Mabini St., Quezon City"
            {...form.register("address")}
          />
        </Field>

        <Field>
          <FieldContent>
            <FieldLabel htmlFor="org-phone">Contact number</FieldLabel>
          </FieldContent>
          <Input
            id="org-phone"
            placeholder="+63 917 000 0000"
            inputMode="tel"
            {...form.register("phone")}
          />
        </Field>
      </FieldGroup>

      <Button
        type="submit"
        size="lg"
        className="w-full rounded-md"
        disabled={createOrg.isPending || form.formState.isSubmitting}
      >
        {createOrg.isPending ? "Setting up…" : "Finish setup"}
      </Button>
    </form>
  )
}

export { CreateOrganizationForm }
