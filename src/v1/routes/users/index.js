"use strict";
const express = require("express");
const { createUser, regisUser, verifyOtp } = require("../../controllers/user.controller");
const router = express.Router();
router.post("/create", createUser);
router.post( "/resgisterUser",regisUser);
router.post("/verifyOtp", verifyOtp);
module.exports = router;