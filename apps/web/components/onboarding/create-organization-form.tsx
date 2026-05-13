"use client"

import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { Button } from "@workspace/ui/components/button"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"

import { useCreateOrganization } from "@/hooks/api/use-create-organization"
import { useActiveOrg } from "@/hooks/use-active-org"
import {
  createOrganizationSchema,
  type CreateOrganizationFormValues,
} from "@/lib/validations/organization"

function CreateOrganizationForm() {
  const router = useRouter()
  const { setActiveOrgId } = useActiveOrg()
  const createOrg = useCreateOrganization()

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
      <FieldGroup className="gap-5">
        <Field data-invalid={Boolean(form.formState.errors.name)}>
          <FieldContent>
            <FieldLabel htmlFor="org-name">Workspace name</FieldLabel>
            <FieldDescription>
              Usually your property brand, building name, or landlord business.
            </FieldDescription>
          </FieldContent>
          <Input
            id="org-name"
            placeholder="Sunset Apartments"
            autoComplete="organization"
            aria-invalid={Boolean(form.formState.errors.name)}
            {...form.register("name")}
          />
          <FieldError errors={[form.formState.errors.name]} />
        </Field>

        <Field>
          <FieldContent>
            <FieldLabel htmlFor="org-address">Address</FieldLabel>
            <FieldDescription>
              Optional. Useful for receipts and tenant records.
            </FieldDescription>
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
            <FieldDescription>
              Optional. Add the number staff or tenants should recognize.
            </FieldDescription>
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
        className="h-11 w-full rounded-2xl"
        disabled={createOrg.isPending || form.formState.isSubmitting}
      >
        {createOrg.isPending ? "Creating workspace..." : "Create workspace"}
      </Button>
    </form>
  )
}

export { CreateOrganizationForm }
