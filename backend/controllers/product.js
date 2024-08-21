const Product = require('../models/product');
const ErrorHandler = require('../utils/errorHandle')
const asyncHandler = require('../utils/trycatch')
const ProductClass = require('../utils/productClass')
const cloudinary = require('cloudinary')

// Create Product - Admin

const createProduct = asyncHandler(async (req, res, next) => {

    req.body.createdBy = req.user._id;

    // console.log(typeof req.body.images);if it is single image then it will just print string type but if there are multiple file it will print object

    let images = []
    if (typeof req.body.images === 'string') {
        images.push(req.body.images)
    } else {
        images = req.body.images
    }

    const imagesLinks = []

    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "avatars"
        })
        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url
        })
    }

    req.body.images = imagesLinks

    const product = await Product.create(req.body);
    return res.status(201).json({
        success: true,
        message: 'Product Created Successfully',
        data: product
    })
})

const getAllProducts = asyncHandler(async (req, res, next) => {
    const resultPerPage = 10;

    const queryS = new ProductClass(Product.find(), req.query).search().filter();
    const totalProductsCount = await queryS.query.clone().countDocuments();

    const new_query = queryS.pagination(resultPerPage);
    const products = await new_query.query;


    return res.status(200).json({
        success: true,
        message: 'working get all product',
        data: products,
        totalProductsCount: totalProductsCount
    });
});

// Get All Products (ADMIN)
const getAllProductsAdmin = asyncHandler(async (req, res, next) => {
    const products = await Product.find({})

    var outOfStock = 0
    products.map((product, index) => {
        if (product.stock <= 0) {
            outOfStock += 1
        }
    })

    const totalCount = products.length;

    var inStock = totalCount - outOfStock

    return res.status(200).json({
        success: true,
        products: products,
        outOfStock,
        inStock,
        totalCount: totalCount
    });
});

// Get Single Product
const getSingleProduct = asyncHandler(async (req, res, next) => {
    // return next(new ErrorHandler("This is a demo error"),500)

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

    // Delete Prev Images from Cloudinary and Upload New Images to Cloudinary
    let images = [];

    if (typeof req.body.images === "string") {
        images.push(req.body.images);
    } else {
        images = req.body.images;
    }

    if (images !== undefined) {
        // Deleting Images From Cloudinary
        for (let i = 0; i < product.images.length; i++) {
            await cloudinary.v2.uploader.destroy(product.images[i].public_id);
        }

        const imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: "products",
            });

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }
        req.body.images = imagesLinks;
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
    for (let index = 0; index < product.images.length; index++) {
        await cloudinary.v2.uploader.destroy(product.images[index].public_id);
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
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
        productId
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
        reviews: product
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
        ratings: product.ratings,
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
        reviews: product
    })
})



module.exports = { getAllProducts, getAllProductsAdmin, createProduct, updateProduct, deleteProduct, getSingleProduct, createProductReview, getAllProductReviews, deleteProductReview }