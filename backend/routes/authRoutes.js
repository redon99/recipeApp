const express = require('express');
const router = express.Router();
const authController = require('./../controllers/authController');
const authenticateUser = require('./../middlewares/auth');

router.route('/register').post(authController.register);
router.route('/login').post(authController.login);
router.route('/updateUser').patch(authenticateUser, authController.updateUser);

module.exports = router;
