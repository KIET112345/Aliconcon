"use strict";
const _ = require("lodash");
const getInforData = ({fields, obj}) => {
    return _.pick(obj, fields)
}
module.exports = {
    getInforData
}