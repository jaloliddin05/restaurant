const { gql } = require("apollo-server-express");

module.exports = gql`
  type Food {
    id: ID!
    name: String!
    price: String!
    img: String!
    placeId: Place!
  }

  extend type Query {
    foods: [Food!]!
    foodByPlace(id: ID!): [Food!]!
  }

  extend type Mutation {
    addFood(name: String!, price: String!, img: String!, placeId: ID!): [Food!]!
    updateFood(
      name: String
      price: String
      img: String
      placeId: ID
      id: ID!
    ): [Food!]!
    deleteFood(id: ID!): [Food!]!
  }
`;
