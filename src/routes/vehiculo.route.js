const express = require('express');
const router = express.Router();

const {isConductor}=require('../lib/auth');
const {agregarVehiculo,seleccionarVehiculo,editarVehiculo,eliminarVehiculo,listaTipoVehiculo}=require('../controllers/vehiculo.controller');

router.use(isConductor);
router.post('/crear',agregarVehiculo);
router.get('/editar/:id',seleccionarVehiculo);
router.post('/editar/:id',editarVehiculo);
router.get('/crear',isConductor,listaTipoVehiculo);
router.get('/eliminar/:id',eliminarVehiculo);

module.exports=router;

