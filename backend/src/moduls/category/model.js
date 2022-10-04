const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      min: [3, "name should be more then 3 characters"],
    },
    img: {
      type: String,
      required: true,
      min: [10],
    },
  },
  {
    collection: "categories_collection",
  }
);

const categoryModel = new mongoose.model("Category", categorySchema);

module.exports = categoryModel;
