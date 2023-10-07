"use strict";

const { CREATED, OK, SuccessResponse } = require("../core/success.response");
const AccessService = require("../services/access.service");

class AccessController {
  handlerRefreshToken = async (req, res, next) => {
    return new SuccessResponse({
      message: "get token successfully",
      metadata: await AccessService.handlerRefreshToken({refreshToken: req.refreshToken, user: req.user, keyStore: req.keyStore}),
    }).send(res);
  };

  logout = async (req, res, next) => {
    return new OK({
      message: "logout successfully",
      metadata: await AccessService.logout(req.keyStore),
    }).send(res);
  };
  login = async (req, res, next) => {
    return new OK({
      message: "login successfully",
      metadata: await AccessService.login(req.body),
    }).send(res);
  };
  signUp = async (req, res, next) => {
    return new CREATED({
      message: "Register successfully",
      metadata: await AccessService.signUp(req.body),
    }).send(res);
  };
}
module.exports = new AccessController();
