const Order = require('../models/order');
const Product = require('../models/product');
const ErrorHandler = require('../utils/errorHandle')
const asyncHandler = require('../utils/trycatch')


// Create a New Order
const createNewOrder = asyncHandler(async (req, res, next) => {
    const { shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;
    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user
    })

    res.status(201).json({
        success: true,
        message: 'Order Created Successfully',
        order
    })
})

// Get Single Order  -  -
const getSingleOrder = asyncHandler(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate("user", "name email")   
    if (!order) {
        return next(new ErrorHandler(`Cannot find the order with ID : ${req.params.id}`, 404))
    }
    res.status(200).json({
        success: true,
        message: `Fetched Order with Id:${req.params.id}`,
        order
    })
})

// Get Logged In User Orders 
const myOrders = asyncHandler(async (req, res, next) => {
    const orders = await Order.find({ user: req.user.id })
    // if (!orders) {
    //     return next(new ErrorHandler(`No Orders Found`), 404)
    // }
    res.status(200).json({
        success: true,
        message: 'Fetched All Your Orders',
        orders

    })
})

// Get All Orders - (ADMIN)
const getAllOrders = asyncHandler(async (req, res, next) => {
    const orders = await Order.find({}).populate("user", "name email")
    let total_Amount = 0
    orders?.forEach(order => {
        total_Amount += order.totalPrice;
    })
    res.status(200).json({
        success: true,
        message: 'Fetched All Users Orders',
        orders,
        total_Amount
    })
})

// Update Order Status - (ADMIN)
const updateOrderStatus = asyncHandler(async (req, res, next) => {
    const order = await Order.findById(req.params.id)

    if (!order) {
        return next(new ErrorHandler(`Cannot find the order with ID:${req.params.id}`), 404)
    }

    if (order.orderStatus === 'Delivered') {
        return next(new ErrorHandler('Order has already been delivered'), 400)
    }
    order.orderStatus = req.body.status;
    if (req.body.status === 'Delivered') {
        const updateStockPromise = order.orderItems.map((order) => {
            return updateStock(order.product, order.quantity)
        })
        await Promise.all(updateStockPromise)
        order.deliveredAt = Date.now()
    }

    await order.save({ validateBeforeSave: false })

    res.status(200).json({
        success: true,
        order
    })

})

// Update Stock of the products that has been delivered in updateOrderStatus()
const updateStock = async (id, quantity) => {
    const product = await Product.findById(id)
    product.stock = Math.max(product.stock - quantity, 0)
    await product.save({ validateBeforeSave: false })
}


// Delete Order - (ADMIN)
const deleteOrder = asyncHandler(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler(`Cannot find order with id: ${req.params.id}`, 404));
    }

    const deletedOrder = await Order.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,
        message: `Order Deleted Successfully with Id: ${req.params.id}`,
        deletedOrder
    });
});


module.exports = { createNewOrder, getSingleOrder, myOrders, getAllOrders, updateOrderStatus, deleteOrder }
