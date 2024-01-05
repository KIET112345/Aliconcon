"use strict";
//services
const ProductService = require("../services/product.service");
const { SuccessResponse } = require("../core/success.response");

class ProductController {
  createProduct = async (req, res, next) => {
    new SuccessResponse({
      message: "Create new Product success!",
      metadata: await ProductService.createProduct(
        req.body.product_type,
        {...req.body, product_shop: req.user.userId}
      ),
    }).send(res);
  };
  // update
  updateProduct = async (req, res, next) => {
    new SuccessResponse({
      message: "Update product successfully!",
      metadata: await ProductService.updateProduct(
        req.body.product_type,
        req.params.productId,
        {...req.body, product_shop: req.user.userId}
      ),
    }).send(res);
  };

  publishProductByShop = async (req, res, next) => {
    new SuccessResponse({
      message: "Publish Product By Shop success!",
      metadata: await ProductService.publishProductByShop({
        product_shop: req.user.userId,
        product_id: req.params.id
      })
    }).send(res);
  }

  unPublishProductByShop = async (req, res, next) => {
    new SuccessResponse({
      message: "unPublish Product By Shop success!",
      metadata: await ProductService.unPublishProductByShop({
        product_shop: req.user.userId,
        product_id: req.params.id
      })
    }).send(res);
  }

  //end update

  // Query//
  getAllDraftForShop = async (req, res, next) => {
    new SuccessResponse(
      {
        message: 'Get all product  draft success',
        metadata: await ProductService.findAllDraftForShop({product_shop: req.user.userId})
      }
    ).send(res);
  }

  getAllPublishForShop = async (req, res, next) => {
    new SuccessResponse(
      {
        message: 'Get all product publish success!',
        metadata: await ProductService.findAllPublishForShop({product_shop: req.user.userId})
      }
    ).send(res);
  }

  getListSearchProduct = async(req, res, next) => {
    new SuccessResponse({
      message: 'search products by name or description successfully',
      metadata: await ProductService.searchProducts(req.params)
    }).send(res);
  }

  findAllProduct = async(req, res, next) => {
    new SuccessResponse({
      message: 'Get products successfully!',
      metadata: await ProductService.findAllProduct(req.query)
    }).send(res)
  }

  findProduct = async(req, res, next) => {
    new SuccessResponse({
      message: 'Get products successfully!',
      metadata: await ProductService.findProduct({product_id: req.params.product_id})
    }).send(res)
  }
  //End query //
}

module.exports = new ProductController();
