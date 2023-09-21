"use strict";

const { CREATED } = require("../core/success.response");
const AccessService = require("../services/access.service");

class AccessController {
  signUp = async (req, res, next) => {
    return new CREATED({
      message: "Register successfully",
      metadata: await AccessService.signUp(req.body),
    }).send(res);
  };
}
module.exports = new AccessController();
