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

    const totalOrders = orders.length;

    const SalesMap = new Map()
    orders.map((order, index) => {
        if (order.shippingInfo.country in SalesMap) {
            SalesMap[order.shippingInfo.country][0] += 1
            SalesMap[order.shippingInfo.country][1] += order.totalPrice
        } else {
            SalesMap[order.shippingInfo.country] = [1, order.totalPrice]
        }
    })
    let total_Amount = 0
    orders?.forEach(order => {
        total_Amount += order.totalPrice;
    })
    res.status(200).json({
        success: true,
        message: 'Fetched All Users Orders',
        totalOrders,
        orders,
        total_Amount,
        salesMap: SalesMap
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
  
    if (req.body.status === 'Shipped') {
        

        const updateStockPromise = order.orderItems.map((order) => {
            return updateStock(order.product_id, order.quantity)
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

// Get Cumulative Profits 
const getCumulativeProfits = asyncHandler(async (req, res, next) => {

    const year = parseInt(req.params.year);
    const nextYear = year + 1
    const startDate = new Date(Date.UTC(year, 0, 1));
    const endDate = new Date(Date.UTC(nextYear, 0, 1));


    const totalOrders = await Order.find({})
    const Orders = await Order.find({ paidAt: { $gte: startDate, $lt: endDate } })


    const profitArray = new Array(12).fill(0)
    const yearArray = new Set()

    totalOrders.map((totalOrder, index) => {
        const year = new Date(totalOrder.paidAt).getFullYear()
        yearArray.add(year)
    })

    Orders.map((order, index) => {

        const month = new Date(order.paidAt).getMonth();
        const profit = order.totalPrice  //Here 10% is the platform charge that we are taking.
        profitArray[month] += profit
    });

    const cumulativeProfit = profitArray.reduce((acc, current, index) => {
        if (index === 0) {
            acc[index] = current
        } else {
            acc[index] = acc[index - 1] + current
        }
        return acc
    }, [])

    const newSortedYearArray = [...yearArray].sort((a, b) => a - b)


    const result = cumulativeProfit.map((profit, index) => {
        return {
            month: index + 1,
            totalProfit: profit
        }
    })

    res.status(200).json({
        year: newSortedYearArray,
        success: true,
        totalProfit: result
    })
})


module.exports = { createNewOrder, getSingleOrder, myOrders, getAllOrders, getCumulativeProfits, updateOrderStatus, deleteOrder }
