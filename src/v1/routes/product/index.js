"use strict";
const express = require("express");
const router = express.Router();
const ProductController = require("../../controllers/product.controller");
const asyncHandler = require("../../helper/asynchandler");
const { authenticationV2 } = require("../../auth/auth.utils");

router.get("/search/:keySearch", asyncHandler(ProductController.getListSearchProduct));
router.get("/list", asyncHandler(ProductController.findAllProduct));
router.get("/:product_id", asyncHandler(ProductController.findProduct));


//authenticationv2
router.use(authenticationV2);

// update
router.post("", asyncHandler(ProductController.createProduct));
router.patch("/:productId", asyncHandler(ProductController.updateProduct));

router.post("/publish/:id", asyncHandler(ProductController.publishProductByShop));
router.post("/unpublish/:id", asyncHandler(ProductController.unPublishProductByShop));

//Query
router.get("/draft/all", asyncHandler(ProductController.getAllDraftForShop));
router.get("/published/all", asyncHandler(ProductController.getAllPublishForShop));


module.exports = router;