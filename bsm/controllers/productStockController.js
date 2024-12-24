const Product = require('../models/product')
const PurchaseBill = require('../models/purchaseBill')
const ProductStock = require('../models/productStock')
const AddProductStock = async(req,res) => {
    try {
        const {productId,purchaseBillId,totalStock} = req.body
        const product = await Product.findById(productId).populate('categoryId').populate('companyId')
        let userId = product.userId
        const Purchasebill = await PurchaseBill.findById(purchaseBillId)
        // console.log(Purchasebill);
        if(!product) {
            return res.status(400).json({ success: false, message: "product not found" });
        }
        if(!Purchasebill) {
            return res.status(400).json({ success: false, message: "Purchasebill not found" });
        }
        if(!totalStock){
            return res.status(400).json({ success: false, message: "totalstock not found" });
        }
        const  productstock = await new ProductStock({
            productId,purchaseBillId,totalStock,userId
        })
        await productstock.save()
        return res.status(200).json({
            success: true,
            message: "Purchase bill created successfully",
            stock : productstock
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error", error });
    }
}
const getProductStockByUser = async(req,res) => {
    try {
        const {userId} = req.body
        const productstock = await ProductStock.findOne({userId:userId}).populate('productId').populate('purchaseBillId')
        console.log(productstock);
        return res.status(200).json({
            success: true,
           stock : productstock
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error", error });
    }
}
const updateProductStock = async (req, res) => {
    try {
        const { stockId,totalStock } = req.body;  // Stock ID to identify which stock to updat  // The new stock value

        // Check if totalStock is provided
        if (!totalStock) {
            return res.status(400).json({ success: false, message: "Total stock value is required" });
        }

        // Find the product stock by ID
        const productStock = await ProductStock.findById(stockId);
        if (!productStock) {
            return res.status(404).json({ success: false, message: "Product stock not found" });
        }

        // Update the stock value
        productStock.totalStock = totalStock;
        await productStock.save();

        return res.status(200).json({
            success: true,
            message: "Product stock updated successfully",
            stock: productStock
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error", error });
    }
};
const deleteProductStock = async (req, res) => {    
    try {
        const { stockId } = req.body;  // Stock ID to identify which stock to delete

        // Find the product stock by ID
        const productStock = await ProductStock.findById(stockId);
        if (!productStock) {
            return res.status(404).json({ success: false, message: "Product stock not found" });
        }

        // Delete the product stock entry
        await productStock.remove();

        return res.status(200).json({
            success: true,
            message: "Product stock deleted successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error", error });
    }
};
module.exports = {
    AddProductStock,updateProductStock,deleteProductStock,getProductStockByUser
}