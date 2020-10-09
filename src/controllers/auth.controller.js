const authCtrl = {};

const passport = require('passport');



authCtrl.renderLogin = (req, res, next) => {
    res.render('login');
};

authCtrl.login = passport.authenticate('local.signin', {
    successRedirect: '/admin',
    failureRedirect: '/login',
    failureFlash: true
});

authCtrl.logout = (req, res, next) => {
    req.logOut();
    res.redirect('/');
};

module.exports = authCtrl;