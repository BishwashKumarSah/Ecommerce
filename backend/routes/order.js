const express = require('express');
const router = express.Router();
const { isAuthenticatedUsed, AuthorizedRoles } = require('../middlewares/userAuth');
const { createNewOrder, getSingleOrder, myOrders, getAllOrders, updateOrderStatus, deleteOrder } = require('../controllers/order');

router.route('/order/new').post(isAuthenticatedUsed, createNewOrder)

router.route('/order/:id').get(isAuthenticatedUsed, getSingleOrder);

router.route('/orders/me').get(isAuthenticatedUsed, myOrders)

router.route('/admin/orders').get(isAuthenticatedUsed, AuthorizedRoles("admin"), getAllOrders)

router.route('/admin/order/:id').put(isAuthenticatedUsed, AuthorizedRoles("admin"), updateOrderStatus).delete(isAuthenticatedUsed, AuthorizedRoles("admin"), deleteOrder)


module.exports = router