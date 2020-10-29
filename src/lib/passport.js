const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const pool = require("../database/database");
const helpers = require("./helpers");

passport.use(
  "local.signin",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true
    },
    async (req, username, password, done) => {
      const rows = await pool.query("SELECT * FROM users WHERE username = ?", [
        username
      ]);
      if (rows.length > 0) {
        const user = rows[0];
        const validPassword = await helpers.matchPassword(
          password,
          user.password
        );
        if (validPassword) {
          done(null, user, req.flash("success", "Bienvenido " + user.username));
        } else {
          done(null, false, req.flash("message", "Contraseña incorrecta"));
        }
      } else {
        return done(
          null,
          false,
          req.flash("message", "El nombre de usuario no existe.")
        );
      }
    }
  )
);

passport.use(
  "local.signup",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true
    },
    async (req, username, password, done) => {
      const { correo } = req.body;

      let newUser = {
        correo,
        username,
        password
      };

      newUser.password = await helpers.encryptPassword(password);
      // Saving in the Database
      const result = await pool.query("INSERT INTO users SET ? ", newUser);
      newUser.id = result.insertId;
      return done(null, newUser);
    }
  )
);


//ASOCIADOS
passport.use(
  "local.signinA",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true
    },
    async (req, username, password, done) => {
      const rows = await pool.query("SELECT * FROM users WHERE username = ?", [
        username
      ]);
      if (rows.length > 0) {
        const user = rows[0];
        const validPassword = await helpers.matchPassword(
          password,
          user.password
        );
        if (validPassword) {
          done(null, user, req.flash("success", "Bienvenido al módulo de Asociado"));
        } else {
          done(null, false, req.flash("message", "Contraseña incorrecta"));
        }
      } else {
        return done(
          null,
          false,
          req.flash("message", "El nombre de usuario no existe.")
        );
      }
    }
  )
);

passport.use(
  "local.signupA",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true
    },
    async (req, username, password, done) => {
      const { nombre_empresa,correo,actividad_comercial,direccion,foto_asociado,estado } = req.body;

      let newUser = {
        username,
        password
      };
      let newDatos={
        nombre_empresa,
        correo,
        actividad_comercial,
        direccion,
        foto_asociado,
        estado
      }

      newUser.password = await helpers.encryptPassword(password);
      // Saving in the Database
      const result = await pool.query("INSERT INTO users SET ? ", newUser);
      //datos del asociados a la base
      await pool.query('INSERT INTO asociados SET ?',newDatos);
      newUser.id = result.insertId;
      return done(null, newUser);
    }
  )
);

passport.use(
  "local.registerA",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true
    },
    async (req, username, password, done) => {
      
      const { nombre_empresa,correo,actividad_comercial,direccion,foto_asociado,estado} = req.body;

      let newDatos={
        nombre_empresa,
        correo,
        actividad_comercial,
        direccion,
        foto_asociado,
        estado,
        username
      }

      let newUser = {
        username,
        password,
        correo
      };

      const rows = await pool.query("SELECT * FROM asociados WHERE nombre_empresa =?", [nombre_empresa]);
      const rows2 = await pool.query("SELECT * FROM users WHERE username = ?", [username]);
      /* console.log(req.body) */
      
      if (rows.length > 0|rows2.length >0) {
       console.log("ya existe");
       return done(null, username,req.flash("error", "Usuario ya registrado"));
      } else {
        newUser.password = await helpers.encryptPassword(password);
        console.log("no existe");
              // Saving in the Database
        const result = await pool.query("INSERT INTO users SET ? ", newUser);
        newUser.id = result.insertId;
        //datos del asociados a la base
        await pool.query('INSERT INTO asociados SET ?',newDatos);
     
        return done(null,false,req.flash("success", "Se ha registrado correctamente, inicie sesión")
        );
      }
    }
  )
);



//CONDUCTORES
passport.use(
  "local.signinC",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true
    },
    async (req, username, password, done) => {
      const rows = await pool.query("SELECT * FROM users WHERE username = ?", [
        username
      ]);
      if (rows.length > 0) {
        const user = rows[0];
        const validPassword = await helpers.matchPassword(
          password,
          user.password
        );
        if (validPassword) {
          done(null, user, req.flash("success", "Bienvenido al módulo de Conductor"));
        } else {
          done(null, false, req.flash("message", "Contraseña incorrecta"));
        }
      } else {
        return done(
          null,
          false,
          req.flash("message", "El nombre de usuario no existe.")
        );
      }
    }
  )
);

passport.use(
  "local.signupC",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true
    },
    async (req, username, password, done) => {
      const { nombre,apellido,telefono,curriculum,estado,correo,foto_conductor} = req.body;

      let newUser = {
        username,
        password,
        correo
      };
      let newDatos={
        nombre,
        apellido,
        telefono,
        curriculum,
        foto_conductor,
        estado
      }

      newUser.password = await helpers.encryptPassword(password);
      // Saving in the Database
      const result = await pool.query("INSERT INTO users SET ? ", newUser);
      //datos del asociados a la base
      await pool.query('INSERT INTO conductores SET ?',newDatos);
      newUser.id = result.insertId;
      return done(null, newUser);
    }
  )
);

passport.use(
  "local.registerC",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true
    },
    async (req, username, password, done) => {
      
      const { nombre,apellido,telefono,curriculum,estado,correo,foto_conductor} = req.body;

      let newDatos={
        nombre,
        apellido,
        telefono,
        curriculum,
        foto_conductor,
        estado,
        username
      }

      let newUser = {
        username,
        password,
        correo
      };
        newUser.password = await helpers.encryptPassword(password);
              // Saving in the Database
        const result = await pool.query("INSERT INTO users SET ? ", newUser);
if (result.errno()==username) {
  return done(null,false,req.flash("success", "ya existe"));
}else{ 
        newUser.id = result.insertId;
        //datos del asociados a la base
        await pool.query('INSERT INTO conductores SET ?',newDatos);
     
        return done(null,false,req.flash("success", "Se ha registrado correctamente, inicie sesión")
        );
      }
    }
  )
);

passport.serializeUser((user, done) => {
  console.log('serializeUser: ' + user.username)
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const rows = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
  done(null, rows[0]);
});