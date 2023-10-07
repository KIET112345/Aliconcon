"use strict";
const HEADER = {
    API_KEY: 'x-api-key',
    AUTHORIZATION: "authorization",
}
const { findId } = require("../services/apiKey.service");
const apiKey = async (req, res, next ) => {
    console.log("vao day");
    try {
        const key = req.headers[HEADER.API_KEY]?.toString();
        if (!key) {
            res.status(403).json({
                message: " Forbidden Error",
            })
        }
        // check objKey
        const objKey = await findId(key);
        if (!objKey) {
            res.status(403).json({
                message: " Forbidden Error",
            })
        }
        req.objKey = objKey;
        return next();

    } catch (error) {
        
    }
}
const permission = ( permission ) => {
    return (req, res, next) => {
        if (!req.objKey.permissions) {
            res.status(403).json( {
                message: ' permission denied'
            })
        }
        const validPermission = req.objKey.permissions.includes(permission);
        if (!validPermission) {
            res.status(403).json( {
                message: ' permission denied'
            })
        }
        return next();
    }
}


module.exports = {
    apiKey,
    permission,
}