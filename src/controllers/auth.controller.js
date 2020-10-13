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

authCtrl.logout = (req, res, next) => {
    req.logOut();
    res.redirect('/');
};

module.exports = authCtrl;