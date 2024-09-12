/*************************************** CONSIGNA ****************************************/
/*
2) Búsquedas

A) Usuarios (solo disponible para usuarios de casa central): se pueden filtrar por nombre de usuario y/o tienda.

B) Tiendas (solo disponible para usuarios de casa central): se pueden filtrar por código y/o estado (habilitada/deshabilitada).

C) Productos: se pueden filtrar por nombre, código, talle, color.
*/

/************************************ CONFIGURACIÓN DE LA BASE DE DATOS **********************************/
const conexionDataBase = require('./conexionDataBase.js');

/********************** DEFINICIÓN DE LA LÓGICA DE LOS MÉTODOS DECLARADOS EN EL ARCHIVO .PROTO ***********************/

// PUNTO 2.A
// Como usuario de casa central: Buscar usuarios por nombre de usuario y/o tienda.

async function buscarUsuario_X_Usuario(call, callback)
{
    var usuarioQueSolicita = call.request.usuarioQueSolicita;
    var usuarioABuscar     = call.request.usuarioABuscar;
    //var usuarioQueSolicita = 'El Pepo';    // DATO HARDCODEADO PARA PRUEBAS
    //var usuarioABuscar     = 'La Peluca';  // DATO HARDCODEADO PARA PRUEBAS

    try
    {
        // Compruebo si el usuario que solicita los datos es válido
        var usuarioQueSolicitaEsValido = conexionDataBase.chequearEsUsuarioValido(usuarioQueSolicita);
        if(usuarioQueSolicitaEsValido !== true) return callback(null, { mensaje: usuarioQueSolicitaEsValido });
         
        // Compruebo si el usuario a buscar es válido
        var existeUsuarioABuscar = await conexionDataBase.chequearExistenciaUsuario(usuarioABuscar);
        if(!existeUsuarioABuscar) 
        {
            var mensajeDeError = `ERROR: No existe el usuario del que se buscan datos: ${usuarioABuscar}`; 
            console.log(mensajeDeError);
            return callback(null, { mensaje: mensajeDeError });
        }

        // Si todo esta OK
        if(usuarioQueSolicitaEsValido && existeUsuarioABuscar) 
        {
            var resultados = await conexionDataBase.query(
                `SELECT usuario, password, nombre, apellido, habilitado, tienda_codigo 
                FROM usuario 
                WHERE usuario = '${usuarioABuscar}' `, {}
            );
        
            var respuesta = { usuario: resultados[0].usuario, password: resultados[0].password, nombre: resultados[0].nombre, apellido: resultados[0].apellido, habilitado: resultados[0].habilitado, tienda_codigo: resultados[0].tienda_codigo };
            
            console.log('************************************************************');
            console.log('Consulta solicitada: Buscar usuario por su nombre de usuario');
            console.log('Usuario que solicito los datos: ' + usuarioQueSolicita);
            console.log('Usuario que consulto: ' + usuarioABuscar);
            console.log('Datos devueltos al cliente:');
            console.log(respuesta);
            return callback(null, respuesta);
        }
    
    }
    catch(error) {console.log(error);}

}


async function buscarUsuario_X_TiendaCodigo(call, callback)
{
    var usuarioQueSolicita = call.request.usuarioQueSolicita;
    var tiendaABuscar      = call.request.tiendaABuscar;
    //var usuarioQueSolicita = 'El Pepo';    // DATO HARDCODEADO PARA PRUEBAS
    //var tiendaABuscar      = 'asdfgh987';  // DATO HARDCODEADO PARA PRUEBAS

    try
    {
        // Compruebo si el usuario que solicita los datos es válido
        var usuarioQueSolicitaEsValido = conexionDataBase.chequearEsUsuarioValido(usuarioQueSolicita);
        if(usuarioQueSolicitaEsValido !== true) return callback(null, { mensaje: usuarioQueSolicitaEsValido });
        
        // Compruebo si la tienda a buscar es válida
        var existeTiendaABuscar = await conexionDataBase.chequearExistenciaTienda(tiendaABuscar);
        if(!existeTiendaABuscar)
        {
            var mensajeDeError = `ERROR: No existe la tienda: ${tiendaABuscar}`; 
            console.log(mensajeDeError);
            return callback(null, { mensaje: mensajeDeError });
        }

        // Si todo esta OK
        if(usuarioQueSolicitaEsValido && existeTiendaABuscar) 
        {
            var resultados = await conexionDataBase.query(
                `SELECT usuario, password, nombre, apellido, habilitado, tienda_codigo 
                FROM usuario 
                WHERE tienda_codigo = '${tiendaABuscar}' `, {}
            );

            // ACÁ CAMBIA CON RESPECTO A LA FUNCIÓN ANTERIOR PORQUE UNA TIENDA PUEDE TENER MUCHOS USUARIOS
            var respuesta = [];
            for(var i = 0; i < resultados.length; i++)
            {
                respuesta[i] = { usuario: resultados[i].usuario, password: resultados[i].password, nombre: resultados[i].nombre, apellido: resultados[i].apellido, habilitado: resultados[i].habilitado, tienda_codigo: resultados[i].tienda_codigo };
            }

            console.log('************************************************************');
            console.log('Consulta solicitada: Buscar usuario por codigo de tienda');
            console.log('Usuario que solicito los datos: ' + usuarioQueSolicita);
            console.log('Tienda que consulto: ' + tiendaABuscar);
            console.log('Datos devueltos al cliente:');
            console.log(respuesta);
            return callback(null, respuesta);
        }
    
    }
    catch(error) {console.log(error);}

}


// PUNTO 2.B
// Como usuario de casa central: Buscar tiendas por código y/o estado (habilitada/deshabilitada).

async function buscarTienda_X_TiendaCodigo(/*call, callback*/)
{
    var usuarioQueSolicita = call.request.usuarioQueSolicita;
    var tiendaABuscar      = call.request.tiendaABuscar;
    //var usuarioQueSolicita = 'El Pepo';    // DATO HARDCODEADO PARA PRUEBAS
    //var tiendaABuscar      = 'asdfgh987';  // DATO HARDCODEADO PARA PRUEBAS

    try
    {
        // Compruebo si el usuario que solicita los datos es válido
        var usuarioQueSolicitaEsValido = conexionDataBase.chequearEsUsuarioValido(usuarioQueSolicita);
        if(usuarioQueSolicitaEsValido !== true) return callback(null, { mensaje: usuarioQueSolicitaEsValido });
         
        // Compruebo si la tienda a buscar es válida
        var existeTiendaABuscar = await conexionDataBase.chequearExistenciaTienda(tiendaABuscar);
        if(!existeTiendaABuscar)
        {
            var mensajeDeError = `ERROR: No existe la tienda: ${tiendaABuscar}`; 
            console.log(mensajeDeError);
            return callback(null, { mensaje: mensajeDeError });
        }

        // Si todo esta OK
        if(usuarioQueSolicitaEsValido && existeTiendaABuscar) 
        {
            var resultados = await conexionDataBase.query(
                `SELECT codigo, direccion, ciudad, provincia, habilitado, central
                FROM tienda 
                WHERE codigo = '${tiendaABuscar}' `, {}
            );
        
            var respuesta = { codigo: resultados[0].codigo, direccion: resultados[0].direccion, ciudad: resultados[0].ciudad, provincia: resultados[0].provincia, habilitado: resultados[0].habilitado, central: resultados[0].central };
            
            console.log('************************************************************');
            console.log('Consulta solicitada: Buscar tienda por su codigo');
            console.log('Usuario que solicito los datos: ' + usuarioQueSolicita);
            console.log('Tienda que consulto: ' + tiendaABuscar);
            console.log('Datos devueltos al cliente:');
            console.log(respuesta);
            return callback(null, respuesta);
        }
    
    }
    catch(error) {console.log(error);}

}


async function buscarTienda_X_Habilitado(call, callback)
{
    var usuarioQueSolicita = call.request.usuarioQueSolicita;
    var habilitado         = call.request.habilitado;
    //var usuarioQueSolicita = 'El Pepo';  // DATO HARDCODEADO PARA PRUEBAS
    //var habilitado         = true;       // DATO HARDCODEADO PARA PRUEBAS

    try
    {
        // Compruebo si el usuario que solicita los datos es válido
        var usuarioQueSolicitaEsValido = conexionDataBase.chequearEsUsuarioValido(usuarioQueSolicita);
        if(usuarioQueSolicitaEsValido !== true) return callback(null, { mensaje: usuarioQueSolicitaEsValido });

        // Si todo esta OK
        if(usuarioQueSolicitaEsValido) 
        {
            var resultados = await conexionDataBase.query(
                `SELECT codigo, direccion, ciudad, provincia, habilitado, central
                FROM tienda
                WHERE habilitado = ${habilitado} `, {}
            );

            // Puede haber muchas tiendas
            var respuesta = [];
            for(var i = 0; i < resultados.length; i++)
            {
                respuesta[i] = { codigo: resultados[i].codigo, direccion: resultados[i].direccion, ciudad: resultados[i].ciudad, provincia: resultados[i].provincia, habilitado: resultados[i].habilitado, central: resultados[i].central };
            }

            console.log('************************************************************');
            console.log('Consulta solicitada: Buscar tienda por habilitado');
            console.log('Usuario que solicito los datos: ' + usuarioQueSolicita);
            console.log('Habilitado consultado: ' + habilitado);
            console.log('Datos devueltos al cliente:');
            console.log(respuesta);
            return callback(null, respuesta);
        }
    
    }
    catch(error) {console.log(error);}

}

// NOTA: OPTIMIZAR LO DE ARRIBA

// FUNCIONES INCOMPLETAS
// PUNTO 2.C
// Buscar productos. Se pueden filtrar por nombre, código, talle, color.

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
exports.buscarUsuario_X_Usuario = buscarUsuario_X_Usuario
exports.buscarUsuario_X_TiendaCodigo = buscarUsuario_X_TiendaCodigo

exports.buscarTienda_X_TiendaCodigo = buscarTienda_X_TiendaCodigo
exports.buscarTienda_X_Habilitado = buscarTienda_X_Habilitado