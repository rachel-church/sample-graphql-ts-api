import { GraphQLServer } from 'graphql-yoga'
import { prisma } from './generated'
import { Context } from './utils'

const resolvers = {
  Query: {
    employee(parent, { id }: { id: string }, context: Context) {
      return context.prisma.employee({ employeeId: id })
    },
    employees(parent, args, context: Context) {
      return context.prisma.employees()
    },
  },
  Mutation: {
    createEmployee(parent, { firstName, lastName, email, phone }, context: Context) {
      return context.prisma.createEmployee({ firstName, lastName, email, phone })
    },
  },
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: { prisma },
});
server.start(() => console.log('Server is running on http://localhost:4000'));
