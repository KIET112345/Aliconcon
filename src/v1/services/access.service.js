"use strict";

const shopModel = require("../models/shop.model");
const crypto = require("crypto");
const bcrypt = require('bcryptjs');
const KeyTokenService = require("./keyToken.service");
const { createTokenPair } = require("../auth/auth.utils");
const { BadRequestError } = require("../core/error.response");

const roleShop = {
    SHOP: "SHOP",
    WRITE: "WRITE",
    EDITTOR: "EDITTOR",
    ADMIN: "ADMIN",

}

class AccessService {
    static signUp = async ( {name, email, password}) => {
        // try {
            // step1: check email exist
            const holderShop = await shopModel.findOne({email}).lean();
            
            if (holderShop) {
                throw new BadRequestError("Shop are already exists");
            }
            const passwordHash = await bcrypt.hash(password, 10);
            const newShop = await shopModel.create({
                name, email, password: passwordHash, roles: roleShop["SHOP"]
            })

            if (newShop) {
                const privateKey = crypto.randomBytes(64).toString('hex');
                const publicKey = crypto.randomBytes(64).toString('hex');
                console.log({privateKey, publicKey}) // save colection keyStore
                const keyStore = await KeyTokenService.createKeyToken({
                    userId: newShop._id,
                    publicKey: publicKey,
                    privateKey: privateKey,
                });

                if (!keyStore) {
                    return {
                        code: "XXX",
                        message: "KeyStore error!"
                    }
                }
    
                const tokens =  await createTokenPair({userId: newShop._id, email}, publicKey, privateKey);
                console.log("tokens::", tokens);
                return {
                    code: 201,
                    metadata: {
                        shop: newShop,
                        tokens
                    }
                }
              
            }
            
        // } catch (error) {
        //     return {
        //         code:"XXX",
        //         message: error.message,
        //         status: "error"
        //     }
        // }
    }
}
module.exports = AccessService;