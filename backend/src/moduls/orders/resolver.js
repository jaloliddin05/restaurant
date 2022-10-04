const OrderModel = require("./model");

module.exports = {
  Query: {
    orders: async (g) => await OrderModel.find().populate({ path: "foodId" }),
  },
  Order: {
    foodId: (g) => g.foodId,
    counts: (g) => g.counts,
    name: (g) => g.name,
    phone: (g) => g.phone,
    adress: (g) => g.adress,
  },
  Mutation: {
    addOrder: async (_, { name, phone, adress, foodId, counts }) => {
      console.log(foodId);
      await OrderModel.create({
        name,
        phone,
        adress,
        foodId,
        counts,
      });
      return await OrderModel.find().populate({ path: "foodId" });
    },
  },
};
