"use strict";
//services
const { addProduct } = require("../services/product.service");

var that = module.exports = {
  addProduct: async (req, res, next) => {
    try {
      // note need param req
      const { product } = req.body;
      return res.json({
        elements: await addProduct(product),
      });
    } catch (error) {
      next(error);
    }
  },
};
