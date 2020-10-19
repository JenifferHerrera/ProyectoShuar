const express = require('express');
const router = express.Router();

const {isLoggeDin,isAsociado}=require('../lib/auth');
const {todosAsociados,listaServicio,listaAsociado,seleccionarAsociado,editarAsociado}=require('../controllers/asociado.controller');

router.use(isAsociado);
router.get('/todo',isLoggeDin,todosAsociados);
router.get('/perfil',isAsociado,listaAsociado);
router.get('/editar/:id',seleccionarAsociado);
router.post('/editar/:id',editarAsociado);

module.exports=router;