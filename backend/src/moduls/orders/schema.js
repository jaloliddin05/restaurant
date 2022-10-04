const { gql } = require("apollo-server-express");

module.exports = gql`
  type Order {
    foodId: [Food!]!
    counts: [Int!]!
    name: String!
    phone: String!
    adress: String!
  }

  extend type Query {
    orders: [Order!]!
  }

  extend type Mutation {
    addOrder(
      name: String!
      phone: String!
      adress: String!
      foodId: [ID!]!
      counts: [Int!]!
    ): [Order!]!
  }
`;
