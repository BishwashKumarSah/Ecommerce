const asyncHandler = (func) => {
    return async (req, res, next) => {
        Promise.resolve(func(req, res, next)).catch(err => next(err))
    }
}

module.exports = asyncHandler