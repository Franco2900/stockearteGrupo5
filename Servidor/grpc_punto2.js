/*************************************** CONSIGNA ****************************************/
/*
2) Búsquedas

A) Usuarios (solo disponible para usuarios de casa central): se pueden filtrar por nombre de usuario y/o tienda.

B) Tiendas (solo disponible para usuarios de casa central): se pueden filtrar por código y/o estado (habilitada/deshabilitada).

C) Productos: se pueden filtrar por nombre, código, talle, color.
*/

/************************************ CONFIGURACIÓN DE LA BASE DE DATOS **********************************/
const mysql = require('mysql');

var conexion = mysql.createConnection({ // Creo una conexión a la base de datos
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'Stockearte'
})

conexion.connect(function (error) { // Me conecto a la base de datos
  if (error) console.log('Problemas de conexion con mysql')
  else       console.log('Conexión exitosa con la base de datos')
})


// Función para ejecutar un comando SQL y devolver una promesa
function query(comandoSQL, args) 
{
    return new Promise((resolve, reject) => 
    {
        conexion.query(comandoSQL, args, (error, resultados) => 
        {
            if (error) return reject(error);
            resolve(resultados);
        });
    });
}

/********************** DEFINICIÓN DE LA LÓGICA DE LOS MÉTODOS DECLARADOS EN EL ARCHIVO .PROTO ***********************/
// PUNTO 2.A
// Como usuario de casa central: Buscar usuarios. Se pueden filtrar por nombre de usuario y/o tienda.

async function buscarTodosLosUsuarios(/*call, callback*/)
{

    // AGREGAR CHEQUEO PARA QUE LA CONSULTA SOLO SE PUEDA HACER COMO USUARIO DE CASA CENTRAL

    try
    {
        var resultados = await query('SELECT nombre, apellido, nombreUsuario, habilitado, codigoTienda FROM usuarios', {});
        console.log(resultados);
    }
    catch(error) {console.log(error);}
    
    // AGREGAR COMO DEVOLVER TODOS LOS DATOS MEDIANTE GRPC
}


async function buscarUsuarioXNombreUsuario(/*call, callback*/)
{

    // AGREGAR CHEQUEO PARA QUE LA CONSULTA SOLO SE PUEDA HACER COMO USUARIO DE CASA CENTRAL

    // var nombreUsuario = call.request.nombreUsuario;
    var nombreUsuario = 'La Peluca'; // DATO HARDCODEADO PARA PRUEBAS

    try
    {
        var resultados = await query(`SELECT nombre, apellido, nombreUsuario, habilitado, codigoTienda FROM usuarios WHERE nombreUsuario = '${nombreUsuario}' `, {});
        console.log(resultados);
    }
    catch(error) {console.log(error);}
    
    // AGREGAR COMO DEVOLVER TODOS LOS DATOS MEDIANTE GRPC
}


async function buscarUsuarioXCodigoTienda(/*call, callback*/)
{
    // AGREGAR CHEQUEO PARA QUE LA CONSULTA SOLO SE PUEDA HACER COMO USUARIO DE CASA CENTRAL

    //var codigoTienda = call.request.codigoTienda;
    var codigoTienda = 'sanji32542'; // DATO HARDCODEADO PARA PRUEBAS

    try
    {
        var resultados = await query(`SELECT nombre, apellido, nombreUsuario, habilitado, codigoTienda FROM usuarios WHERE codigoTienda = '${codigoTienda}' `, {});
        console.log(resultados);
    }
    catch(error) {console.log(error);}
    
    // AGREGAR COMO DEVOLVER TODOS LOS DATOS MEDIANTE GRPC
}




// PUNTO 2.B
// Como usuario de casa central: Buscar tiendas. Se pueden filtrar por código y/o estado (habilitada/deshabilitada).

async function buscarTodasLasTiendas(/*call, callback*/)
{
    // AGREGAR CHEQUEO PARA QUE LA CONSULTA SOLO SE PUEDA HACER COMO USUARIO DE CASA CENTRAL

    try
    {
        var resultados = await query(`SELECT codigoTienda, direccion, ciudad, provincia, habilitado FROM tiendas`, {});
        console.log(resultados);
    }
    catch(error) {console.log(error);}
    
    // AGREGAR COMO DEVOLVER TODOS LOS DATOS MEDIANTE GRPC
}


async function buscarTiendaXCodigoTienda(/*call, callback*/)
{
    // AGREGAR CHEQUEO PARA QUE LA CONSULTA SOLO SE PUEDA HACER COMO USUARIO DE CASA CENTRAL

    // var codigoTienda = call.request.codigoTienda;
    var codigoTienda = 'asdfgh987'; // DATO HARDCODEADO PARA PRUEBAS

    try
    {
        var resultados = await query(`SELECT codigoTienda, direccion, ciudad, provincia, habilitado FROM tiendas WHERE codigoTienda = '${codigoTienda}' `, {});
        console.log(resultados);
    }
    catch(error) {console.log(error);}
    
    // AGREGAR COMO DEVOLVER TODOS LOS DATOS MEDIANTE GRPC
}


async function buscarTiendaXHabilitado(/*call, callback*/)
{
    // AGREGAR CHEQUEO PARA QUE LA CONSULTA SOLO SE PUEDA HACER COMO USUARIO DE CASA CENTRAL

    // var habilitado = call.request.habilitado;
    var habilitado = 1; // DATO HARDCODEADO PARA PRUEBAS

    try
    {
        var resultados = await query(`SELECT codigoTienda, direccion, ciudad, provincia, habilitado FROM tiendas WHERE habilitado = ${habilitado} `, {});
        console.log(resultados);
    }
    catch(error) {console.log(error);}
    
    // AGREGAR COMO DEVOLVER TODOS LOS DATOS MEDIANTE GRPC
}


// PUNTO 2.C
// Buscar productos. Se pueden filtrar por nombre, código, talle, color.

async function buscarTodosLosProductos(/*call, callback*/)
{
    try
    {
        var resultados = await query('SELECT nombre, codigoProducto, talle, foto, color FROM productos', {});
        console.log(resultados);
    }
    catch(error) {console.log(error);}
    
    // AGREGAR COMO DEVOLVER TODOS LOS DATOS MEDIANTE GRPC
}


async function buscarProductoXNombre(/*call, callback*/)
{
    // var nombre = call.request.nombre;
    var nombre = 'Remera'; // DATO HARDCODEADO PARA PRUEBAS

    try
    {
        var resultados = await query(`SELECT nombre, codigoProducto, talle, foto, color FROM productos WHERE nombre = '${nombre}' `, {});
        console.log(resultados);
    }
    catch(error) {console.log(error);}
    
    // AGREGAR COMO DEVOLVER TODOS LOS DATOS MEDIANTE GRPC
}


async function buscarProductoXCodigo(/*call, callback*/)
{
    // var codigoProducto = call.request.codigoProducto;
    var codigoProducto = 'YOoKyaALaI'; // DATO HARDCODEADO PARA PRUEBAS

    try
    {
        var resultados = await query(`SELECT nombre, codigoProducto, talle, foto, color FROM productos WHERE codigoProducto = '${codigoProducto}' `, {});
        console.log(resultados);
    }
    catch(error) {console.log(error);}
    
    // AGREGAR COMO DEVOLVER TODOS LOS DATOS MEDIANTE GRPC
}


async function buscarProductoXTalle(/*call, callback*/)
{
    // var talle = call.request.talle;
    var talle = 'L'; // DATO HARDCODEADO PARA PRUEBAS

    try
    {
        var resultados = await query(`SELECT nombre, codigoProducto, talle, foto, color FROM productos WHERE talle = '${talle}' `, {});
        console.log(resultados);
    }
    catch(error) {console.log(error);}
    
    // AGREGAR COMO DEVOLVER TODOS LOS DATOS MEDIANTE GRPC
}


async function buscarProductoXColor(/*call, callback*/)
{
    // var color = call.request.color;
    var color = 'Verde'; // DATO HARDCODEADO PARA PRUEBAS

    try
    {
        var resultados = await query(`SELECT nombre, codigoProducto, talle, foto, color FROM productos WHERE color = '${color}' `, {});
        console.log(resultados);
    }
    catch(error) {console.log(error);}
    
    // AGREGAR COMO DEVOLVER TODOS LOS DATOS MEDIANTE GRPC
}


/*********************************** EXPORTACIÓN DE LA LÓGICA ***********************************/
//exports.altaTienda = altaTienda