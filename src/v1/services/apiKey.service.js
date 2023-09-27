"use strict";
const _apiKeyModel = require("../models/apikey.model");
const crypto = require("crypto");
const findId = async (key) => {
    // const newKey = await apiKeyModel.create( { key: crypto.randomBytes(64).toString('hex'), permissions: ['0000']});
    const objKey = await _apiKeyModel.findOne( { key, status: true}).lean();
    return objKey;
}
module.exports = {
    findId,
}
