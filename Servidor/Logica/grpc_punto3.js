/*************************************** CONSIGNA ****************************************/
/*
3) Listados

A) Productos: 
    Para usuarios de casa central, se muestran en los listados todos los resultados. 
    Para usuarios de tienda, solo se muestran resultados pertenecientes a su tienda. 
    Campos a mostrar: nombre, código, tienda, talle, color.

B) Usuarios: 
    Campos a mostrar: nombre de usuario, tienda, estado.
    
C) Tiendas: 
    Campos a mostrar: código, estado.
*/

/************************************ CONFIGURACIÓN DE LA BASE DE DATOS **********************************/
const conexionDataBase = require('./conexionDataBase.js');

/********************** DEFINICIÓN DE LA LÓGICA DE LOS MÉTODOS DECLARADOS EN EL ARCHIVO .PROTO ***********************/

// PUNTO 3.A
//  Para usuarios de casa central, listar todos los productos
//  Para usuarios de tienda, listar solo los productos de su tienda
//      Campos a mostrar en ambos casos: nombre, código, tienda, talle, color

async function buscarTodosLosProductos(call, callback) // FUNCIÓN SIN PROBAR
{
    var usuarioQueSolicita = call.request.usuarioQueSolicita;
    //var usuarioQueSolicita = 'El Pepo';    // DATO HARDCODEADO PARA PRUEBAS

    try
    {
        // Compruebo si el usuario que solicita los datos es válido
        var existeUsuario = conexionDataBase.chequearExistenciaUsuario(usuarioQueSolicita);
        var usuarioEsDeCasaCentral = conexionDataBase.chequearCasaCentral(usuarioQueSolicita);
    
        if(existeUsuario && usuarioEsDeCasaCentral)
        {
            var resultados = await conexionDataBase.query(
                `SELECT codigo, nombre, talle, color, tienda_codigo 
                FROM producto 
                INNER JOIN tienda_x_producto
                ON producto.codigo = tienda_x_producto.producto_codigo `, {}
            );
        
            var respuesta = [];
            for(var i = 0; i < resultados.length; i++)
            {
                respuesta[i] = { codigo: resultados[i].codigo, nombre: resultados[i].nombre, talle: resultados[i].talle, color: resultados[i].color, tienda_codigo: resultados[i].tienda_codigo };
            }

            console.log('************************************************************');
            console.log('Consulta solicitada: Listado de productos');
            console.log('Usuario que solicito los datos: ' + usuarioQueSolicita);
            console.log('Datos devueltos al cliente:');
            console.log(respuesta);
            return callback(null, respuesta);
        }

        if(existeUsuario && !usuarioEsDeCasaCentral)
        {
            var resultados = await conexionDataBase.query(
                `SELECT producto.codigo, producto.nombre, producto.talle, producto.color, tienda_x_producto.tienda_codigo 
                FROM producto 
                INNER JOIN tienda_x_producto
                ON producto.codigo = tienda_x_producto.producto_codigo
                WHERE tienda_x_producto.tienda_codigo = 
                    (SELECT usuario.tienda_codigo 
                    FROM usuario 
                    WHERE usuario = ${usuarioQueSolicita} `, {}
            );
        
            var respuesta = [];
            for(var i = 0; i < resultados.length; i++)
            {
                respuesta[i] = { codigo: resultados[i].codigo, nombre: resultados[i].nombre, talle: resultados[i].talle, color: resultados[i].color, tienda_codigo: resultados[i].tienda_codigo };
            }

            console.log('************************************************************');
            console.log('Consulta solicitada: Listado de productos');
            console.log('Usuario que solicito los datos: ' + usuarioQueSolicita);
            console.log('Datos devueltos al cliente:');
            console.log(respuesta);
            return callback(null, respuesta);
        }

        if(!existeUsuario) return callback(null, {mensaje: `ERROR: El usuario ${usuarioQueSolicita} no existe`} );
    }
    catch(error) {console.log(error);}
}

// PUNTO 3.B
// Listar todos los usuarios. Campos a mostrar: nombre de usuario, tienda, estado.

async function buscarTodosLosUsuarios(call, callback)
{
    try
    {
        var resultados = await conexionDataBase.query(
            `SELECT usuario, habilitado, tienda_codigo 
            FROM usuario `, {}
        );
        
        var respuesta = [];
        for(var i = 0; i < resultados.length; i++)
        {
            respuesta[i] = { usuario: resultados[i].usuario, habilitado: resultados[i].habilitado, tienda_codigo: resultados[i].tienda_codigo };
        }
            
        console.log('************************************************************');
        console.log('Consulta solicitada: Listado de usuarios');
        console.log('Datos devueltos al cliente:');
        console.log(respuesta);
        return callback(null, respuesta);
    }
    catch(error) {console.log(error);}
}


// PUNTO 3.C
// Listar todas las tiendas. Campos a mostrar: código, estado.

async function buscarTodasLasTiendas(call, callback)
{
    try
    {
        var resultados = await conexionDataBase.query(
            `SELECT codigo, habilitado 
            FROM tienda `, {}
        );
        
        var respuesta = [];
        for(var i = 0; i < resultados.length; i++)
        {
            respuesta[i] = { codigo: resultados[i].codigo, habilitado: resultados[i].habilitado };
        }
            
        console.log('************************************************************');
        console.log('Consulta solicitada: Listado de tiendas');
        console.log('Datos devueltos al cliente:');
        console.log(respuesta);
        return callback(null, respuesta);
    }
    catch(error) {console.log(error);}
}

/*********************************** EXPORTACIÓN DE LA LÓGICA ***********************************/
exports.buscarTodosLosProductos = buscarTodosLosProductos
exports.buscarTodosLosUsuarios = buscarTodosLosUsuarios
exports.buscarTodasLasTiendas = buscarTodasLasTiendas