// Generate Token and Save it as Cookie

const generateToken = (user, res, statusCode) => {

    const token = user.getJWTToken()

    // Options for Cookies
    const options = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true,
        
        secure: false, // Set to true if using HTTPS
    }

    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        user,
        token
    })
}

module.exports = { generateToken }