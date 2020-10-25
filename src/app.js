const express = require('express'); 
const morgan = require('morgan');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const mysqlstore = require('express-mysql-session')(session);
const bodyparser = require('body-parser'); 



const {database} = require('./database/keys');


const app = express();
require('./lib/passport');

/// archivos compartidos
app.set('port', process.env.PORT|| 3636);
app.set('views', path.join(__dirname,'views'));
app.engine('.hbs',exphbs({
    defaultLayout:'main',
    layoutsDir:path.join(app.get('views'),'layouts'),
partialsDir:path.join(app.get('views'),'partials'),
extname: '.hbs',
helpres: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');
/// archivos compartidos


//midlewars
app.use(morgan('dev'));
app.use(bodyparser.urlencoded({
    extended:false
}));
app.use(bodyparser.json());
app.use(session({
    secret:'FINTECH',
    resave:false,
    saveUninitialized:false,
    store: new mysqlstore(database)
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
//midlewars

//varible globales 
app.use((req,res,next )=>{
    app.locals.message = req.flash('message');
    app.locals.success = req.flash('success');
    app.locals.user = req.user;
    next();
});
//varible globales 

//public
app.use(express.static(path.join(__dirname ,'public')));
//public


//routers
app.use(require('./routes/index.route'))
app.use(require('./routes/auth.route'))
app.use(require('./routes/user.route'))
app.use('/servicio',require('./routes/servicio.route'));
app.use('/producto',require('./routes/producto.route'));
app.use('/catalogo',require('./routes/catalogoProducto.route'));
app.use('/tipo',require('./routes/tipoVehiculo.route'));
app.use('/asociado',require('./routes/asociado.route'));
app.use('/conductor',require('./routes/conductor.route'));
app.use('/vehiculo',require('./routes/vehiculo.route'));

module.exports = app; 