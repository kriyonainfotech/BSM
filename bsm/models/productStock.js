const mongoose = require('mongoose');

const ProductStockSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product', // Reference to Product model
        required: true
    },
    totalStock: {
        type: Number,
        required: true,
        default: 0
    },
   purchaseBillId : {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'PurchaseBill', // Reference to Product model
    required: true
   },
   userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assumes there's a User model this references
    required: true
  },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('ProductStock', ProductStockSchema);
