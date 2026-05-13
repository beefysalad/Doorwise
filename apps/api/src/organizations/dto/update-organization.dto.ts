import { z } from 'zod';

const nullableTrimmed = (max: number) =>
  z
    .union([z.string().trim().max(max), z.null()])
    .optional()
    .transform((value) => {
      if (value === undefined) return undefined;
      if (value === null) return null;
      return value.length === 0 ? null : value;
    });

const updateOrganizationSchema = z.object({
  name: z.string().trim().min(2).max(80).optional(),
  address: nullableTrimmed(200),
  phone: nullableTrimmed(40),
  logoUrl: nullableTrimmed(2048),
});

type UpdateOrganizationDto = z.infer<typeof updateOrganizationSchema>;

export { updateOrganizationSchema };
export type { UpdateOrganizationDto };
