const PlaceModel = require("./model");
const { sign } = require("../../utils/jwt");

module.exports = {
  Query: {
    places: async (g) =>
      await PlaceModel.find().populate({ path: "categoryId" }),
    placesByCategory: async (_, { id }) =>
      await PlaceModel.find({ categoryId: id }).populate({
        path: "categoryId",
      }),
  },
  Place: {
    id: (g) => g.id,
    name: (g) => g.name,
    img: (g) => g.img,
    categoryId: (g) => g.categoryId,
  },
  Mutation: {
    addPlace: async (_, { name, img, categoryId }) => {
      await PlaceModel.create({ name, img, categoryId });
      return await PlaceModel.find().populate({ path: "categoryId" });
    },
    updatePlace: async (_, { name, img, categoryId, id }) => {
      await PlaceModel.findByIdAndUpdate(id, { name, img, categoryId });
      return await PlaceModel.find().populate({ path: "categoryId" });
    },
    deletePlace: async (_, { id }) => {
      await PlaceModel.deleteOne({ _id: id });
      return await PlaceModel.find().populate({ path: "categoryId" });
    },
    token: (_, { name, password }) => {
      console.log(name);
      console.log(password);
      console.log(process.env.password);
      console.log(process.env.useradmin);
      if (process.env.useradmin == name && password == process.env.password) {
        return sign({ name, password });
      } else {
        return "";
      }
    },
  },
};
