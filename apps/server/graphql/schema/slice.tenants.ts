import { randomUUID } from 'node:crypto';

export const TENANT_IDS = Object.freeze({
  TENANT1: randomUUID(),
  TENANT2: randomUUID(),
});
