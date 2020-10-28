const authCtrl = {};

const passport = require('passport');


authCtrl.renderLogin = (req, res, next) => {
    res.render('adminlogin');
};

authCtrl.login = passport.authenticate('local.signin', {
    successRedirect: '/admin',
    failureRedirect: '/adminlogin',
    failureFlash: true
});

authCtrl.renderSignup = (req, res, next) => {
    res.render('signup');
};

authCtrl.signup = passport.authenticate('local.signup', {
    successRedirect: '/admin',
    failureRedirect: '/adminlogin',
    failureFlash: true
});

//ASOCIADOS

authCtrl.renderLoginA = (req, res, next) => {
    res.render('loginAsociado');
};

authCtrl.loginA = passport.authenticate('local.signinA', {
    successRedirect: '/asociado/vista',
    failureRedirect: '/loginAsociado',
    failureFlash: true
});

authCtrl.renderAsociado= (req, res, next) => {
    res.render('registroAsociado');
};

authCtrl.asociado = passport.authenticate('local.signupA', {
    successRedirect: '/asociado/vista',
    failureRedirect: '/registroAsociado',
    failureFlash: true
});


//CONDUCTORES
authCtrl.renderLoginC = (req, res, next) => {
    res.render('loginConductor');
};

authCtrl.loginC = passport.authenticate('local.signinC', {
    successRedirect: '/conductor/vista',
    failureRedirect: '/loginConductor',
    failureFlash: true
});

authCtrl.renderConductor= (req, res, next) => {
    res.render('registroConductor');
};

authCtrl.conductor = passport.authenticate('local.signupC', {
    successRedirect: '/conductor/vista',
    failureRedirect: '/registroConductor',
    failureFlash: true
});

authCtrl.logout = (req, res, next) => {
    req.logOut();
    res.redirect('/');
};

module.exports = authCtrl;