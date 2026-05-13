import { z } from 'zod';

const createInviteSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(254),
  role: z.enum(['staff', 'tenant']),
  tenantProfileId: z.string().uuid().optional(),
});

type CreateInviteDto = z.infer<typeof createInviteSchema>;

export { createInviteSchema };
export type { CreateInviteDto };
