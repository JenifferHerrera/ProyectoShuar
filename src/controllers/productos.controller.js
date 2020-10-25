const productoCtrl={}
const database=require('../database/database');

productoCtrl.renderMostrar=(req,res)=>{
    res.render('crearProductoAsociado');
}
productoCtrl.agregarProducto=async(req,res)=>{
    const {nombre_producto,valor,fecha_elab,fecha_cadu,cantidad,foto_producto,estado,catalogo_producto}=req.body;
    const nuevoProducto={
        nombre_producto,
        valor,
        fecha_elab,
        fecha_cadu,
        cantidad,
        foto_producto,
        estado,
        catalogo_producto,
        id_asociado: req.user.id 
    }
    await database.query('INSERT INTO productos set ?', [nuevoProducto]);
    req.flash('success','Se ha creado un nuevo producto');
    res.redirect('/producto/lista');
}

productoCtrl.catalogoProducto=async(req,res)=>{
    const catalogo=await database.query('SELECT nombre FROM catalogo_producto');
    console.log(catalogo);
    res.render('crearProductoAsociado',{catalogo});
}

productoCtrl.listaProductos=async(req,res)=>{
    const lista=await database.query('SELECT * FROM productos WHERE id_asociado=?',[req.user.id]);
    res.render('productosAsociados',{lista});
}
productoCtrl.todosLosProductos=async(req,res)=>{
    const todo=await database.query('SELECT * FROM productos');
    res.render('productos',{todo});
}


productoCtrl.seleccionarProducto=async(req,res)=>{
    const {id}=req.params;
    const producto=await database.query('SELECT * FROM productos WHERE id_producto=?',[id]);
    const catalogo=await database.query('SELECT nombre FROM catalogo_producto');
    res.render('editarProductoAsociado',{producto:producto[0],catalogo});
}

productoCtrl.editarProducto=async(req,res)=>{
    const {id}=req.params;
    const {nombre_producto,valor,fecha_elab,fecha_cadu,cantidad,foto_producto,estado,catalogo_producto}=req.body;
    const nuevaEdicion={
        nombre_producto,
        valor,
        fecha_elab,
        fecha_cadu,
        cantidad,
        foto_producto,
        estado,
        catalogo_producto
    }
    await database.query('UPDATE productos set ? WHERE id_producto=?',[nuevaEdicion,id]);
    req.flash('success','Se ha editado el producto');
     res.redirect('/producto/lista');
}

productoCtrl.eliminarProducto=async(req,res)=>{
const {id}=req.params;
await database.query('DELETE FROM productos WHERE id_producto=?',[id]);
req.flash('success','Se ha eliminado el producto');
 res.redirect('/producto/lista');
}

module.exports=productoCtrl;