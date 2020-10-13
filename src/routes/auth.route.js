const express = require('express');
const router = express.Router();

const { renderLogin, login, logout, signup,renderSignup } = require('../controllers/auth.controller')

router.get('/adminlogin', renderLogin);
router.post('/adminlogin', login);

router.get('/signup', renderSignup);
router.post('/signup', signup);

router.get('/logout', logout);

module.exports = router;