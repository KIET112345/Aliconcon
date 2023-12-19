"use strict";

const JWT = require("jsonwebtoken");
const asyncHandler = require("../helper/asynchandler");
const { AuthFailureError, NotFoundError } = require("../core/error.response");
const KeyTokenService = require("../services/keyToken.service");

const HEADER = {
    API_KEY: 'x-api-key',
    CLIENT_ID: 'x-client-id',
    AUTHORIZATION: 'authorization',
    REFRESHTOKEN: 'refresh-token',
}
const createTokenPair = async (payload, publicKey, privateKey) => {
    try {
        const accessToken = await JWT.sign(payload, publicKey, {
            expiresIn: '2 days'
        });
        const refreshToken = await JWT.sign(payload, privateKey, {
            expiresIn: '7 days'
        });

        JWT.verify(accessToken, publicKey, (err, decode) => {
            if (err) {
                console.error('error verify::', err);
            } else {
                console.log('decode verify::', decode);
            }
        })
        return { accessToken, refreshToken };
    } catch (error) {
        console.error(error);
    }
}

const authentication = asyncHandler( async(req, res, next) => {
    const userId = req.headers[HEADER.CLIENT_ID];
    if (!userId) {
        throw new AuthFailureError("Invalid request");
    }

    const keyStore = await KeyTokenService.findByUserId(userId);
    if (!keyStore) {
        throw new NotFoundError("not found keystore");
    }
    const accessToken = req.headers[HEADER.AUTHORIZATION];
    if (!accessToken) {
        throw new AuthFailureError("Invalid request");
    }

    try {
        const decodeUser = JWT.verify(accessToken, keyStore.publicKey);
        if( userId !== decodeUser.userId) {
            throw new AuthFailureError("Invalid user");
        }
        req.keyStore = keyStore;
        return next();
    } catch (error) {
        throw error;
    }
})

const authenticationV2 = asyncHandler( async(req, res, next) => {
    const userId = req.headers[HEADER.CLIENT_ID];
    const refeshToken = req.headers[HEADER.REFRESHTOKEN];

    if (!userId) {
        throw new AuthFailureError("Invalid request");
    }

    const keyStore = await KeyTokenService.findByUserId(userId);
    if (!keyStore) {
        throw new NotFoundError("not found keystore");
    }
    if (!refeshToken) {
        throw new AuthFailureError("Invalid request");
    }
    try {
        const decodeUser = JWT.verify(refeshToken, keyStore.privateKey);
        if( userId !== decodeUser.userId) {
            throw new AuthFailureError("Invalid user");
        }
        req.keyStore = keyStore;
        req.user = decodeUser;
        req.refreshToken = refeshToken;
        return next();
    } catch (error) {
        throw error;
    }
})

const verifyJWT = async (token, keySecret) => {
    return await JWT.verify(token, keySecret);
}

module.exports = {
    createTokenPair,
    authentication,
    verifyJWT,
    authenticationV2
}