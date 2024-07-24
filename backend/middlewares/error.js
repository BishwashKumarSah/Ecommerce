
const handleError = (error, req, res, next) => {
    error.message = error.message || "Internal Server Error"
    error.statusCode = error.statusCode || 500
    if (error.name === "CastError") {
        error.message = `Cannot find the resource with id ${error.value}`
        error.statusCode = 400
    }
    res.status(error.statusCode).json({
        success: false,
        error: error,
        message: error.message,
        stack: error.stack
    })
}

module.exports = handleError;