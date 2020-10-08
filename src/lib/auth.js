module.exports={
    isLoggeDin(req,res,next){
        if(req.isAuthenticated())
        return next();
        res.redirect('/admin')
    }
}
