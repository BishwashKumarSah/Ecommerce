const ErrorHandler = require('../utils/errorHandle')
const asyncHandler = require('../utils/trycatch');
const User = require('../models/user');
const { generateToken } = require('../utils/generateToken');
const { sendEmail } = require('../utils/sendEmail');
const crypto = require('crypto');
const { validate } = require('../models/product');


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

    if (!await isPasswordMatched) {
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

// Generate Reset Password Token
const resetUserPasswordToken = asyncHandler(async (req, res, next) => {
    const { email } = req.body;

    if (!email) {
        return next(new ErrorHandler("Please provide a valid email", 400))
    }

    const user = await User.findOne({ email })

    if (!user) {
        return next(new ErrorHandler("Please provide a valid email", 400))
    }

    const resetToken = user.getResetPasswordToken()
    // console.log(resetToken);
    await user.save({ validateBeforeSave: false })


    const resetPasswordUrl = `${req.protocol}://${req.get('host')}/api/v1/user/password/reset/${resetToken}`
    const message = `Please reset your password using this link: \n\n ${resetPasswordUrl} \n\n The link expires in 20 minutes. \n If you have not requested for password reset, please ignore the message.`

    try {
        const emailOptions = {
            email: user.email,
            message: message,
            subject: 'EKart Password Recovery Link'
        }

        await sendEmail(emailOptions)

        res.status(200).json({
            success: true,
            message: `Email sent to ${email} successful`
        })

    } catch (error) {
        user.resetPasswordToken = undefined
        user.resetPasswordExpiry = undefined
        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(error.message, 500))

    }
})

// Check if resetToken is Valid and if password and confirm password matches

const resetUserPassword = asyncHandler(async (req, res, next) => {
    const token = req.params.id
    const cryptoToken = crypto.createHash('sha256').update(token).digest('hex');


    const user = await User.findOne({
        resetPasswordToken: cryptoToken,
        resetPasswordExpiry: { $gte: Date.now() }
    })

    if (!user) {
        return next(new ErrorHandler("Token invalid or Expired "))
    }

    const { password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return next(new ErrorHandler("password does not match", 400))
    }

    user.password = password
    user.resetPasswordToken = undefined
    user.resetPasswordExpiry = undefined
    await user.save()

    generateToken(user, res, 200)
})

// Get User Details
const getUserDetails = asyncHandler(async (req, res, next) => {

    const user = await User.findById(req.user._id);

    res.status(200).json({
        success: true,
        user
    })
})

// Update User Password
const updateUserPassword = asyncHandler(async (req, res, next) => {
    const { password, newPassword, confirmPassword } = req.body;
    const user = await User.findById(req.user._id).select("+password");

    if (!password) {
        return next(new ErrorHandler("Please Enter you password"), 401)
    }

    const isPasswordMatched = await user.comparePassword(password)


    if (!await isPasswordMatched) {
        return next(new ErrorHandler("Email or Password is incorrect", 401))
    }

    if (newPassword !== confirmPassword) {
        return next(new ErrorHandler("New password and confirm password does not match"), 401)
    }

    user.password = newPassword;
    await user.save()
    return res.status(200).json({
        success: true,
        message: 'Password updated successfully',
        user
    })
})

// Update User Profile
const updateUserProfile = asyncHandler(async (req, res, next) => {
    const { name, email } = req.body;

    const user = await User.findByIdAndUpdate(req.user._id, {
        name, email
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    // ***********************************************Images Avatarr Needs to be updated****************************************/
    await user.save({ validateBeforeSave: true })
    return res.status(200).json({
        success: true,
        message: 'Profile updated successfully',
        user
    })
})

// Get All Users -(ADMIN)
const getAllUsers = asyncHandler(async (req, res, next) => {
    const users = await User.find({})
    res.status(200).json({
        success: true,
        message: 'Fetched all the users',
        users
    })
})

// Get Specific User Profile Details - (ADMIN)
const getSingleUserDetails = asyncHandler(async (req, res, next) => {
    const userId = req.params.id

    const user = await User.findById(userId)

    if (!user) {
        return next(new ErrorHandler(`No user found with Id: ${userId}`),400)
    }

    res.status(200).json({
        success: true,
        message: `Fetched Details of the User With Id ${userId}`,
        user
    })
})





module.exports = { registerUser, loginUser, logoutUser, resetUserPasswordToken, resetUserPassword, getUserDetails, updateUserPassword, updateUserProfile, getAllUsers, getSingleUserDetails }