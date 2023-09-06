"use strict";
const OTPgenerator = require("otp-generator");
// models
const _User = require("../models/user.model");
const _Otp = require("../models/otp.model");
//Services
const { insertOtp, validOtp } = require("./otp.service");
// Utils
var that = module.exports = {
  verifyOtp: async ({
    email,
    otp
  }) => {
    try {
      const otpHodler = await _Otp.find({email});
      if (otpHodler.length === 0) {
        return {
          code: 404,
          message: "Expired Otp!"
        }
      }
      const lastOtp = otpHodler[otpHodler.length - 1];
      const isValid = await validOtp({
        otp,
        hashOtp: lastOtp.otp
      });
      if (!isValid) {
        return {
          code: 401,
          message: 'Invalid OTP',
        }
      }

    if (isValid && lastOtp.email === email) {
      const user = await _User.create({
        username: "Kiet",
        email,
        userId: 1,
      })
      if (user) {
        await _Otp.deleteMany({
          email
        })
      }
      return {
        code: 201,
        element: user
      }
    }
    } catch (error) {
      console.error(error);
    }
  },

  getStatics: async () => {
    return _User.getStatics();
  },

  getMethods: async () => {
    const __User = new _User();
    return __User.getMethods();
  },
  createUser: async ({ email, userName, userId }) => {
    const user = new _User({ email, userName, userId });
    return await user.save();
  },
  regisUser: async ({ email }) => {
    const user = await _User.findOne({ email });
    if (user) {
      return {
        code: 400,
        message: "This email is already in users!",
      };
    }
    // const OTP = _User.generatorOtp();
    const OTP = OTPgenerator.generate(6, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });
    // Send otp via email or sms
    console.log("otp:::", OTP);
    return {
      code: 200,
      element: await insertOtp({
        email,
        otp: OTP,
      }),
    };
  },
};
