import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { SCOPED_MODELS } from './tenant-scoped-extension';

function getSchemaModelsWithOrganizationId(): string[] {
  const schema = readFileSync(
    join(__dirname, '../../prisma/schema.prisma'),
    'utf8',
  );

  const models: string[] = [];
  const modelRegex = /model\s+(\w+)\s+\{([\s\S]*?)\n\}/g;
  let match: RegExpExecArray | null;

  while ((match = modelRegex.exec(schema))) {
    const [, modelName, body] = match;
    if (modelName && body?.match(/^\s+organizationId\s+/m)) {
      models.push(modelName);
    }
  }

  return models.sort();
}

describe('SCOPED_MODELS', () => {
  it('includes every Prisma model with an organizationId field', () => {
    expect([...SCOPED_MODELS].sort()).toEqual(
      getSchemaModelsWithOrganizationId(),
    );
  });
});
