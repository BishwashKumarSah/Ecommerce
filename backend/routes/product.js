const express = require('express')
const router = express.Router()
const { getAllProducts, createProduct, updateProduct, deleteProduct, getSingleProduct } = require('../controllers/product')

router.route('/products').get(getAllProducts)

router.route('/product/new').post(createProduct)

router.route('/product/:id').put(updateProduct).delete(deleteProduct).get(getSingleProduct)


module.exports = router;