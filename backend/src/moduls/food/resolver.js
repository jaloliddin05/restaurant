const FoodModel = require("./model");

module.exports = {
  Query: {
    foods: async () => await FoodModel.find().populate({ path: "placeId" }),
    foodByPlace: async (_, { id }) =>
      await FoodModel.find({ placeId: id }).populate({ path: "placeId" }),
  },
  Food: {
    id: (g) => g.id,
    name: (g) => g.name,
    price: (g) => g.price,
    img: (g) => g.img,
    placeId: (g) => g.placeId,
  },
  Mutation: {
    addFood: async (_, { name, price, img, placeId }) => {
      await FoodModel.create({ name, price, img, placeId });
      return await FoodModel.find().populate({ path: "placeId" });
    },
    updateFood: async (_, { name, price, img, placeId, id }) => {
      await FoodModel.findByIdAndUpdate(id, { name, price, img, placeId });
      return await FoodModel.find().populate({ path: "placeId" });
    },
    deleteFood: async (_, { id }) => {
      await FoodModel.deleteOne({ _id: id });
      return await FoodModel.find().populate({ path: "placeId" });
    },
  },
};
