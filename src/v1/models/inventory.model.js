const { Schema, model } = require("mongoose");
const inventorySchema = new Schema(
  {
    productId: Number,
    quantity: Number,
    reservations: Array,
    create_at: { type: Date, default: Date.now },
  },
  {
    collection: "inventory",
    timestamps: true,
  }
);
module.exports = model("inventory", inventorySchema);
