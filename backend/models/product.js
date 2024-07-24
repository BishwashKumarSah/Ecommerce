const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a Product Name"],
        trim: true
    },
    
    description: {
        type: String,
        required: [true, "Please provide Product Description"]
    },
    price: {
        type: String,
        required: [true, "Please provide Product Price"],
        maxLength: [7, "Price cannot exceed 7 character"]
    },
    rating: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: [true, "Please provide a public_id"]
            },
            url: {
                type: String,
                required: [true, "Please provide a url"]
            }
        }
    ],
    category: {
        type: String,
        required: [true, "Please provide a Product Category"]
    },
    stock: {
        type: Number,
        required: [true, "Please provide Product Stock"],
        maxLength: [4, "Product Stock cannot be greater than 4 characters"],
        default: 1
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: String,
                required: true

            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true })

const product = mongoose.model('product', productSchema);
module.exports = product