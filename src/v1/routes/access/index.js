"use strict";
const express = require("express");
const router = express.Router();
const AccessController = require("../../controllers/access.controller");
const asyncHandler = require("../../helper/asynchandler");
const { authentication, authenticationV2 } = require("../../auth/auth.utils");
//sigin
router.post("/shop/login", asyncHandler(AccessController.login));
//signup
router.post("/shop/signup", asyncHandler(AccessController.signUp));
//authenticationv2
router.use(authenticationV2);
router.post("/shop/handlerRefreshToken", asyncHandler(AccessController.handlerRefreshToken));
//authentication
router.use(authentication);
//logout
router.post("/shop/logout", asyncHandler(AccessController.logout));
module.exports = router;