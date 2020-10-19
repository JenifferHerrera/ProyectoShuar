const express = require('express');
const router = express.Router();

const {isLoggeDin,isConductor}=require('../lib/auth');
const {listaConductores}=require('../controllers/conductor.controller');


router.use(isConductor);
router.get('/todo',isLoggeDin,listaConductores);

module.exports=router;
