const express = require('express');
const morgan = require ('morgan');
const path = require ('path');
const exphbs= require('express-handlebars');
const passport = require('passport');
const flash = require('connect-flash');
const bodyParser= require ('body-parser');
const session=require('express-session');

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

// app.use(flash());
// app.use(passport.initialize());
// app.use(passport.session());

//variables globales
// app.use((req,res,next)=>{
//     app.locals.message=req.flash('message'),
//     app.locals.success=req.flash('success'),
//     app.locals.user=req.user,
//     next()
// });

//rutas
 app.use(require('./routes/index.route'));



app.use(express.static(path.join(__dirname, 'public')));

module.exports=app;
