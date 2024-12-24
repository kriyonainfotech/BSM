const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the PurchaseBill schema
const PurchaseBillSchema = new Schema({
    accountId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Account', // Reference to Account model
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product', // Reference to Product model
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1 // Assuming at least 1 unit should be purchased
    },
    mrp: {
        type: Number,
        required: true,
        min: 0 // MRP should be a positive value
    },
    purchaseRate: {
        type: Number,
        required: true,
        min: 0 // Purchase rate should be a positive value
    },
    totalAmount: {
        type: Number,
        required: true,
        min: 0 // Total amount should be positive
    },
    saleRate: {
        type: Number,
        required: true,
        min: 0 // Sale rate should be a positive value
    },
    grandTotal: {
        type: Number,
        required: true,
        min: 0 // Grand total should be positive
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});



module.exports = mongoose.model('PurchaseBill', PurchaseBillSchema);


