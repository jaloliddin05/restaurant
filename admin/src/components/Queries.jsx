import { gql } from "@apollo/client";

// Category Queries
export const CategoriesQuery = gql`
  query {
    category {
      id
      name
      img
    }
  }
`;

export const updateCategoriesQuery = gql`
  mutation updateCategory($updateCategoryId: ID!, $name: String, $img: String) {
    updateCategory(id: $updateCategoryId, name: $name, img: $img) {
      id
      name
      img
    }
  }
`;

export const deleteCategoryQuery = gql`
  mutation deleteCategory($deleteCategoryId: ID!) {
    deleteCategory(id: $deleteCategoryId) {
      id
      name
      img
    }
  }
`;

export const addCategoryQuery = gql`
  mutation addCategory($name: String!, $img: String!) {
    addCategory(name: $name, img: $img) {
      id
      name
      img
    }
  }
`;

// Place Queries

export const PlacesQuery = gql`
  query {
    places {
      id
      name
      img
      categoryId {
        id
        img
        name
      }
    }
  }
`;

export const addPlacesQuery = gql`
  mutation addPlace($name: String!, $img: String!, $categoryId: ID!) {
    addPlace(name: $name, img: $img, categoryId: $categoryId) {
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
export const updatePlacesQuery = gql`
  mutation updatePlace(
    $updatePlaceId: ID!
    $name: String
    $img: String
    $categoryId: ID
  ) {
    updatePlace(
      id: $updatePlaceId
      name: $name
      img: $img
      categoryId: $categoryId
    ) {
      id
      name
      img
      categoryId {
        id
        img
        name
      }
    }
  }
`;

export const deletePlacesQuery = gql`
  mutation deletePlace($deletePlaceId: ID!) {
    deletePlace(id: $deletePlaceId) {
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

// Food Queries

export const foodsQuery = gql`
  query {
    foods {
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

export const addFoodQuery = gql`
  mutation addFood(
    $name: String!
    $price: String!
    $img: String!
    $placeId: ID!
  ) {
    addFood(name: $name, price: $price, img: $img, placeId: $placeId) {
      id
      name
      img
      price
      placeId {
        id
        img
        name
      }
    }
  }
`;

export const updateFoodQuery = gql`
  mutation updateFood(
    $updateFoodId: ID!
    $name: String
    $price: String
    $img: String
    $placeId: ID
  ) {
    updateFood(
      id: $updateFoodId
      name: $name
      img: $img
      price: $price
      placeId: $placeId
    ) {
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

export const deleteFoodQuery = gql`
  mutation deleteFood($deleteFoodId: ID!) {
    deleteFood(id: $deleteFoodId) {
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

//...

export const OrdersQuery = gql`
  query {
    orders {
      adress
      name
      phone
      foodId {
        name
        price
      }
      counts
    }
  }
`;

export const loginQuery = gql`
  mutation token($name: String!, $password: String!) {
    token(name: $name, password: $password)
  }
`;
