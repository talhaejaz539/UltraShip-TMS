const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Employee {
    id: ID!
    name: String!
    age: Int!
    class: String!
    subjects: [String!]!
    attendance: Float!
  }

  input EmployeeFilter {
    name: String
    class: String
    age: Int
  }

  enum SortOrder {
    ASC
    DESC
  }

  type Query {
    employees(page: Int, limit: Int, sortField: String, sortOrder: SortOrder, filter: EmployeeFilter): [Employee]
    employee(id: ID!): Employee
  }

  type Mutation {
    addEmployee(name: String!, age: Int!, class: String!, subjects: [String!]!, attendance: Float!): Employee
    updateEmployee(id: ID!, name: String, age: Int, class: String, subjects: [String], attendance: Float): Employee
  }
`;

module.exports = typeDefs;
