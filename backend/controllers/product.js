const Product = require('../models/product');
const ErrorHandler = require('../utils/errorHandle')
const asyncHandler = require('../utils/trycatch')
const ProductClass = require('../utils/productClass')

// Create Product - Admin

const createProduct = asyncHandler(async (req, res, next) => {

    req.body.createdBy = req.user._id;

    const product = await Product.create(req.body);
    return res.status(201).json({
        success: true,
        message: 'Product Created Successfully',
        data: product
    })
})

// Get All Products
const getAllProducts = asyncHandler(async (req, res, next) => {

    // const produc = await Product.find({})
    // console.log(produc);

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

// Create a New Review or Update the Existing Review of the Product
const createProductReview = asyncHandler(async (req, res, next) => {
    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user.id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }

    const product = await Product.findById(productId)

    if (!product) {
        return next(new ErrorHandler("Product does not exist."), 400)
    }

    const isAlreadyReviewed = product.reviews?.find(prod => {
        return req.user.id.toString() === prod.user.toString()
    })

    if (isAlreadyReviewed) {
        product.reviews?.forEach(prod => {
            if (req.user.id.toString() === prod.user.toString()) {
                prod.rating = rating,
                    prod.comment = comment
            }
        })
    } else {
        product.reviews.push(review)
        product.numOfReviews = Number(product.reviews?.length)
    }

    var total = 0
    product.reviews?.forEach(prod => {
        total += Number(prod.rating)
    })

    product.ratings = Number(total / product.reviews.length)

    await product.save()
    res.status(201).json({
        success: true,
        message: 'Review Created Successfully.',
    })
})

// Get All Reviews of the Product.
const getAllProductReviews = asyncHandler(async (req, res, next) => {
    
    const product = await Product.findById(req.query.id);

    if (!product) {
        return next(new ErrorHandler(`Product with the Id ${req.query.id} does not exists`), 400)
    }
    res.status(200).json({
        success: true,
        message: 'All Reviews Fetched',
        reviews: product.reviews
    })
})

// Delete Specific Product Review.
const deleteProductReview = asyncHandler(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);

    if (!product) {
        return next(new ErrorHandler(`Product with the Id ${req.query.id} does not exists`), 400)
    }

    const reviews = product.reviews.filter(prod => prod._id.toString() !== req.query.id.toString())

    let avg = 0
    reviews?.forEach(prod => {
        avg += prod.rating
    })

    product.ratings = reviews.length > 0 ? Number(avg / reviews.length) : 0

    product.numOfReviews = reviews.length

    product.reviews = reviews

    await product.save()

    res.status(200).json({
        success: true,
        message: 'Review Deleted Successfully',
        reviews: product.reviews
    })
})



module.exports = { getAllProducts, createProduct, updateProduct, deleteProduct, getSingleProduct, createProductReview, getAllProductReviews, deleteProductReview }