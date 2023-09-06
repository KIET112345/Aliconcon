"use strict";
// models
const _inventory = require("../models/inventory.model");

var that = module.exports = {
    addInventory: async (inventory) => {
        return await _inventory.create(inventory);
    }
};