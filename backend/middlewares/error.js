
const handleError = (error, req, res, next) => {
    error.message = error.message || "Internal Server Error"
    error.statusCode = error.statusCode || 500
    if (error.name === "CastError") {
        error.message = `Cannot find the resource with id ${error.value}`
        error.statusCode = 400
    }

    // Mongoose Duplicate key Error
    if (error.code === 11000) {
        error.message = `Duplicate ${Object.keys(error.keyValue)} Error`
    }

    // JSON Web Token Error
    if (error.name === "JsonWebTokenError") {
        error.message = `Json Web Token is invalid, please try again`
    }

    // JSON Web Token Expir Error
    if (error.name === "TokenExpiredError") {
        error.message = `Json Web Token is expired, please try again`
    }

    res.status(error.statusCode).json({
        success: false,
        message: error.message,
        error: error,
        stack: error.stack
    })
}

module.exports = handleError;