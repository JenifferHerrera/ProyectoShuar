const express = require('express');
const router = express.Router();

const { renderLogin, login, logout } = require('../controllers/auth.controller')

router.get('/login', renderLogin);
router.post('/login', login);

router.get('/logout', logout);

module.exports = router;