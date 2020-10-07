const authCtrl={}
const passport= require('passport');

//login
authCtrl.renderLogin=(req,res)=>{
   res.render('login'); 
}
authCtrl.Login=passport.authenticate('local.signin',{
    successRedirect:'/admin',
    failureRedirect:'/login',
    failureFlash:true
})

authCtrl.logout=(req,res)=>{
    req.logOut();
    res.redirect('/');
}

module.exports=authCtrl;