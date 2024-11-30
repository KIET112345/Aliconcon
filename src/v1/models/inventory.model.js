const { Schema, model, Types } = require('mongoose');
const inventorySchema = new Schema(
  {
    inven_productId: { type: Schema.Types.ObjectId, ref: 'Product' },
    inven_location: { type: String, default: 'Unknown' },
    inven_stock: { type: Number, required: true },
    reservations: { type: Array, default: [] },
    inven_shopId: { type: Schema.Types.ObjectId, ref: 'Shop' },
    create_at: { type: Date, default: Date.now },
  },
  {
    collection: 'inventories',
    timestamps: true,
  }
);
module.exports = model('inventory', inventorySchema);
