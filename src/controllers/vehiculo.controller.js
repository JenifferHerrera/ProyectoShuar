const vehiculoCtrl={}
const database=require('../database/database');

vehiculoCtrl.agregarVehiculo=async(req,res)=>{
    const {num_placa,modelo,marca,ano_vehiculo,color,foto_vehiculo,estado,tipo_vehiculo}=req.body;
    const nuevoVehiculo={
        num_placa,
        modelo,
        marca,
        ano_vehiculo,
        color,
        foto_vehiculo,
        estado,
        tipo_vehiculo,
        id_conductor: req.user.id
    }
    await database.query('INSERT INTO vehiculos set ?',[nuevoVehiculo]);
    req.flash('success','Se han agregado los datos de su vehiculo');
    res.redirect('/conductor/vista');
}

vehiculoCtrl.listaTipoVehiculo=async(req,res)=>{
const lista=await database.query('SELECT nombre_tipo_vehiculo FROM tipo_vehiculo');
console.log(lista);
res.render('registroVehiculo',{lista});
}

vehiculoCtrl.seleccionarVehiculo=async(req,res)=>{
    const {id}=req.params;
    const vehiculos=await database.query('SELECT * FROM vehiculos WHERE id_vehiculo=?',[id]);
    const lista=await database.query('SELECT nombre_tipo_vehiculo FROM tipo_vehiculo');
    res.render('editarVehiculo',{vehiculo:vehiculos[0],lista});
}

vehiculoCtrl.editarVehiculo=async(req,res)=>{
    const{id}=req.params;
    const {num_placa,modelo,marca,ano_vehiculo,color,foto_vehiculo,estado,tipo_vehiculo}=req.body;
    const nuevoVehiculo={
        num_placa,
        modelo,
        marca,
        ano_vehiculo,
        color,
        foto_vehiculo,
        estado,
        tipo_vehiculo
    }
    await database.query('UPDATE vehiculos set ? WHERE id_vehiculo=?',[nuevoVehiculo,id]);
    req.flash('success','Se ha editado los datos del vehiculo');
     res.redirect('/conductor/vista');
}

vehiculoCtrl.eliminarVehiculo=async(req,res)=>{
    const {id}=req.params;
    const vehiculo= await database.query('DELETE FROM vehiculos WHERE id_vehiculo=?',[id]);
    req.flash('success','Se ha eliminado los datos de su vehiculo');
     res.redirect('/conductor/vista');
}
module.exports=vehiculoCtrl;