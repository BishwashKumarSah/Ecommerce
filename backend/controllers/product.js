const Product = require('../models/product');
const ErrorHandler = require('../utils/errorHandle')
const asyncHandler = require('../utils/trycatch')
const ProductClass = require('../utils/productClass')

// Create Product - Admin

const createProduct = asyncHandler(async (req, res, next) => {

    const product = await Product.create(req.body);
    return res.status(201).json({
        success: true,
        message: 'Product Created Successfully',
        data: product
    })
})

// Get All Products
const getAllProducts = asyncHandler(async (req, res, next) => {

    // const products = await Product.find({})
    const resultPerPage = 5

    queryS = new ProductClass(Product.find(), req.query).search().filter().pagination(resultPerPage)
    let products = await queryS.query
    const totalCount = products.length;

    return res.status(200).json({
        success: true,
        message: 'working get all product',
        data: products,
        count: totalCount
    })
})

// Get Single Product
const getSingleProduct = asyncHandler(async (req, res, next) => {

    const product = await Product.findById(req.params.id)

    if (!product) {
        return next(new ErrorHandler(`Cannot get the product with id ${req.params.id}`, 400));
    }

    return res.status(200).json({
        success: true,
        message: 'working single product',
        data: product
    })
})

// Update Product - Admin
const updateProduct = asyncHandler(async (req, res, next) => {

    let product = await Product.findById(req.params.id)

    if (!product) {
        return next(new ErrorHandler(`Cannot get the product with id ${req.params.id}`, 400));
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    return res.status(200).json({
        success: true,
        message: 'working update product',
        data: product
    })
})

// Delete A Product -- Admin

const deleteProduct = asyncHandler(async (req, res, next) => {

    let product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler(`Cannot get the product with id ${req.params.id}`, 400));
    }
    // this will return the deleted product not the remaning data after deleting
    product = await Product.findByIdAndDelete(req.params.id)
    return res.status(200).json({
        success: true,
        message: 'working delete product',
        data: product
    })
})

module.exports = { getAllProducts, createProduct, updateProduct, deleteProduct, getSingleProduct }