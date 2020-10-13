const express = require('express');
const router = express.Router();

const {isLoggeDin}=require('../lib/auth');
const {renderMostrar,agregarCatProducto,listaCatalogo,seleccionarProducto,editarCatalogo}=require('../controllers/catalogoProducto.controller');

router.use(isLoggeDin);
router.get('/crear',renderMostrar);
router.post('/crear',agregarCatProducto);
router.get('/lista',isLoggeDin,listaCatalogo);
router.get('/editar/:id',seleccionarProducto);
router.post('/editar/:id',editarCatalogo);

module.exports=router;