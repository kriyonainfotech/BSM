const express = require('express')
const { createPurchaseBill, getPurchaseBillById, updatePurchaseBill, deletePurchaseBill, getAllPurchaseBills } = require('../controllers/purchaseBillController')
const router = express.Router()
router.post('/createPurchaseBill',createPurchaseBill)
router.post('/getPurchaseBillById',getPurchaseBillById)
router.post('/updatePurchaseBill',updatePurchaseBill)
router.delete('/deletePurchaseBill',deletePurchaseBill)
router.get('/getAllPurchaseBills',getAllPurchaseBills)
module.exports = router