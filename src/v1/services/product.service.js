"use strict";
// model
const _product = require("../models/product.model.js");

var that = module.exports = {
    addProduct: async (product) => {
        console.log("product::", product)
        return await _product.create(product);
    }
}