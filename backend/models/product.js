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
    ratings: {
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
            name: {
                type: String,
                required: [true, "Name is a required field"],
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
    createdBy: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "user"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true })

const product = mongoose.model('product', productSchema);
module.exports = product