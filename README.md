# Sample Boilerplate GraphQL server with TypeScript

<br />

<div align="center"><img src="https://imgur.com/1MfnLVl.png" /></div>

## Features

- **Static type generation**: TypeScript types for GraphQL queries & mutations are generated in a build step
- **Tooling**: Out-of-the-box support for [GraphQL Playground](https://github.com/prisma/graphql-playground)

## Getting started

1. Ensure that [`yarn`](https://legacy.yarnpkg.com/en/docs/install/#mac-stable) is installed by running `yarn --version`.
2. Install dependencies by running `yarn`
3. Run `yarn start` to start the GraphQL server on `http://localhost:4000`. Going to this address opens the GraphQL Playground.

## Type Generation
This project uses [GraphQL Codegen](https://graphql-code-generator.com/) to generate TS from the `schema.graphql` file.

Running `yarn` or `yarn gen` will re-generate the `schema.d.ts` file. You will need to do this if you make any edits to `schema.graphql`.

## Sample GraphQL queries:
```graphql
query AllEmployees {
  employees {
    id
    firstName
    age
  }
}

query AllEmployeesWithManagerInfo {
  employees {
    id
    firstName
    age
    manager {
      id,
      firstName,
      manager {
        id
        firstName
      }
    }
  }
}

query EmployeesUnder30 {
  employees(where: { age: { lessThanOrEqualTo: 30 } }) {
    id
    firstName
    lastName
    age
  }
}

mutation CreateMe {
  createEmployee(fields: { firstName: "Rachel", lastName: "Church", age: 25 }) {
    id,
    age,
    firstName
  }
}

mutation updateEmployee {
  updateEmployee(id: "3c7fae36", fields: { age: 26 }) {
    age
    id
  }
}

mutation updateEmployeeFromVariable($employeeId: String!) {
  updateEmployee(id: $employeeId, fields: { lastName: "Fletcher" }) {
    age
    id
  }
}

fragment comparisonFields on Employee {
  firstName,
  age,
  manager {
    firstName,
    age
  }
}

query MultipleQueries {
  greysondsad: employee(id: "FNFmsvQpIs") {
    ...comparisonFields
  }
  johan: employee(id: "XXYCahs8wX") {
    ...comparisonFields
  }
}
```
