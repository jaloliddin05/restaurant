const mongoose = require("mongoose");

const PlaceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      min: [3],
    },
    img: {
      type: String,
      required: true,
      min: [10],
    },
    categoryId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Category",
      min: [6],
    },
  },
  {
    collection: "place_collection",
  }
);

const PlaceModel = new mongoose.model("Place", PlaceSchema);

module.exports = PlaceModel;
