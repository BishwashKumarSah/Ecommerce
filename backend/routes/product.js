const express = require('express')
const router = express.Router()
const { getAllProducts, createProduct, updateProduct, deleteProduct, getSingleProduct } = require('../controllers/product')
const { isAuthenticatedUsed } = require('../middlewares/userAuth')


router.route('/products').get(isAuthenticatedUsed, getAllProducts)

router.route('/product/new').post(isAuthenticatedUsed, createProduct)

router.route('/product/:id').put(isAuthenticatedUsed, updateProduct).delete(isAuthenticatedUsed, deleteProduct).get(getSingleProduct)


module.exports = router;