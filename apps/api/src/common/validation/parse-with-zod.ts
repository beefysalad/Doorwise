import { BadRequestException } from '@nestjs/common';
import type { z, ZodType } from 'zod';

function parseWithZod<S extends ZodType>(
  schema: S,
  payload: unknown,
): z.infer<S> {
  const result = schema.safeParse(payload);

  if (!result.success) {
    throw new BadRequestException({
      message: 'Validation failed',
      issues: result.error.issues.map((issue) => ({
        path: issue.path.join('.'),
        message: issue.message,
      })),
    });
  }

  return result.data;
}

export { parseWithZod };
