const express = require("express");

const authController = require('../controllers/authController.js');

const router = express.Router();

router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/reset-password', authController.resetPassword);

module.exports = router;
