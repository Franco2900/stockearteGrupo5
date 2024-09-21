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

/* ESTA DEVUELVE LOS DATO MAL
async function buscarTodosLosProductos(call, callback) 
{
    var usuarioCentral = call.request.usuarioCentral;
    //var usuarioCentral = 'El Pepo';    // DATO HARDCODEADO PARA PRUEBAS

    try
    {
        // Compruebo si el usuario que solicita los datos es válido
        var existeUsuario          = await conexionDataBase.chequearExistenciaUsuario(usuarioCentral);
        var usuarioEsDeCasaCentral = await conexionDataBase.chequearCasaCentral(usuarioCentral);
    
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
                respuesta.push({ 
                    codigo:        resultados[i].codigo, 
                    nombre:        resultados[i].nombre, 
                    talle:         resultados[i].talle, 
                    color:         resultados[i].color, 
                    tienda_codigo: resultados[i].tienda_codigo 
                });
            }

            console.log('************************************************************');
            console.log('Consulta solicitada: Listado de productos');
            console.log('Usuario que solicito los datos: ' + usuarioCentral);
            console.log('Datos devueltos al cliente:');
            console.log(respuesta);
            return callback(null, {arregloProductos_2: respuesta} );
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
                    WHERE usuario = '${usuarioCentral}' )`, {}
            );
        
            var respuesta = [];
            for(var i = 0; i < resultados.length; i++)
            {
                respuesta.push({
                    codigo:        resultados[i].codigo, 
                    nombre:        resultados[i].nombre, 
                    talle:         resultados[i].talle, 
                    color:         resultados[i].color, 
                    tienda_codigo: resultados[i].tienda_codigo 
                });
            }

            console.log('************************************************************');
            console.log('Consulta solicitada: Listado de productos');
            console.log('Usuario que solicito los datos: ' + usuarioCentral);
            console.log('Datos devueltos al cliente:');
            console.log(respuesta);
            return callback(null, {arregloProductos_2: respuesta} );
        }

        if(!existeUsuario) return callback(null, {mensaje: `ERROR: El usuario ${usuarioCentral} no existe`} );
    }
    catch(error) {console.log(error);}
}
*/

async function buscarTodosLosProductos(call, callback) 
{
    var usuarioCentral = call.request.usuarioCentral;
    //var usuarioCentral = 'El Pepo';    // DATO HARDCODEADO PARA PRUEBAS

    try
    {
        // Compruebo si el usuario que solicita los datos es válido
        var existeUsuario          = await conexionDataBase.chequearExistenciaUsuario(usuarioCentral);
        var usuarioEsDeCasaCentral = await conexionDataBase.chequearCasaCentral(usuarioCentral);
    
        if(existeUsuario && usuarioEsDeCasaCentral)
        {
            var resultados = await conexionDataBase.query(
                `SELECT p.codigo, p.nombre, p.talle, p.color, subconsulta.tiendas 
                FROM producto p
                JOIN (
                    SELECT tienda_x_producto.producto_codigo, GROUP_CONCAT(tienda_x_producto.tienda_codigo) AS tiendas
                    FROM tienda_x_producto
                    GROUP BY tienda_x_producto.producto_codigo
                ) subconsulta
                ON p.codigo = subconsulta.producto_codigo;`, {}
            );
        
            var respuesta = [];
            for(var i = 0; i < resultados.length; i++)
            {
                var auxArregloCodigosDeTienda = resultados[i].tiendas.split(",").map(codigo => ({ codigoTienda: codigo }));

                respuesta.push({ 
                    codigo:                 resultados[i].codigo, 
                    nombre:                 resultados[i].nombre, 
                    talle:                  resultados[i].talle, 
                    color:                  resultados[i].color, 
                    arregloCodigosDeTienda: auxArregloCodigosDeTienda  
                });
            }

            console.log('************************************************************');
            console.log('Consulta solicitada: Listado de productos');
            console.log('Usuario que solicito los datos: ' + usuarioCentral);
            console.log('Datos devueltos al cliente:');
            console.log(JSON.stringify(respuesta, null, 2));
            return callback(null, {arregloProductos_2: respuesta} );
        }

        if(existeUsuario && !usuarioEsDeCasaCentral)
        {
            var resultados = await conexionDataBase.query(
                `SELECT p.codigo, p.nombre, p.talle, p.color, subconsulta.tiendas 
                FROM producto p
                JOIN (
                    SELECT tienda_x_producto.producto_codigo, GROUP_CONCAT(tienda_x_producto.tienda_codigo) AS tiendas
                    FROM tienda_x_producto
                    GROUP BY tienda_x_producto.producto_codigo
                ) subconsulta
                ON p.codigo = subconsulta.producto_codigo
                WHERE
                    p.codigo IN (
                        SELECT tienda_x_producto.producto_codigo
                        FROM tienda_x_producto
                        WHERE tienda_x_producto.tienda_codigo = (
                            SELECT u.tienda_codigo
                            FROM usuario u
                            WHERE u.usuario = '${usuarioCentral}'
                        )
                    )`, {}
            );
        
            var respuesta = [];
            for(var i = 0; i < resultados.length; i++)
            {
                var auxArregloCodigosDeTienda = resultados[i].tiendas.split(",").map(codigo => ({ codigoTienda: codigo }));

                respuesta.push({
                    codigo:                 resultados[i].codigo, 
                    nombre:                 resultados[i].nombre, 
                    talle:                  resultados[i].talle, 
                    color:                  resultados[i].color, 
                    arregloCodigosDeTienda: auxArregloCodigosDeTienda  
                });
            }

            console.log('************************************************************');
            console.log('Consulta solicitada: Listado de productos');
            console.log('Usuario que solicito los datos: ' + usuarioCentral);
            console.log('Datos devueltos al cliente:');
            console.log(JSON.stringify(respuesta, null, 2));
            return callback(null, {arregloProductos_2: respuesta} );
        }

        if(!existeUsuario) return callback(null, {mensaje: `ERROR: El usuario ${usuarioCentral} no existe`} );
    }
    catch(error) {console.log(error);}
}

// PUNTO 3.B
// Listar todos los usuarios. Campos a mostrar: nombre de usuario, tienda, estado.

async function buscarTodosLosUsuarios(call, callback)
{
    try
    {
        var resultadosConsulta = await conexionDataBase.query(
            `SELECT usuario, password, nombre, apellido, habilitado, tienda_codigo
            FROM usuario `, {}
        );
        
        var respuesta = [];
        for(var i = 0; i < resultadosConsulta.length; i++)
        {
            respuesta.push({
                usuario:       resultadosConsulta[i].usuario, 
                password:      resultadosConsulta[i].password, 
                nombre:        resultadosConsulta[i].nombre, 
                apellido:      resultadosConsulta[i].apellido, 
                habilitado:    resultadosConsulta[i].habilitado, 
                tienda_codigo: resultadosConsulta[i].tienda_codigo
            });
        }
            
        console.log('************************************************************');
        console.log('Consulta solicitada: Listado de usuarios');
        console.log('Datos devueltos al cliente:');
        console.log(respuesta);
        return callback(null, {arregloUsuarios: respuesta} );
    }
    catch(error) {console.log(error);}
}


// PUNTO 3.C
// Listar todas las tiendas. Campos a mostrar: código, estado.

async function buscarTodasLasTiendas(call, callback)
{
    try
    {
        var resultadosConsulta = await conexionDataBase.query(
            `SELECT codigo, direccion, ciudad, provincia, habilitado, central 
            FROM tienda `, {}
        );
        
        var respuesta = [];
        for(var i = 0; i < resultadosConsulta.length; i++)
        {
            respuesta.push({
                codigo:     resultadosConsulta[i].codigo, 
                direccion:  resultadosConsulta[i].direccion, 
                ciudad:     resultadosConsulta[i].ciudad, 
                provincia:  resultadosConsulta[i].provincia, 
                habilitado: Boolean(resultadosConsulta[i].habilitado), 
                central:    Boolean(resultadosConsulta[i].central)
            });
        }
            
        console.log('************************************************************');
        console.log('Consulta solicitada: Listado de tiendas');
        console.log('Datos devueltos al cliente:');
        console.log(respuesta);
        return callback(null, {arregloTiendas: respuesta} );
    }
    catch(error) {console.log(error);}
}

/*********************************** EXPORTACIÓN DE LA LÓGICA ***********************************/
exports.buscarTodosLosProductos = buscarTodosLosProductos
exports.buscarTodosLosUsuarios = buscarTodosLosUsuarios
exports.buscarTodasLasTiendas = buscarTodasLasTiendas