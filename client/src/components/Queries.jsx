import { gql } from "@apollo/client";

export const CategoriesQuery = gql`
  query {
    category {
      id
      name
      img
    }
  }
`;

export const PlacesByCategoryIdQuery = gql`
  query placesByCategory($placesByCategoryId: ID!) {
    placesByCategory(id: $placesByCategoryId) {
      id
      name
      img
      categoryId {
        id
        name
        img
      }
    }
  }
`;

export const foodByPlaceIdQuery = gql`
  query foodByPlace($foodByPlaceId: ID!) {
    foodByPlace(id: $foodByPlaceId) {
      id
      name
      img
      price
      placeId {
        id
        name
        img
      }
    }
  }
`;

export const addOrderQuery = gql`
  mutation (
    $name: String!
    $phone: String!
    $adress: String!
    $foodId: [ID!]!
    $counts: [Int!]!
  ) {
    addOrder(
      name: $name
      phone: $phone
      adress: $adress
      foodId: $foodId
      counts: $counts
    ) {
      name
      phone
      adress
      foodId {
        id
        name
        img
      }
      counts
    }
  }
`;
