const User = require("../models/user");
const ErrorHandler = require("../utils/errorHandle");
const asyncHandler = require("../utils/trycatch");
const jwt = require("jsonwebtoken")

const isAuthenticatedUsed = asyncHandler(async (req, res, next) => {
    const { token } = req.cookies

    if (!token) {
        return next(new ErrorHandler("Please login to access this page", 401))
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = User.findById(decodedData.id);

    next()

})

module.exports = { isAuthenticatedUsed }