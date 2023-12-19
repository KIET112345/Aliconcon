// Controllers
const express = require("express");
const { incr } = require("../models/limiter.model")
// Controllers
const router = express.Router();
const {
  getMethods,
  getStatics,
  createUser,
  regisUser,
  verifyOtp,
} = require("../controllers/user.controller");

// Controller inventory
const { addInventory } = require("../controllers/inventory.controller");
// controller eccommerce
const { addToCart } = require("../controllers/ecommerce.controller");
const { apiKey , permission } = require("../auth/checkAuth");


router.get("/checkstatus", (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "api oke",
  });
});

router.get("/v1/services/getMethods", getMethods);
router.get("/v1/services/getStatics", getStatics);
router.put('/v1/inventory', addInventory);
router.put('/v1/eccommerce/addToCart', addToCart);
router.use("/v1/users", require("./users/index"));
//check apiKey
router.use(apiKey);
// check permissions
router.use(permission('0000'));
router.use('/v1/api', require("./access/index"));
router.use('/v1/api', require("./product/index"));

module.exports = router;
