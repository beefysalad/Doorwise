import { z } from 'zod';

const optionalTrimmed = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((value) => (value && value.length > 0 ? value : undefined));

const createOrganizationSchema = z.object({
  name: z.string().trim().min(2).max(80),
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .max(48)
    .optional()
    .transform((value) => (value && value.length > 0 ? value : undefined)),
  address: optionalTrimmed(200),
  phone: optionalTrimmed(40),
});

type CreateOrganizationDto = z.infer<typeof createOrganizationSchema>;

export { createOrganizationSchema };
export type { CreateOrganizationDto };
