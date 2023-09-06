const { Schema, model } = require("mongoose");
const productSchema = new Schema(
  {
    productId: { type: Number, required: true },
    code: String,
    name: String,
    brand: String,
    description: String,
    release_date: Date,
    specs: { type: Array, default: [] },
  },
  {
    collection: "products",
    timestamps: true,
  }
);
module.exports = model("product", productSchema);