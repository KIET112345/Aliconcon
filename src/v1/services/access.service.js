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
            console.log("newShop::", newShop)
            if (newShop) {
                
                const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
                    modulusLength: 4096,
                    publicKeyEncoding: {
                        type: 'pkcs1',
                        format: 'pem'
                    },
                    privateKeyEncoding: {
                        type: 'pkcs1',
                        format: 'pem'
                    }
                });
                console.log({privateKey, publicKey}) // save colection keyStore
                const publicKeyString = await KeyTokenService.createKeyToken({
                    userId: newShop._id,
                    publicKey: publicKey
                });

                if (!publicKeyString) {
                    return {
                        code: "XXX",
                        message: "PublicKey error!"
                    }
                }
                console.log("publicKeyString::", publicKeyString);
                const publicKeyObject = crypto.createPublicKey(publicKeyString);
                console.log("publicKeyObject::", publicKeyObject);
                // create token pair
                const tokens =  await createTokenPair({userId: newShop._id, email}, publicKeyObject, privateKey);
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