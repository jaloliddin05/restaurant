const { gql } = require("apollo-server-express");

module.exports = gql`
  type Category {
    id: ID!
    name: String!
    img: String!
  }
  extend type Query {
    category: [Category!]!
  }
  extend type Mutation {
    addCategory(name: String!, img: String!): [Category!]!
    updateCategory(name: String, img: String, id: ID!): [Category!]!
    deleteCategory(id: ID!): [Category!]!
  }
`;
