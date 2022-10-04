const categoryModel = require("./model");

module.exports = {
  Query: {
    category: async (g) => await categoryModel.find(),
  },
  Category: {
    id: (g) => g.id,
    name: (g) => g.name,
    img: (g) => g.img,
  },
  Mutation: {
    addCategory: async (_, { name, img }) => {
      await categoryModel.create({ name, img });
      return await categoryModel.find();
    },
    updateCategory: async (_, { name, img, id }) => {
      await categoryModel.findByIdAndUpdate(id, {
        name,
        img,
      });
      return await categoryModel.find();
    },
    deleteCategory: async (_, { id }) => {
      await categoryModel.deleteOne({ _id: id });
      return await categoryModel.find();
    },
  },
};
