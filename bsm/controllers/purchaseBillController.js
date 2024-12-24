const PurchaseBill = require('../models/purchaseBill')
const Product = require('../models/product')
const createPurchaseBill = async(req,res) => {
    try {
        const { accountId, productId, quantity, mrp, purchaseRate, saleRate ,userId,grandTotal,totalAmount} = req.body;
        if (!accountId || !productId || !quantity || !mrp || !purchaseRate || !saleRate) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }
        const newBill = new PurchaseBill({
            accountId,
            productId,
            quantity,
            mrp,
            purchaseRate,
            saleRate,userId,grandTotal,totalAmount
        });
        await newBill.save();

        return res.status(200).json({
            success: true,
            message: "Purchase bill created successfully",
            bill: newBill
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error", error });
    }
}
const getPurchaseBillById = async (req, res) => {
    try {
        const { purchaseId } = req.body;
        const bill = await PurchaseBill.findById(purchaseId).populate('accountId productId userId');
        if (!bill) {
            return res.status(404).json({ success: false, message: "Purchase bill not found" });
        }

        return res.status(200).json({ success: true, bill });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error", error });
    }
};
const updatePurchaseBill = async (req, res) => {
    try {
        const { purchaseId } = req.body;
        const { accountId, productId, quantity, mrp, purchaseRate, saleRate, userId } = req.body;

        const updatedData = {
            accountId,
            productId,
            quantity,
            mrp,
            purchaseRate,
            saleRate,
            userId
        };

        const updatedBill = await PurchaseBill.findByIdAndUpdate(purchaseId, updatedData, { new: true });
        if (!updatedBill) {
            return res.status(404).json({ success: false, message: "Purchase bill not found" });
        }

        return res.status(200).json({
            success: true,
            message: "Purchase bill updated successfully",
            bill: updatedBill
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error", error });
    }
};
const deletePurchaseBill = async (req, res) => {
    try {
        const { purchaseId } = req.body;
        const deletedBill = await PurchaseBill.findByIdAndDelete(purchaseId);

        if (!deletedBill) {
            return res.status(404).json({ success: false, message: "Purchase bill not found" });
        }

        return res.status(200).json({
            success: true,
            message: "Purchase bill deleted successfully",
            bill: deletedBill
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error", error });
    }
};
const getAllPurchaseBills = async (req, res) => {
    try {
        const bills = await PurchaseBill.find().populate('accountId productId userId');
        return res.status(200).json({ success: true, bills });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error", error });
    }
};
module.exports = {
    createPurchaseBill,getPurchaseBillById,updatePurchaseBill,deletePurchaseBill,getAllPurchaseBills
}