"use strict";
// models
const keyTokenModel = require("../models/keyToken.model");
class KeyTokenService {
    static createKeyToken = async ({ userId, publicKey, privateKey}) => {
        try {
            const token = await keyTokenModel.create({
                user: userId,
                publicKey,
                privateKey
            })
            return token ? token.publicKey : null;
        } catch (error) {
            console.error(error);
            return error;
        }
    }
}

module.exports = KeyTokenService;