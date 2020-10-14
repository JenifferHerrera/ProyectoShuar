const express=require('express');
const router = express.Router();

const {isLoggeDin}=require('../lib/auth');
const {renderMostrar,agregarProducto,listaProductos,todosLosProductos,seleccionarProducto,editarProducto}=require('../controllers/productos.controller');

router.use(isLoggeDin);
router.get('/crear',renderMostrar);
router.post('/crear',agregarProducto);
router.get('/lista',isLoggeDin,listaProductos);
router.get('/todo',isLoggeDin,todosLosProductos);
router.get('/editar/:id',seleccionarProducto);
router.post('/editar/:id',editarProducto);

module.exports=router;