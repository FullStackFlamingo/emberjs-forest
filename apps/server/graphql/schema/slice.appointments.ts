import { randomUUID } from 'node:crypto';
import { USER_IDS } from './slice.users.js';
import { TENANT_IDS } from './slice.tenants.js';

export const APPOINTMENT_IDS = Object.freeze({
  APPOINTMENT1: randomUUID(),
  APPOINTMENT2: randomUUID(),
});

export type Appointment = {
  /** guid */
  id: string;
  userId: string;
  tenantId: string;
  roomId: string;
  created_at: number;
  start_at: number;
  end_at: number;
  title: string;
  notes?: string;
};

const mockAppointments = new Map<string, Appointment>(
  Object.entries({
    [APPOINTMENT_IDS.APPOINTMENT1]: {
      id: APPOINTMENT_IDS.APPOINTMENT1,
      tenantId: TENANT_IDS.TENANT1,
      userId: USER_IDS.USER1,
      roomId: 'USER',
      created_at: Date.now() - 20000000000,
      start_at: Date.now() + 20000000000,
      end_at: Date.now() + 2020000000,
      title: 'Appointment 1',
      notes: `some notes`,
    },
  })
);

export const typeDefs = {
  Query: `
  getAppointments(tenantId: ID!, roomId: ID): [Appointment]
`,

  root: `
  type Appointment {
    id: String!
    userId: String!
    tenantId: String!
    roomId: String!
    created_at: Int!
    start_at: Int!
    end_at: Int!
    title: String!
    notes: String
  }
`,
};

export const resolvers = {
  Query: {
    getAppointments(_parent: unknown, args: { tenantId: string; roomId: string }) {
      // TODO: db with JWT context
      return Array.from(mockAppointments)
        .map(([, val]) => val)
        .filter((val) => args.tenantId === val.tenantId)
        .filter((val) => args.roomId === val.roomId);
    },
  },
};
