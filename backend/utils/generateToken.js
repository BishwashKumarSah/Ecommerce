// Generate Token and Save it as Cookie

const generateToken = (user, res, statusCode) => {
    // Yes, setting sameSite: 'None' allows cookies to be sent with cross-origin requests, but it also requires secure: true, meaning the cookie can only be transmitted over HTTPS. If your site is running on HTTP, the cookie may not be saved.

    // For local development on HTTP, you might want to set sameSite: 'Lax' or sameSite: 'Strict', and switch secure to false. When moving to production, ensure you use HTTPS and adjust the settings accordingly.

    const token = user.getJWTToken()

    // Options for Cookies
    const options = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true,
        sameSite: 'Lax',
        // secure: process.env.NODE_ENV === 'production' // Set to true if using HTTPS
        secure: false, // Set to true if using HTTPS i
    }

    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        user,
        token
    })
}

module.exports = { generateToken }