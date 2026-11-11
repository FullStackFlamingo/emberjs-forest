import { type IResolvers } from 'mercurius';
import * as sliceUsers from './schema/slice.users.js';
import * as sliceAppointments from './schema/slice.appointments.js';

// some ropey graphql stiching, as its nice to split up typeDefs/resolvers by vertical slice

export const schema: string = `
${sliceUsers.typeDefs.root}
${sliceAppointments.typeDefs.root}
type Query {
  ${sliceUsers.typeDefs.Query}
  ${sliceAppointments.typeDefs.Query}
}`;

export const resolvers: IResolvers = {
  // NavigationSubItem: navigationResolvers.NavigationSubItem,
  Query: {
    // ...navigationResolvers.Query,
    ...sliceUsers.resolvers.Query,
    ...sliceAppointments.resolvers.Query,
  },
};
