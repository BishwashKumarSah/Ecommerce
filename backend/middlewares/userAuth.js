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

    req.user = await User.findById(decodedData.id);
    

    next()

})

const AuthorizedRoles = (...Roles) => {
    return (req, res, next) => {

        // console.log(Roles); -> here func("admin","user") -> (...Roles) will give an array ["admin","user"]. func(["admin","user"]) -> (...Roles) will give [ [ 'admin', 'user' ] ]


        if (!Roles.includes(req.user.role)) {
            return next(new ErrorHandler("You are not authorized to view this page ", 403))
        }

        next()
    }
}


module.exports = { isAuthenticatedUsed, AuthorizedRoles }