"use strict";
// models
const _cart = require("../models/cart.model");
const _inventory = require("../models/inventory.model");

var that = module.exports = {
  addToCart: async ({ productId, quantity, userId }) => {
    const stock = await _inventory.updateOne(
      {
        productId,
        quantity: { $gt: quantity },
      },
      {
        $inc: {
          quantity: -quantity,
        },
        $push: {
          reservations: {
            userId,
            quantity,
            productId,
          },
        },
      }
    );
    console.log("add stock::", stock);
    if (stock.modifiedCount) {
      // add to cart
      const addToCart = await _cart.findOneAndUpdate(
        {
          userId,
        },
        {
          $push: {
            products: {
              productId,
              quantity,
            },
          },
        },
        {
          upsert: true,
          new: true,
        }
      );
      console.log("addToCart::", addToCart);
      return 1;
    }
  },
};
