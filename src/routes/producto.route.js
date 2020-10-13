const express=require('express');
const router = express.Router();

const {isLoggeDin}=require('../lib/auth');
const {renderMostrar,agregarProducto,listaProductos,seleccionarProducto,editarProducto}=require('../controllers/productos.controller');

router.use(isLoggeDin);
router.get('/crear',renderMostrar);
router.post('/crear',agregarProducto);
router.get('/lista',isLoggeDin,listaProductos);
router.get('/editar/:id',seleccionarProducto);
router.post('/editar/:id',editarProducto);

module.exports=router;