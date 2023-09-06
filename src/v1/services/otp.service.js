'use strict';
const bcrypt = require('bcryptjs');
const _Otp = require('../models/otp.model');
var that = module.exports = {
    validOtp: async ({
        otp,
        hashOtp
    }) => {
        try {
            const valid = bcrypt.compare(otp, hashOtp);
            return valid;
        } catch (error) {
            console.error(error);
        }
    },

    insertOtp: async ({
        otp,
        email
    }) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashOtp = await bcrypt.hash(otp, salt);
            const Otp = await _Otp.create({email, otp: hashOtp});
            return Otp ? 1 : 0;
            
        } catch (error) {
            console.error(error);
        }
    }
}