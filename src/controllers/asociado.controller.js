const asociadoCtrl={}
const database=require('../database/database');

asociadoCtrl.listaServicio=async(req,res)=>{
    const servicio=await database.query('SELECT * FROM servicios');
    console.log(servicio);
    res.render('registroAsociado',{servicio});
    }

asociadoCtrl.todosAsociados=async(req,res)=>{
    const todo=await database.query('SELECT * FROM asociados');
    res.render('asociados',{todo});
}
asociadoCtrl.listaAsociado=async(req,res)=>{
    const perfil=await database.query('SELECT * FROM asociados WHERE id=?',[req.user.id]);
    res.render('perfilAsociado',{perfil});
}

asociadoCtrl.seleccionarAsociado=async(req,res)=>{
    const {id}=req.params;
    const asociado=await database.query('SELECT * FROM asociados WHERE id=?',[id]);
    res.render('editarDatosAsociado',{asociado:asociado[0]});
}

asociadoCtrl.editarAsociado=async(req,res)=>{
    const {id}=req.params;
    const {nombre_empresa,actividad_comercial,direccion,correo,foto_asociado,estado}=req.body;
    const nuevaEdicion={
        nombre_empresa,
        actividad_comercial,
        direccion,
        correo,
        foto_asociado,
        estado
    }
    await database.query('UPDATE asociados set ? WHERE id=?',[nuevaEdicion,id]);
    req.flash('success','Se ha editado sus datos con éxito');
     res.redirect('/asociado/perfil');
}

module.exports=asociadoCtrl;