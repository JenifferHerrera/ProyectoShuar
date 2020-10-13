const tipoCtrl={}
const database=require('../database/database');

tipoCtrl.renderMostrar=(req,res)=>{
    res.render('crearTipoVehiculo');//crear la vista
}

tipoCtrl.agregarTipoVehiculo=async(req,res)=>{
    const {nombre_tipo_vehiculo}=req.body;
    const nuevoTipo={
        nombre_tipo_vehiculo
    }
    await database.query('INSERT INTO tipo_vehiculo set ?',[nuevoTipo]);
    req.flash('success','Se ha creado un nuevo tipo de vehiculo');
     res.redirect('/tipo/lista');
}

tipoCtrl.listaTipoVehiculo=async(req,res)=>{
    const lista=await database.query('SELECT * FROM tipo_vehiculo');
    res.render('tipoVehiculo',{lista});//crear las vista de todos los tipos de vehiculo
}

tipoCtrl.seleccionarTipoVehiculo=async(req,res)=>{
    const {id}=req.params;
    const todoTipo=await database.query('SELECT * FROM tipo_vehiculo WHERE id_tipo_ve=?',[id]);
    res.render('editarTipoVehiculo',{tipo:todoTipo[0]});
}

tipoCtrl.editarTipoVehiculo=async(req,res)=>{
    const {id}=req.params;
    const {nombre_tipo_vehiculo}=req.body;
    const nuevoTipo={
        nombre_tipo_vehiculo
    }
    await database.query('UPDATE tipo_vehiculo set ? WHERE id_tipo_ve=?',[nuevoTipo,id]);
    req.flash('success','Se ha editado el tipo del catalogo');
     res.redirect('/tipo/lista');
}

module.exports=tipoCtrl;
