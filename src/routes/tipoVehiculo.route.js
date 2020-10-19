const express = require('express');
const router = express.Router();

const {isLoggeDin}=require('../lib/auth');
const {renderMostrar,agregarTipoVehiculo,listaTipoVehiculo,seleccionarTipoVehiculo,editarTipoVehiculo,eliminarTipoVehiculo}=require('../controllers/tipoVehiculo.controller');

router.use(isLoggeDin);
router.get('/crear',renderMostrar);
router.post('/crear',agregarTipoVehiculo);
router.get('/lista',isLoggeDin,listaTipoVehiculo);
router.get('/editar/:id',seleccionarTipoVehiculo);
router.post('/editar/:id',editarTipoVehiculo);
router.get('/eliminar/:id',eliminarTipoVehiculo);

module.exports=router;