const express=require('express');
const { v4: uuidv4 } = require('uuid');
const path=require('path');
// uuidv4()+path.extname(file.originalname).toLocaleLowerCase()
const multer=require('multer');


const router = express.Router();

const {isLoggeDin,isAsociado}=require('../lib/auth');
const {renderMostrar,agregarProducto,listaProductos,todosLosProductos,seleccionarProducto,editarProducto,eliminarProducto,catalogoProducto}=require('../controllers/productos.controller');

router.use(isAsociado);
router.get('/todo',isLoggeDin,todosLosProductos);
router.get('/crear',catalogoProducto,renderMostrar);
router.post('/crear',agregarProducto);
router.get('/lista',isAsociado,listaProductos);
router.get('/editar/:id',seleccionarProducto);
router.post('/editar/:id',editarProducto);
router.get('/eliminar/:id',eliminarProducto);

module.exports=router;