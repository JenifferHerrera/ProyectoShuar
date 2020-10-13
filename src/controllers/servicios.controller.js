const servicioCtrl={}
const database=require('../database/database');

servicioCtrl.renderMostrar=(req,res)=>{
    res.render('crearServicio');
}
servicioCtrl.agregarServicio=async(req,res)=>{
    const{imagen,estado,nombre}=req.body
    const nuevoServicio={
        imagen,
        nombre,
        estado,
        id_usuario:req.user.id
    }
    await database.query('INSERT INTO servicios set ?',[nuevoServicio]);
    req.flash('success','Se ha creado un nuevo servicio');
     res.redirect('/servicio/lista');
}

servicioCtrl.listaServicios= async(req,res)=>{
    const lista=await database.query('SELECT * FROM servicios WHERE id_usuario=?',[req.user.id]);
    res.render('servicios',{lista});
}

servicioCtrl.seleccionarServicio=async(req,res)=>{
    const {id}=req.params;
    const todoServicios=await database.query('SELECT * FROM servicios WHERE id_servicio=?',[id]);
    res.render('editarServicio',{servicio:todoServicios[0]});
}

servicioCtrl.editarServicio=async(req,res)=>{
    const {id}=req.params;
    const{imagen,estado,nombre}=req.body;
    const nuevoEdicion={
        imagen,
        estado,
        nombre
    }
    await database.query('UPDATE servicios set ? WHERE id_servicio=?',[nuevoEdicion,id]);
    req.flash('success','Se ha editado el servicio');
    res.redirect('/servicio/lista');
}

module.exports=servicioCtrl;