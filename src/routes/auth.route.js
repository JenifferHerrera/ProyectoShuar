const express = require('express');
const router = express.Router();

const { renderLogin, login, logout, signup,renderSignup,renderAsociado,asociado,renderConductor,conductor,renderLoginA,loginA,renderLoginC,loginC } = require('../controllers/auth.controller')

router.get('/adminlogin', renderLogin);
router.post('/adminlogin', login);

router.get('/signup', renderSignup);
router.post('/signup', signup);

router.get('/loginAsociado', renderLoginA);
router.post('/loginAsociado', loginA); 

router.get('/registroAsociado', renderAsociado);
router.post('/registroAsociado', asociado);

router.get('/loginConductor', renderLoginC);
router.post('/loginConductor', loginC); 

router.get('/registroConductor', renderConductor);
router.post('/registroConductor', conductor);

router.get('/logout', logout);

module.exports = router;