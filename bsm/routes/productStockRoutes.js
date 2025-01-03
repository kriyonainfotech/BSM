const express = require("express");
const {
  AddProductStock,
  updateProductStock,
  deleteProductStock,
  getProductStockByUser,
} = require("../controllers/productStockController");
const router = express.Router();
router.post("/AddProductStock", AddProductStock);
router.post("/UpdateProductStock", updateProductStock);
router.delete("/deleteProductStock", deleteProductStock);
router.get("/getProductStockByUser", getProductStockByUser);
module.exports = router;
