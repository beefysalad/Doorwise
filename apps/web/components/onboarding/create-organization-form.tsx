"use client"

import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"

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
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="org-name">Workspace name</Label>
        <Input
          id="org-name"
          placeholder="Sunset Apartments"
          autoComplete="organization"
          {...form.register("name")}
        />
        {form.formState.errors.name && (
          <p className="text-sm text-destructive">
            {form.formState.errors.name.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="org-address">Address (optional)</Label>
        <Input
          id="org-address"
          placeholder="123 Mabini St., Quezon City"
          {...form.register("address")}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="org-phone">Phone (optional)</Label>
        <Input
          id="org-phone"
          placeholder="+63 917 000 0000"
          inputMode="tel"
          {...form.register("phone")}
        />
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={createOrg.isPending || form.formState.isSubmitting}
      >
        {createOrg.isPending ? "Creating workspace..." : "Create workspace"}
      </Button>
    </form>
  )
}

export { CreateOrganizationForm }
