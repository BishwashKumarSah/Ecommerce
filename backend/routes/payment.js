const express = require('express');
const { processStripePayment, getStripePublishableKey } = require('../controllers/paymentControllers');
const { isAuthenticatedUsed } = require('../middlewares/userAuth')
const router = express.Router();

router.route('/payment/create-stripe-payment-intent').post(isAuthenticatedUsed, processStripePayment)
router.route('/payment/getStripePublishableKey').get(isAuthenticatedUsed, getStripePublishableKey)

module.exports = router