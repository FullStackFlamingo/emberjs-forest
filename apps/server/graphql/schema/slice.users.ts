import { randomUUID } from 'node:crypto';
import { TENANT_IDS } from './slice.tenants.js';

export const USER_IDS = Object.freeze({
  USER1: randomUUID(),
  USER2: randomUUID(),
});

export type UserRole = 'ADMIN' | 'MANAGER' | 'STAFF' | 'CLIENT';

export type User = {
  /** guid */
  id: string;
  tenantId: string;
  created_at: number;
  email: string;
  first_name: string;
  last_name?: string;
  roles: UserRole[];
  phone?: string;
};

const mockUsers = new Map<string, User>(
  Object.entries({
    [USER_IDS.USER1]: {
      id: USER_IDS.USER1,
      tenantId: TENANT_IDS.TENANT1,
      created_at: Date.now() - 20000000000,
      last_login_at: Date.now() - 200000000,
      roles: ['ADMIN'],
      email: 'admin@forest.example',
      first_name: 'Admini',
      last_name: 'Usor',
      phone: '028189236472',
    },
    [USER_IDS.USER2]: {
      id: USER_IDS.USER2,
      tenantId: TENANT_IDS.TENANT2,
      created_at: Date.now() - 20000000000,
      last_login_at: Date.now() - 200000000,
      roles: ['MANAGER'],
      email: 'admin@forest.example',
      first_name: 'manageri',
      last_name: 'Usor',
      phone: '07878675686',
    },
  })
);

export const typeDefs = {
  Query: `
  getUser(userId: ID!): User
  getUsers(userIds: [ID]!): [User]
`,

  root: `
  enum UserRole {
    ADMIN
    MANAGER
    STAFF
    CLIENT
  }

  type User {
    id: String!
    tenantId: String!
    roles: [UserRole!]!
    created_at: Int!
    email: String!
    first_name: String!
    last_name: String
    phone: String
  }
`,
};

export const resolvers = {
  Query: {
    getUser(_parent: unknown, args: { userId: string }) {
      // TODO: db with JWT context
      return mockUsers.get(args.userId);
    },
    getUsers(_parent: unknown, args: { userIds: string[]; roles?: UserRole[] }) {
      // TODO: db with JWT context
      return Array.from(mockUsers)
        .map(([, val]) => val)
        .filter((val) => args.userIds.includes(val.id))
        .filter((val) => {
          if (Array.isArray(args.roles)) {
            for (const role of args.roles) {
              if (val.roles.includes(role)) return true;
            }
          }
        });
    },
  },
};
