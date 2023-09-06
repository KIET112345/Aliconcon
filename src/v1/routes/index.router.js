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
// Controller production
const { addProduct } = require("../controllers/product.controller");
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
router.post('/v1/users', createUser);
router.post("/v1/users", regisUser);
router.post("/v1/users/verifyOtp", verifyOtp);

router.put('/v1/products', addProduct);
router.put('/v1/inventory', addInventory);

router.put('/v1/eccommerce/addToCart', addToCart);

// Handle N requests in 60s
// router.get('/api', async (req, res, next) => {
//   try {
//     // get ip of user
//     const userIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
//     console.log(userIp);
//     const numberRequests = await incr(userIp);
//     console.log(numberRequests)
//     if (numberRequests > 20) {
//       return res.status(503).json({
//         status: "Error",
//         message: "Server is busy!",
//         numberRequests: numberRequests
//       })
//     }
//     res.json({
//       status: "success",
//       elements: [
//         {id: 1, name: "java"},
//         {id: 2, name: "js"}
//       ]
//     })
//   } catch (error) {
//     next(error);
//   }
// })

//check apiKey
router.use(apiKey);
// check permissions
router.use(permission('0000'));

router.use('/v1/api', require("./access/index"));
module.exports = router;
