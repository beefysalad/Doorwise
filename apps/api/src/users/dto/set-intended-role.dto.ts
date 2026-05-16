import { z } from 'zod';

const setIntendedRoleSchema = z.object({
  role: z.enum(['owner', 'resident']),
});

type SetIntendedRoleDto = z.infer<typeof setIntendedRoleSchema>;

export { setIntendedRoleSchema };
export type { SetIntendedRoleDto };
