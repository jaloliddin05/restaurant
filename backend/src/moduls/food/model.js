const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: [3],
    },
    price: {
      type: Number,
      required: true,
      min: [1],
    },
    img: {
      type: String,
      required: true,
      min: [6],
    },
    placeId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Place",
      min: [6],
    },
  },
  {
    collection: "food_collection",
  }
);

const FoodModel = new mongoose.model("Foods", FoodSchema);

module.exports = FoodModel;
