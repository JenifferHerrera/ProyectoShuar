const { Strategy } = require('passport');
const passport=require('passport');
const LocalStrategy=require ('passport-local').Strategy;
const pool=require('../database/database');
const helpers=require('./helpers');
//Validar la contaseña
passport.use(
    'local.signin',
    new LocalStrategy({
        usernameField:'username',
        passwordField:'password',
        passReqToCallback:true
    },
    async (req,username,password,done)=>{
        const rows=await pool.query('SELECT * FROM users WHERE username=?',[username]);
        if(rows.length > 0){
            const user=rows[0];
            const validatePassword=await helpers.matchPassword(
                password,
                user.password
            )
            if(validatePassword){
                done(null,user,red.flash('success', 'Bienvenido '+ user.username));
            }else{
                done(null,false,red.flash('message','Sus datos son incorrectos'));
            }
        }else{
            return done(null,false.red.flash('message','El usuario no existe'));
        }
    }
    )
);

//registro
passport.use(
    'local.signup',
    new LocalStrategy(
        {
        usernameField:'username',
        passwordField:'password',
        passReqToCallback:true
        },
        async (req,username,password,done)=>{
            const {correo}=req.body;
            let newUser={
                correo,
                username,
                password
            }
            newUser.password=await helpers.encryptPassword(password);
            const result=await pool.query('INSERT INTO users SET ?',newUser);
            newUser.id=result.insertId
            return done(null,newUser);
        }
    )
    );

    passport.serializeUser((user,done)=>{
        done(null,user.id);
    });
    passport.deserializeUser(async (id,done)=>{
        const rows= await pool.query('SELECT * FROM users WHERE id=?',[id]);
        done(null,rows[0]);
    });