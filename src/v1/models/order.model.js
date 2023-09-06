const { Schema, model } = require("mongoose");
const orderSchema = new Schema(
  {
    cartId: Number,
    orderId: Number,
    userId: Number,
    shipping: Object,
    payment: Object,
    products: Array,
  },
  {
    collection: "orders",
    timestamps: true,
  }
);
module.exports = model('order', orderSchema);