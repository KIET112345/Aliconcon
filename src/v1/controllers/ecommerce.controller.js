"use strict";
// service
const { addToCart } = require("../services/ecommerce.service");

var that = module.exports = {
    addToCart: async (req, res, next) => {
        try {
            const {productId, quantity, userId} = req.body;
            return res.json({
                elements: await addToCart({
                    productId,
                    quantity,
                    userId
                })
            })
        } catch (error) {
            next(error);
        }
    }
}
