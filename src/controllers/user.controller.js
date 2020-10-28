const userCtrl={}
userCtrl.renderUsuario=(req,res,next)=>{
    res.render('admin')
}
userCtrl.renderAsociado=(req,res,next)=>{
    res.render('adminAsociados')
}
userCtrl.renderConductor=(req,res,next)=>{
    res.render('perfilConductor')
}
module.exports=userCtrl;