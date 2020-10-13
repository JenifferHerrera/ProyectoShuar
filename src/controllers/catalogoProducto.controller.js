const catalogoCtrl={}
const database=require('../database/database');

catalogoCtrl.renderMostrar=(req,res)=>{
    res.render('crearCatalogoProducto');//Crear vista
}

catalogoCtrl.agregarCatProducto=async(req,res)=>{
    const {nombre_producto}=req.body
    const nuevoProducto={
        nombre_producto
    }
    await database.query('INSERT INTO catalogo_producto set ?',[nuevoProducto]);
    req.flash('success','Se ha creadi un nuevo tipo de producto');
     res.redirect('/catalogo/lista');//crear vista
}

catalogoCtrl.listaCatalogo=async(req,res)=>{
    const lista = await database.query('SELECT * FROM catalago_producto');
    res.render('catalogoProducto',{lista});//crear vista catalogoProducto
}

catalogoCtrl.seleccionarProducto=async(req,res)=>{
    const{id}=req.params;
    const todoCatalogo=await database.query('SELECT * FROM catalogo_producto WHERE id_catalogo=?',[id]);
    res.render('editarCatalogoProducto',{catalogo:todoCatalogo[0]});
}

catalogoCtrl.editarCatalogo=async(req,res)=>{//crear la vista editar
    const {id}=req.params;
    const {nombre_producto}=req.body
    const nuevoProducto={
        nombre_producto
    }
    await database.query('UPDATE catalogo_producto set ? WHERE id_catalogo=?',[nuevoProducto,id]);
    req.flash('success','Se ha editado el servicio');
     res.redirect('/catalogo/lista');
}

module.exports=catalogoCtrl;