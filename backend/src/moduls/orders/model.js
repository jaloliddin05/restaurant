const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    foodId: [
      {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Foods",
        min: [6],
      },
    ],
    counts: [
      {
        type: Number,
        required: true,
      },
    ],
    name: {
      type: String,
      required: true,
      min: [3],
    },
    phone: {
      type: String,
      required: true,
      min: [3],
    },
    adress: {
      type: String,
      required: true,
      min: [3],
    },
  },
  {
    collection: "order_collection",
  }
);

const OrderModel = new mongoose.model("Order", OrderSchema);

module.exports = OrderModel;
