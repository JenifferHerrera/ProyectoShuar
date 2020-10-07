const express= require('express');
const router=express.Router();
const {isLoggeDin}= require('../lib/auth');
const {renderUsuario}=require('../controllers/user.controller');

router.get('/admin',isLoggeDin,renderUsuario)
module.exports=router;