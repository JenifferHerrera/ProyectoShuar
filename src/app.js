const express = require('express');
const morgan = require ('morgan');
const path = require ('path');
const exphbs= require('express-handlebars');
const passport = require('passport');
const flash = require('connect-flash');
const bodyParser= require ('body-parser');
const session=require('express-session');
var SequelizeStore = require('connect-session-sequelize')(session.Store);

//database
const sequelize= require('./database/database');
//inicialización
const app= express();

//middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//configuración
app.set('port',process.env.PORT || 3333);
app.set('views',path.join(__dirname,'views'));
app.engine('.hbs',exphbs({
    defaultLayout:'main',
    layoutsDir:path.join(app.get('views'),'layouts'),
    partialsDir:path.join(app.get('views'),'partials'),
    extname:'.hbs',
    helpers:require ('./lib/handlebars')
}));

app.set('view engine','.hbs');

var sessionStore = new SequelizeStore({
    db: sequelize,
    checkExpirationInterval: 15 * 60 * 1000,
    expiration: 7 * 24 * 60 * 60 * 1000
 });
 
 app.use(session({
   secret: 'keyboard cat',
   resave: false, 
   saveUninitialized: false,
   store: sessionStore
 }));
 
 sessionStore.sync()

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//variables globales
app.use((req,res,next)=>{
    app.locals.message=req.flash('message'),
    app.locals.success=req.flash('success'),
    app.locals.user=req.user,
    next()
});

//rutas
app.use(require('./routes/index.route'));
app.use(require('./routes/user.route'));


app.use(express.static(path.join(__dirname, 'public')));

module.exports=app;
