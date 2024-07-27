const express = require('express')
const router = express.Router()
const { getAllProducts, createProduct, updateProduct, deleteProduct, getSingleProduct } = require('../controllers/product')

const { isAuthenticatedUsed, AuthorizedRoles } = require('../middlewares/userAuth')


router.route('/products').get(isAuthenticatedUsed, getAllProducts)

router.route('/admin/product/new').post(isAuthenticatedUsed, AuthorizedRoles("admin"), createProduct)

router.route('/admin/product/:id').put(isAuthenticatedUsed, AuthorizedRoles("admin"), updateProduct).delete(isAuthenticatedUsed, AuthorizedRoles("admin"), deleteProduct)

router.route('/product/:id').get(getSingleProduct)


module.exports = router;