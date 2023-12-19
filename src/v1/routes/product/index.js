"use strict";
const express = require("express");
const router = express.Router();
const ProductController = require("../../controllers/product.controller");
const asyncHandler = require("../../helper/asynchandler");
const { authenticationV2 } = require("../../auth/auth.utils");

//authenticationv2
router.use(authenticationV2);
router.post("/product", asyncHandler(ProductController.createProduct));

module.exports = router;