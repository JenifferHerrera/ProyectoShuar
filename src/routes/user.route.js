const express= require('express');
const router=express.Router();
const {isLoggeDin,isAsociado,isConductor}= require('../lib/auth');
const {renderUsuario,renderAsociado,renderConductor}=require('../controllers/user.controller');

router.get('/admin',isLoggeDin,renderUsuario)

router.get('/asociado/vista',isAsociado,renderAsociado)

router.get('/vehiculo',isConductor,renderConductor)

module.exports=router;