import { importSchema } from 'graphql-import';
const { ApolloServer } = require('apollo-server');
import { Resolvers } from 'src/schema';
import { mockDB } from './mockDB';

const context = {
  dataLoader: mockDB
};

const resolvers: Resolvers<typeof context> = {
  Query: {
    employee: (_, { id }, { dataLoader }) => {
      return dataLoader.getEmployee(id) || null;
    },
    employees: (_, args, { dataLoader }) => {
      return dataLoader.getEmployees();
    }
  },
  Mutation: {
    createEmployee: (_, { firstName, lastName, age, managerId, departmentId, }, { dataLoader }) => {
      return dataLoader.createEmployee({
        firstName,
        lastName,
        age,
        manager: (managerId && dataLoader.getEmployee(managerId)) || undefined,
        department: (departmentId && dataLoader.getDepartment(departmentId)) || undefined,
      });
    }
  },
  Employee: {
    department(employee, args, { dataLoader }) {
      return (employee.department && employee.department.id && dataLoader.getDepartment(employee.department.id)) || null;
    },
  },
  Department: {}
};

async function main() {
  // The ApolloServer constructor requires two parameters: your schema
  // definition and your set of resolvers.
  const server = new ApolloServer({
    typeDefs: importSchema('src/schema.graphql'),
    resolvers,
    context
  });

  // The `listen` method launches a web server.
  server.listen().then(({ url }: { url: string }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
}

main();

