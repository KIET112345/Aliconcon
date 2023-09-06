const { Schema, model } = require("mongoose");
const cartSchema = new Schema(
  {
    userId: Number,
    status: { type: String, default: "active" },
    modifiedOn: { type: Date, default: Date.now },
    products: Array,
  },
  {
    collection: "carts",
    timestamps: true,
  }
);
module.exports = model("cart", cartSchema);