const ErrorHandler = require('../utils/errorHandle')
const asyncHandler = require('../utils/trycatch');
const User = require('../models/user');
const { generateToken } = require('../utils/generateToken')


// Register User
const registerUser = asyncHandler(async (req, res, next) => {
    const { name, email, password } = req.body;
    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: 'demo',
            url: 'demourl'
        }
    });

    generateToken(user, res, 201)

})

// Login User
const loginUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;


    if (!email || !password) {
        return next(new ErrorHandler("Please Enter Email and Password", 400))
    }

    const user = await User.findOne({ email }).select("+password")

    if (!user) {
        return next(new ErrorHandler("Email or Password is incorrect", 401))
    }

    const isPasswordMatched = user.comparePassword(password)

    if (! await isPasswordMatched) {
        return next(new ErrorHandler("Email or Password is incorrect", 401))
    }


    generateToken(user, res, 200)
})


// Logout User

const logoutUser = asyncHandler(async (req, res, next) => {
    // const {token} = req.cookies -> to get all the cookies
    // req.cookie('token',null,options) -> to set
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: "Logout Successful"
    })

})


module.exports = { registerUser, loginUser, logoutUser }