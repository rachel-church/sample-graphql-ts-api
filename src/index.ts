import { importSchema } from 'graphql-import';
import { filterNumerics } from './filter';
const { ApolloServer } = require('apollo-server');
import { Resolvers } from 'src/schema';
import { mockDB } from './mockDB';

/**
 * The context is an object which is provided to every resolver and holds important contextual information like the
 * currently logged in user, or access to a database.
 */
const context = {
  dataLoader: mockDB
};

const resolvers: Resolvers<typeof context> = {
  Query: {
    employee: (_, { id }, { dataLoader }) => {
      return dataLoader.getEmployee(id) || null;
    },
    employees: (_, { where, skip, limit }, { dataLoader }) => {
      const { age, id } = where || {};

      let employees = dataLoader.getEmployees();
      if (age) {
        employees = employees.filter(e => filterNumerics(e.age, age));
      }
      if (id) {
        employees = employees.filter(e => e.id === id);
      }
      if (limit) {
        employees.slice(limit + (skip || 0), limit)
      }

      return employees;
    }
  },
  Mutation: {
    createEmployee: (_, { fields }, { dataLoader }) => {
      const { firstName, lastName, age, managerId } = fields;
      return dataLoader.createEmployee({
        firstName: firstName || '',
        lastName: lastName || '',
        age,
        manager: (managerId && dataLoader.getEmployee(managerId)) || undefined
      });
    },
    updateEmployee: (_, { id, fields }, { dataLoader }) => {
      return dataLoader.updateEmployee(id, fields);
    }
  },
  Employee: {
    manager(employee, args, { dataLoader }) {
      return (employee.manager && employee.manager.id && dataLoader.getEmployee(employee.manager.id)) || null;
    },
    // Note that the other fields are trivial so we do not need to explicitly define them.
    // But they would look something like:
    //  firstName(employee) { return employee.firstName }
    // See https://graphql.org/learn/execution/#trivial-resolvers
  }
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

