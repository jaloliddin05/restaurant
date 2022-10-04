const { gql } = require("apollo-server-express");

module.exports = gql`
  type Place {
    id: ID!
    name: String!
    img: String!
    categoryId: Category!
  }

  extend type Query {
    places: [Place!]!
    placesByCategory(id: ID!): [Place!]!
  }

  extend type Mutation {
    addPlace(name: String!, img: String!, categoryId: ID!): [Place!]!
    updatePlace(name: String, img: String, categoryId: ID, id: ID!): [Place!]!
    deletePlace(id: ID!): [Place!]!
    token(name:String!,password:String!): String!
  }

`;
