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
    var usuarioCentral = call.request.usuarioCentral;
    var usuarioABuscar = call.request.usuarioABuscar;
    //var usuarioCentral = 'Racing Campeon';    // DATO HARDCODEADO PARA PRUEBAS
    //var usuarioABuscar = 'La Peluca';         // DATO HARDCODEADO PARA PRUEBAS

    try
    {
        // Compruebo si el usuario que solicita los datos es válido
        var usuarioCentralEsValido = conexionDataBase.chequearEsUsuarioValido(usuarioCentral);
        if(usuarioCentralEsValido !== true) return callback(null, { mensaje: usuarioCentralEsValido });
         
        // Compruebo si el usuario a buscar es válido
        var existeUsuarioABuscar = await conexionDataBase.chequearExistenciaUsuario(usuarioABuscar);
        if(!existeUsuarioABuscar) 
        {
            var mensajeDeError = `ERROR: No existe el usuario del que se buscan datos: ${usuarioABuscar}`; 
            console.log(mensajeDeError);
            return callback(null, { mensaje: mensajeDeError });
        }

        // Si todo esta OK
        if(usuarioCentralEsValido && existeUsuarioABuscar) 
        {
            var resultados = await conexionDataBase.query(
                `SELECT usuario, password, nombre, apellido, habilitado, tienda_codigo 
                FROM usuario 
                WHERE usuario = '${usuarioABuscar}' `, {}
            );
        
            var respuesta = { usuario: resultados[0].usuario, password: resultados[0].password, nombre: resultados[0].nombre, apellido: resultados[0].apellido, habilitado: resultados[0].habilitado, tienda_codigo: resultados[0].tienda_codigo };
            
            console.log('************************************************************');
            console.log('Consultando datos');
            console.log('Consulta solicitada: Buscar usuario por su nombre de usuario');
            console.log('Usuario que solicito los datos: ' + usuarioCentral);
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
    var usuarioCentral = call.request.usuarioCentral;
    var tiendaABuscar  = call.request.tiendaABuscar;
    //var usuarioCentral = 'El Pepo';    // DATO HARDCODEADO PARA PRUEBAS
    //var tiendaABuscar  = 'asdfgh987';  // DATO HARDCODEADO PARA PRUEBAS

    try
    {
        // Compruebo si el usuario que solicita los datos es válido
        var usuarioCentralEsValido = conexionDataBase.chequearEsUsuarioValido(usuarioCentral);
        if(usuarioCentralEsValido !== true) return callback(null, { mensaje: usuarioCentralEsValido });
        
        // Compruebo si la tienda a buscar es válida
        var existeTiendaABuscar = await conexionDataBase.chequearExistenciaTienda(tiendaABuscar);
        if(!existeTiendaABuscar)
        {
            var mensajeDeError = `ERROR: No existe la tienda: ${tiendaABuscar}`; 
            console.log(mensajeDeError);
            return callback(null, { mensaje: mensajeDeError });
        }

        // Si todo esta OK
        if(usuarioCentralEsValido && existeTiendaABuscar) 
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
            console.log('Consultando datos');
            console.log('Consulta solicitada: Buscar usuario por codigo de tienda');
            console.log('Usuario que solicito los datos: ' + usuarioCentral);
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

async function buscarTienda_X_TiendaCodigo(call, callback)
{
    var usuarioCentral = call.request.usuarioCentral;
    var tiendaABuscar  = call.request.tiendaABuscar;
    //var usuarioCentral = 'El Pepo';    // DATO HARDCODEADO PARA PRUEBAS
    //var tiendaABuscar  = 'asdfgh987';  // DATO HARDCODEADO PARA PRUEBAS

    try
    {
        // Compruebo si el usuario que solicita los datos es válido
        var usuarioCentralEsValido = conexionDataBase.chequearEsUsuarioValido(usuarioCentral);
        if(usuarioCentralEsValido !== true) return callback(null, { mensaje: usuarioCentralEsValido });
         
        // Compruebo si la tienda a buscar es válida
        var existeTiendaABuscar = await conexionDataBase.chequearExistenciaTienda(tiendaABuscar);
        if(!existeTiendaABuscar)
        {
            var mensajeDeError = `ERROR: No existe la tienda: ${tiendaABuscar}`; 
            console.log(mensajeDeError);
            return callback(null, { mensaje: mensajeDeError });
        }

        // Si todo esta OK
        if(usuarioCentralEsValido && existeTiendaABuscar) 
        {
            var resultados = await conexionDataBase.query(
                `SELECT codigo, direccion, ciudad, provincia, habilitado, central
                FROM tienda 
                WHERE codigo = '${tiendaABuscar}' `, {}
            );
        
            var respuesta = { codigo: resultados[0].codigo, direccion: resultados[0].direccion, ciudad: resultados[0].ciudad, provincia: resultados[0].provincia, habilitado: resultados[0].habilitado, central: resultados[0].central };
            
            console.log('************************************************************');
            console.log('Consultando datos');
            console.log('Consulta solicitada: Buscar tienda por su codigo');
            console.log('Usuario que solicito los datos: ' + usuarioCentral);
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
    var usuarioCentral = call.request.usuarioCentral;
    var habilitado     = call.request.habilitado;
    //var usuarioCentral = 'El Pepo';  // DATO HARDCODEADO PARA PRUEBAS
    //var habilitado     = true;       // DATO HARDCODEADO PARA PRUEBAS

    try
    {
        // Compruebo si el usuario que solicita los datos es válido
        var usuarioCentralEsValido = conexionDataBase.chequearEsUsuarioValido(usuarioCentral);
        if(usuarioCentralEsValido !== true) return callback(null, { mensaje: usuarioCentralEsValido });

        // Si todo esta OK
        if(usuarioCentralEsValido) 
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
            console.log('Consultando datos');
            console.log('Consulta solicitada: Buscar tienda por habilitado');
            console.log('Usuario que solicito los datos: ' + usuarioCentral);
            console.log('Habilitado consultado: ' + habilitado);
            console.log('Datos devueltos al cliente:');
            console.log(respuesta);
            return callback(null, respuesta);
        }
    
    }
    catch(error) {console.log(error);}

}


// PUNTO 2.C
// Buscar productos. Se pueden filtrar por nombre, código, talle, color.
// NOTA: ESTAS BÚSQUEDAS NO PIDEN CHEQUEO DE USUARIO CENTRAL

async function buscarProducto_X_Nombre(call, callback)
{
    var nombre = call.request.nombre;
    //var nombre = 'Camisa Básica'; // DATO HARDCODEADO PARA PRUEBAS

    try
    {
        var resultados = await conexionDataBase.query(
            `SELECT codigo, nombre, talle, foto, color
            FROM producto
            WHERE nombre = '${nombre}' `, {}
        );

        // Puede haber muchos productos con el mismo nombre pero en distinto talle o color
        var respuesta = [];
        for(var i = 0; i < resultados.length; i++)
        {
            respuesta[i] = { codigo: resultados[i].codigo, nombre: resultados[i].nombre, talle: resultados[i].talle, foto: resultados[i].foto, color: resultados[i].color };
        }

        console.log('************************************************************');
        console.log('Consultando datos');
        console.log('Consulta solicitada: Buscar producto por nombre');
        console.log('Nombre consultado: ' + nombre);
        console.log('Datos devueltos al cliente:');
        console.log(respuesta);
        return callback(null, respuesta);

    }
    catch(error) {console.log(error);}
    
}


async function buscarProducto_X_Codigo(call, callback)
{
    var codigo = call.request.codigo;
    //var codigo = 'PJ456'; // DATO HARDCODEADO PARA PRUEBAS

    try
    {
        var resultados = await conexionDataBase.query(
            `SELECT codigo, nombre, talle, foto, color
            FROM producto
            WHERE codigo = '${codigo}' `, {}
        );

        // Solo puede haber un producto con dicho codigo
        var respuesta = { codigo: resultados[0].codigo, nombre: resultados[0].nombre, talle: resultados[0].talle, foto: resultados[0].foto, color: resultados[0].color };

        console.log('************************************************************');
        console.log('Consultando datos');
        console.log('Consulta solicitada: Buscar producto por codigo');
        console.log('Codigo consultado: ' + codigo);
        console.log('Datos devueltos al cliente:');
        console.log(respuesta);
        return callback(null, respuesta);

    }
    catch(error) {console.log(error);}
}


async function buscarProducto_X_Talle(call, callback)
{
    var talle = call.request.talle;
    //var talle = 'L'; // DATO HARDCODEADO PARA PRUEBAS

    try
    {
        var resultados = await conexionDataBase.query(
            `SELECT codigo, nombre, talle, foto, color
            FROM producto
            WHERE talle = '${talle}' `, {}
        );

        // Puede haber muchos productos con el mismo talle
        var respuesta = [];
        for(var i = 0; i < resultados.length; i++)
        {
            respuesta[i] = { codigo: resultados[i].codigo, nombre: resultados[i].nombre, talle: resultados[i].talle, foto: resultados[i].foto, color: resultados[i].color };
        }

        console.log('************************************************************');
        console.log('Consultando datos');
        console.log('Consulta solicitada: Buscar producto por talle');
        console.log('Talle consultado: ' + talle);
        console.log('Datos devueltos al cliente:');
        console.log(respuesta);
        return callback(null, respuesta);

    }
    catch(error) {console.log(error);}
}


async function buscarProducto_X_Color(call, callback)
{
    var color = call.request.color;
    //var color = 'Rojo'; // DATO HARDCODEADO PARA PRUEBAS

    try
    {
        var resultados = await conexionDataBase.query(
            `SELECT codigo, nombre, talle, foto, color
            FROM producto
            WHERE color = '${color}' `, {}
        );

        // Puede haber muchos productos con el mismo color
        var respuesta = [];
        for(var i = 0; i < resultados.length; i++)
        {
            respuesta[i] = { codigo: resultados[i].codigo, nombre: resultados[i].nombre, talle: resultados[i].talle, foto: resultados[i].foto, color: resultados[i].color };
        }

        console.log('************************************************************');
        console.log('Consultando datos');
        console.log('Consulta solicitada: Buscar producto por color');
        console.log('Color consultado: ' + color);
        console.log('Datos devueltos al cliente:');
        console.log(respuesta);
        return callback(null, respuesta);

    }
    catch(error) {console.log(error);}
}


/*********************************** EXPORTACIÓN DE LA LÓGICA ***********************************/
exports.buscarUsuario_X_Usuario = buscarUsuario_X_Usuario
exports.buscarUsuario_X_TiendaCodigo = buscarUsuario_X_TiendaCodigo

exports.buscarTienda_X_TiendaCodigo = buscarTienda_X_TiendaCodigo
exports.buscarTienda_X_Habilitado = buscarTienda_X_Habilitado

exports.buscarProducto_X_Nombre = buscarProducto_X_Nombre
exports.buscarProducto_X_Codigo = buscarProducto_X_Codigo
exports.buscarProducto_X_Talle = buscarProducto_X_Talle
exports.buscarProducto_X_Color = buscarProducto_X_Color