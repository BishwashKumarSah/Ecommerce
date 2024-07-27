const express = require('express');
const router = express.Router()

const { registerUser, loginUser, logoutUser, resetUserPasswordToken, resetUserPassword, getUserDetails, updateUserPassword, updateUserProfile, getAllUsers, getSingleUserDetails } = require('../controllers/user')

const { isAuthenticatedUsed, AuthorizedRoles } = require('../middlewares/userAuth')

router.route('/user/register').post(registerUser)

router.route('/user/login').post(loginUser)

router.route('/user/logout').post(logoutUser)

router.route('/user/password/reset').post(resetUserPasswordToken)

router.route('/user/password/reset/:id').put(resetUserPassword)

router.route('/me').get(isAuthenticatedUsed, getUserDetails)

router.route('/user/updatePassword').put(isAuthenticatedUsed, updateUserPassword)

router.route('/user/updateUserProfile').put(isAuthenticatedUsed, updateUserProfile)

router.route('/admin/users').get(isAuthenticatedUsed, AuthorizedRoles('admin'), getAllUsers)

router.route('/admin/user/:id').get(isAuthenticatedUsed, AuthorizedRoles('admin'), getSingleUserDetails);



module.exports = router;
