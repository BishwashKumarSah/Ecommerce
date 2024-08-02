const express = require('express')
const router = express.Router()
const { getAllProducts, createProduct, updateProduct, deleteProduct, getSingleProduct, createProductReview, getAllProductReviews, deleteProductReview } = require('../controllers/product')

const { isAuthenticatedUsed, AuthorizedRoles } = require('../middlewares/userAuth')


router.route('/products').get( getAllProducts)

router.route('/admin/product/new').post(isAuthenticatedUsed, AuthorizedRoles("admin"), createProduct)

router.route('/admin/product/:id').put(isAuthenticatedUsed, AuthorizedRoles("admin"), updateProduct).delete(isAuthenticatedUsed, AuthorizedRoles("admin"), deleteProduct)

router.route('/product/:id').get(getSingleProduct)

router.route('/review').put(isAuthenticatedUsed, createProductReview)

router.route('/reviews').get(getAllProductReviews).delete(isAuthenticatedUsed, AuthorizedRoles("admin"), deleteProductReview)




module.exports = router;