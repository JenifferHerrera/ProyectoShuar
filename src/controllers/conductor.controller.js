const conductorCtrl={}
const database=require('../database/database');

conductorCtrl.listaConductores=async(req,res)=>{
    const todo=await database.query('SELECT * FROM conductores');
    res.render('conductores',{todo});
}

conductorCtrl.perfilConductor=async(req,res)=>{
    const perfil=await database.query('SELECT * FROM conductores  WHERE username=?',[req.user.username]);
    const lista=await database.query('SELECT * FROM conductores INNER JOIN vehiculos ON conductores.username=vehiculos.id_conductor WHERE conductores.username=?',[req.user.username]);
    res.render('perfilConductor',{perfil,lista});
}

conductorCtrl.seleccionarConductor=async(req,res)=>{
    const {id}=req.params;
    const conductor=await database.query('SELECT * FROM conductores WHERE id=?',[id]);
    res.render('editarDatosConductor',{conductor:conductor[0]});
}

conductorCtrl.editarConductor=async(req,res)=>{
    const {id}=req.params;
    const {nombre,apellido,telefono,curriculum,estado,foto_conductor}=req.body;
    const nuevaEdicion={
        nombre,
        apellido,
        telefono,
        curriculum,
        estado,
        foto_conductor 
    }
    await database.query('UPDATE conductores set ? WHERE id=?', [nuevaEdicion,id]);
    req.flash('success','Se ha editado sus datos personales');
     res.redirect('/conductor/vista');
}

module.exports=conductorCtrl;