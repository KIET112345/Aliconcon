"use strict";
const { Types } = require("mongoose");
// models
const keyTokenModel = require("../models/keyToken.model");
class KeyTokenService {
  static createKeyToken = async ({
    userId,
    publicKey,
    privateKey,
    refreshToken,
  }) => {
    try {
      //level 0
      // const token = await keyTokenModel.create({
      //     user: userId,
      //     publicKey,
      //     privateKey
      // })
      // return token ? token.publicKey : null;

      //level xxx
      console.log("refreshToken::", refreshToken);
      const filter = { user: userId };
      const update = {
        publicKey,
        privateKey,
        refreshTokensUsed: [],
        refreshToken,
      };
      const options = { upsert: true, new: true };
      const token = await keyTokenModel.findOneAndUpdate(
        filter,
        update,
        options
      );
      return !token ? null : token.publicKey;
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  static findByUserId = async (userId) => {
    return await keyTokenModel
      .findOne({ user: new Types.ObjectId(userId) });
  };

  static removeKeyById = async (id) => {
    return await keyTokenModel.deleteOne({_id: id});
  };

  static findByRefreshTokenUsed = async (refreshToken) => {
    return await keyTokenModel.findOne({ refreshTokensUsed: refreshToken });
  };

  static findByRefreshToken = async (refreshToken) => {
    return await keyTokenModel.findOne({ refreshToken: refreshToken });
  };

  static deleteKeyByUserId = async ({ userId }) => {
    return await keyTokenModel.findOne({ user: userId });
  };
}

module.exports = KeyTokenService;
