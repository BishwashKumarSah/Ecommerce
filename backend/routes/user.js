const express = require('express');
const router = express.Router()

const { registerUser, loginUser, logoutUser } = require('../controllers/user')

router.route('/user/register').post(registerUser)

router.route('/user/login').post(loginUser)

router.route('/user/logout').post(logoutUser)

module.exports = router;
