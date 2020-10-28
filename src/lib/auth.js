module.exports={
    isLoggeDin(req,res,next){
        if(req.isAuthenticated())
        return next();
        res.redirect('/admin')
    },
    isAsociado(req,res,next){
        if(req.isAuthenticated())
        return next();
        res.redirect('/asociado/vista')
    },
    isConductor(req,res,next){
        if(req.isAuthenticated())
        return next();
        res.redirect('/conductor/vista')
    }
}
