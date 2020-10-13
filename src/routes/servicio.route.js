const express = require('express');
const router = express.Router();

const {isLoggeDin}=require('../lib/auth');
const {renderMostrar,agregarServicio,listaServicios,seleccionarServicio,editarServicio}=require('../controllers/servicios.controller');

router.use(isLoggeDin);
router.get('/crear',renderMostrar);
router.post('/crear',agregarServicio);
router.get('/lista',isLoggeDin,listaServicios);
router.get('/editar/:id',seleccionarServicio);
router.post('/editar/:id',editarServicio);

module.exports=router;