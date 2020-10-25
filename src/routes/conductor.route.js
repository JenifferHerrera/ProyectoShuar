const express = require('express');
const router = express.Router();

const {isLoggeDin,isConductor}=require('../lib/auth');
const {listaConductores,seleccionarConductor,editarConductor,perfilConductor}=require('../controllers/conductor.controller');


router.use(isConductor);
router.get('/todo',isLoggeDin,listaConductores);
router.get('/vista',isConductor,perfilConductor);
router.get('/editar/:id',seleccionarConductor);
router.post('/editar/:id',editarConductor);

module.exports=router;
