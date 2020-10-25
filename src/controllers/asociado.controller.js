const asociadoCtrl={}
const database=require('../database/database');


asociadoCtrl.todosAsociados=async(req,res)=>{
    const todo=await database.query('SELECT * FROM asociados');
    res.render('asociados',{todo});
}
asociadoCtrl.perfilAsociado=async(req,res)=>{
    const lista=await database.query('SELECT * FROM asociados WHERE id = ?',[req.user.id]);
    console.log(lista)
    res.render('perfilAsociado',{lista});
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
     res.redirect('/asociado/dato');
}

module.exports=asociadoCtrl;