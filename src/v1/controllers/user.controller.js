"use strict";

// Service
const {
  getStatics,
  getMethods,
  createUser,
  regisUser,
  verifyOtp
} = require("../services/user.service.js");

var that = (module.exports = {
  verifyOtp: async (req, res, next) => {
    try {
      const { email, otp } = req.body;
      const {
        code,
        element,
        message
      } = await verifyOtp({email, otp});
      res.status(code).json({
        code,
        element,
        message
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
  regisUser: async (req, res, next) => {
    try {
      const { email } = req.body;
      const { code, element, message } = await regisUser({ email });
      return res.status(code).json({
        code,
        message,
        element
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  createUser: async (req, res, next) => {
    try {
      console.log("req.body", req.body);
      const { email, userName, userId } = req.body;
      res.json({
        elements: await createUser({ email, userName, userId }),
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  getMethods: async (req, res, next) => {
    try {
      res.json({
        message: await getMethods(),
      });
    } catch (error) {
      console.log(error);
    }
  },
  getStatics: async (req, res, next) => {
    try {
      res.json({
        message: await getStatics(),
      });
    } catch (error) {
      console.log(error);
    }
  },
});
