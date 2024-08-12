const ErrorHandler = require('../utils/errorHandle')
const asyncHandler = require('../utils/trycatch')
const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const processStripePayment = asyncHandler(async (req, res, next) => {
    const { amount, currency } = req.body;
    const myPayments = await stripe.paymentIntents.create({
        amount,
        currency,
        metadata: {
            company: 'EKart'
        },
    })
    res.status(201).json({
        success: true,
        client_secret: myPayments.client_secret
    })
})

const getStripePublishableKey = asyncHandler(async (req, res, next) => {
    res.status(200).json({
        stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY
    })
})

module.exports = { processStripePayment, getStripePublishableKey }