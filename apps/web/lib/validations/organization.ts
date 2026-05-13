import { z } from "zod"

const createOrganizationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(80, "Name must be 80 characters or fewer"),
  address: z.string().trim().max(200).optional().or(z.literal("")),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
})

type CreateOrganizationFormValues = z.infer<typeof createOrganizationSchema>

export { createOrganizationSchema }
export type { CreateOrganizationFormValues }
