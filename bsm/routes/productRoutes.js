const express = require('express')
const router = express.Router()
const multer = require('multer')
const crypto = require('crypto')
const path = require('path')
const { AddProduct, getAllProducts,getProductById, updateProduct, deleteProduct, getProductByUser } = require('../controllers/productController')
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'products', // Folder in Cloudinary where images will be stored
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});

const upload = multer({ storage: storage })
router.post('/AddProduct',upload.single('image'),AddProduct)
router.get('/getAllProducts',getAllProducts)
router.post('/getProductById',getProductById)
router.post('/updateProduct',upload.single('image'),updateProduct)
router.delete('/deleteProduct',deleteProduct)
router.post('/getProductByUser',getProductByUser)
module.exports = router