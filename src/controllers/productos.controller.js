const productoCtrl={}
const database=require('../database/database');

productoCtrl.renderMostrar=(req,res)=>{
    res.render('crearProductoAsociados');
}
productoCtrl.agregarProducto=async(req,res)=>{
    const {nombre_producto,valor,fecha_elab,fecha_cadu,cantidad,foto_producto,estado}=req.body;
    const nuevoProducto={
        nombre_producto,
        valor,
        fecha_elab,
        fecha_cadu,
        cantidad,
        foto_producto,
        estado,
        catalogo_producto:req.catalogo.id,//el nombre categoria de productos
        id_asociado:req.user.id //Id del asociado
    }
    await database.query('INSERT INTO servicios set ?', [nuevoProducto]);
    req.flash('success','Se ha creado un nuevo producto');
    res.redirect('/producto/lista');
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
    const todoProducto=await database.query('SELECT * FROM productos WHERE id_producto=?',[id]);
    res.render('editarProductoAsociado',{producto:todoProducto[0]});
}

productoCtrl.editarProducto=async(req,res)=>{
    const {id}=req.params;
    const {nombre_producto,valor,fecha_elab,fecha_cadu,cantidad,foto_producto,estado}=req.body;
    const nuevaEdicion={
        nombre_producto,
        valor,
        fecha_elab,
        fecha_cadu,
        cantidad,
        foto_producto,
        estado
    }
    await database.query('UPDATE productos set ? WHERE id_producto=?',[nuevaEdicion,id]);
    req.flash('success','Se ha editado el producto');
     res.redirect('/producto/lista');
}

module.exports=productoCtrl;