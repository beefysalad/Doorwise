import { Prisma } from '../generated/prisma/client';

/**
 * Models whose rows always belong to exactly one organization.
 * Adding a model here auto-injects `organizationId` filtering on read-/write-many
 * operations performed via the scoped client.
 *
 * Operations that take a unique-where (findUnique, upsert, single-row update by
 * unique key) are NOT auto-scoped — they require explicit scoping at the call
 * site. For those, use the raw PrismaService.db client and validate scope by hand.
 */
export const SCOPED_MODELS = new Set<string>([
  'OrganizationMember',
  'OrganizationInvite',
]);

const SCOPED_OPERATIONS = new Set<string>([
  'findFirst',
  'findFirstOrThrow',
  'findMany',
  'update',
  'updateMany',
  'delete',
  'deleteMany',
  'count',
  'aggregate',
  'groupBy',
  'create',
  'createMany',
]);

/**
 * Build a Prisma extension that scopes queries to a single organization.
 * Returned object is meant to be passed to `prisma.$extends(buildTenantScopedExtension(scope))`.
 */
export function buildTenantScopedExtension(organizationId: string) {
  return Prisma.defineExtension({
    name: 'tenant-scoped',
    query: {
      $allModels: {
        async $allOperations({ model, operation, args, query }) {
          if (
            !model ||
            !SCOPED_MODELS.has(model) ||
            !SCOPED_OPERATIONS.has(operation)
          ) {
            return query(args);
          }

          const next = args as Record<string, unknown>;

          if (operation === 'create') {
            next.data = injectScopeIntoData(next.data, organizationId);
          } else if (operation === 'createMany') {
            const data: unknown = next.data;
            if (Array.isArray(data)) {
              next.data = data.map((row) =>
                injectScopeIntoData(row, organizationId),
              );
            } else {
              next.data = injectScopeIntoData(data, organizationId);
            }
          } else {
            next.where = mergeWhereWithScope(next.where, organizationId);
          }

          return query(args);
        },
      },
    },
  });
}

function mergeWhereWithScope(
  where: unknown,
  organizationId: string,
): Record<string, unknown> {
  if (where && typeof where === 'object') {
    return { ...(where as Record<string, unknown>), organizationId };
  }
  return { organizationId };
}

function injectScopeIntoData(
  data: unknown,
  organizationId: string,
): Record<string, unknown> {
  if (data && typeof data === 'object') {
    const obj = data as Record<string, unknown>;
    if (obj.organizationId === undefined) {
      return { ...obj, organizationId };
    }
    return obj;
  }
  return { organizationId };
}
