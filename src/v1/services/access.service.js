"use strict";

const shopModel = require("../models/shop.model");
const bcrypt = require("bcryptjs");
const KeyTokenService = require("./keyToken.service");
const { createTokenPair, verifyJWT } = require("../auth/auth.utils");
const {
  BadRequestError,
  AuthFailureError,
  ForbiddenError,
} = require("../core/error.response");
const { getInforData } = require("../helper");
const { findByEmail } = require("./shop.service");
const generateKey = require("../utils/generateKey");
const { token } = require("morgan");

const roleShop = {
  SHOP: "SHOP",
  WRITE: "WRITE",
  EDITTOR: "EDITTOR",
  ADMIN: "ADMIN",
};

class AccessService {
  static handlerRefreshToken = async ({refreshToken, user, keyStore}) => {
    const {userId, email } = user;
   
    if (keyStore.refreshTokensUsed.includes(refreshToken)) {
      await KeyTokenService.deleteKeyByUserId({ userId: userId });
      throw new ForbiddenError("Some things went wrong, please relogin again");
    }
    const foundShop = await findByEmail({ email });
    if (!foundShop) throw new AuthFailureError("Shop not registered");

    const tokens = await createTokenPair(
      { userId, email },
      keyStore.publicKey,
      keyStore.privateKey
    );
    await keyStore.updateOne({
      $set: {
        refreshToken: tokens?.refreshToken,
      },
      $addToSet: {
        refreshTokensUsed: refreshToken,
      },
    });
    return {
      user: { userId, email },
      tokens,
    };
  };

  static logout = async (keyStore) => {
    return await KeyTokenService.removeKeyById(keyStore._id);
  };

  static login = async ({ email, password, refeshToken }) => {
    const foundShop = await findByEmail({ email });
    if (!foundShop) throw new BadRequestError("Shop not registered");

    const match = bcrypt.compare(password, foundShop.password);
    if (!match) throw new AuthFailureError("Authentication error!");

    const { privateKey, publicKey } = generateKey();
    const tokens = await createTokenPair(
      { userId: foundShop._id, email },
      publicKey,
      privateKey
    );

    await KeyTokenService.createKeyToken({
      userId: foundShop._id,
      refreshToken: tokens.refreshToken,
      privateKey,
      publicKey,
    });
    return {
      metadata: {
        shop: getInforData({
          fields: ["_id", "name", "email"],
          obj: foundShop,
        }),
        tokens,
      },
    };
  };
  static signUp = async ({ name, email, password }) => {
    // step1: check email exist
    const holderShop = await shopModel.findOne({ email }).lean();

    if (holderShop) {
      throw new BadRequestError("Shop are already exists");
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const newShop = await shopModel.create({
      name,
      email,
      password: passwordHash,
      roles: roleShop["SHOP"],
    });

    if (newShop) {
      const { privateKey, publicKey } = generateKey();
      const tokens = await createTokenPair(
        { userId: newShop._id, email },
        publicKey,
        privateKey
      );
      const keyStore = await KeyTokenService.createKeyToken({
        userId: newShop._id,
        publicKey: publicKey,
        privateKey: privateKey,
        refreshToken: tokens.refreshToken,
      });

      if (!keyStore) {
        return {
          code: "XXX",
          message: "KeyStore error!",
        };
      }

      return {
        code: 201,
        metadata: {
          shop: getInforData({
            fields: ["_id", "name", "email"],
            obj: newShop,
          }),
          tokens,
        },
      };
    }
  };
}
module.exports = AccessService;
