const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { timeStamp } = require('console');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is a required field"],
        maxLength: [30, "Name cannot exceed more than 30 characters"],
        minLength: [4, "Name should have more than 4 characters"],
        trim: true
    },
    email: {
        type: String,
        unique: [true, "Email already exists"],
        required: [true, "Email is a required field"],
        validate: [validator.isEmail, "Please provide a valid email"]
    },
    password: {
        type: String,
        required: [true, "Password is a required field"],
        minLength: [8, "Name should have more than 8 characters"],
        select: false

    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: "user"
    },
    resetPasswordToken: String,
    resetPasswordExpiry: Date
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10)
})

// Generate JWT Token
userSchema.methods.getJWTToken = function () {
    return jwt.sign({
        id: this._id,
        name: this.name
    }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}

// Check if password matches 
userSchema.methods.comparePassword = function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password)
}

// Generating Reset Password Token
userSchema.methods.getResetPasswordToken = function () {
    const cryptoToken = crypto.randomBytes(15).toString('hex')
    this.resetPasswordToken = crypto.createHash('sha256').update(cryptoToken).digest('hex');
    this.resetPasswordExpiry = Date.now() + 20 * 60 * 1000;
    return cryptoToken
}



const user = new mongoose.model('user', userSchema);
module.exports = user;