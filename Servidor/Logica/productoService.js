/************************************ CONFIGURACIÓN DE LA BASE DE DATOS **********************************/
const conexionDataBase = require('./conexionDataBase.js');

/********************** DEFINICIÓN DE LA LÓGICA DE LOS MÉTODOS DECLARADOS EN EL ARCHIVO .PROTO ***********************/

// Crea un código al azar de 10 caracteres
function generadorCodigo()
{
    var generator = require('generate-password');

    var codigo = generator.generate({
        length: 10,      // Longitud de la contraseña
        numbers: false,  // Incluir números
        symbols: false,  // Incluir símbolos
        uppercase: true, // Incluir letras mayúsculas
        lowercase: true  // Incluir letras minúsculas
    });

    return codigo;
}


async function altaProducto(call, callback) 
{
    console.log('************************************************************');
    console.log('Haciendo alta de producto');

    // Acá van los datos que nos llegan del cliente desde gRPC
    const { nombre, talle, foto, color, tiendaObject } = call.request;
    const codigoProducto = generadorCodigo();
    const listaCodigosTiendas = tiendaObject.map(tienda => tienda.codigo);

    // Chequeo si ya existe el producto
    var resultados = await conexionDataBase.query(
        `SELECT EXISTS(SELECT codigo FROM producto WHERE nombre = ? and talle = ? and color = ?) AS existe`,
        [nombre, talle, color]
    );
    var existeProducto = resultados[0].existe;

    if (existeProducto) // SI EXISTE EL PRODUCTO CON MISMO NOMBRE, TALLE Y COLOR..ARROJA ERROR
    { 
        console.log('Ya existe el producto');
        return callback(null, { mensaje: 'ERROR: Ya existe el producto' });
    } else 
    {
        try // Si no existe el producto, lo creo..y como no esta creado, no va a estar en la tabla intermedia
        { 
            await conexionDataBase.query(
                'INSERT INTO producto (codigo, nombre, talle, foto, color) VALUES (?, ?, ?, ?, ?)',
                [codigoProducto, nombre, talle, foto, color]
            );

            // Uso de Promise.all para asegurar que todas las inserciones se completen
            await Promise.all(
                listaCodigosTiendas.map(tiendaCodigo => {
                    return conexionDataBase.query(
                        'INSERT INTO tienda_x_producto (tienda_codigo, producto_codigo, stock) VALUES (?, ?, ?)',
                        [tiendaCodigo, codigoProducto, 0]
                    );
                })
            );

            console.log('Se hizo el alta de la tienda con los siguientes datos');
            console.log(call.request);
            return callback(null, { mensaje: `Se hizo el alta del producto: ${codigoProducto} ` });
        } 
        catch (error) 
        {
            console.log(error);
            return callback(error);
        }
    }
}




async function buscarProducto(call, callback) {

    try
    {
        // Recibo los datos
        const registro =
        {
            usuarioCentral:         call.request.usuarioCentral,
            codigoProductoABuscar:  call.request.codigoProductoABuscar
        }

        var usuarioCentralEsValido = await conexionDataBase.chequearEsUsuarioValido(registro.usuarioCentral);
        if(usuarioCentralEsValido !== true) return callback(null, { mensaje: usuarioCentralEsValido });

        // Armado de la consulta
        let consultaSQL = `SELECT codigo, nombre, talle, foto, color, tienda_codigo 
                           FROM producto 
                           INNER JOIN tienda_x_producto
                           ON producto.codigo = tienda_x_producto.producto_codigo
                           WHERE 1=1 AND codigo = '${registro.codigoProductoABuscar}' `;

        // Se realiza la consulta
        var resultadosConsulta = await conexionDataBase.query(consultaSQL, {});

        var respuesta = [];
        for(var i = 0; i < resultadosConsulta.length; i++)
        {
            respuesta.push({
                codigo:        resultadosConsulta[i].codigo, 
                nombre:        resultadosConsulta[i].nombre, 
                talle:         resultadosConsulta[i].talle, 
                foto:          resultadosConsulta[i].foto, 
                color:         resultadosConsulta[i].color,
                tienda_codigo: resultadosConsulta[i].tienda_codigo,
            });
        }


        // Muestro los resultados y se los envio al cliente
        console.log('************************************************************');
        console.log('Consultando datos');
        console.log('Consulta solicitada: Buscar producto por código y/o nombre y/o talle y/o color');
        console.log('Codigo producto consultado: ' + registro.codigoProductoABuscar);
        console.log('Datos devueltos al cliente:');
        console.log(respuesta);
        return callback(null, {arregloProductos: respuesta});

    } catch(error) 
    {
        console.log(error);
        return callback(error);
    }

}



/* ESTA DEVUELVE LOS DATO MAL
async function buscarTodosLosProductos(call, callback) 
{
    var usuarioCentral = call.request.usuarioCentral;

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



async function modificarStock(call, callback) {
    
    console.log('************************************************************');
    console.log('Modificando datos');

    // Acá van los datos que nos llegan del cliente desde gRPC
    const registro =
    {
        usuario:         call.request.usuario,
        stock:           call.request.stock,
        producto_codigo: call.request.producto_codigo
    }


    var existeUsuario = await conexionDataBase.chequearExistenciaUsuario(registro.usuario);
    if(!existeUsuario) return callback(null, { mensaje: `ERROR: No existe el usuario ${registro.usuario} ` });


    var existeProducto = await conexionDataBase.chequearExistenciaProducto(registro.producto_codigo);
    if(!existeProducto) return callback(null, { mensaje: `ERROR: No existe el producto ${registro.producto_codigo} ` });


    var resultados = await conexionDataBase.query( // Averiguo a que tienda pertenece el usuario
        `SELECT (tienda.codigo) AS tienda_codigo
        FROM usuario
        INNER JOIN tienda 
        ON usuario.tienda_codigo = tienda.codigo
        WHERE usuario.usuario = '${registro.usuario}' AND usuario.habilitado = 1`, {}
    )
    var usuarioTiendaCodigo = resultados[0].tienda_codigo;

    resultados = await conexionDataBase.query( // Averiguo a que tiendas pertenece el producto
        `SELECT tienda_codigo
        FROM tienda_x_producto
        WHERE producto_codigo = '${registro.producto_codigo}' `, {}
    )
    
    var existenEnLaMismaTienda = false; // Averiguo si el usuario y el producto están en la misma tienda
    for(var i = 0; i < resultados.length; i++) 
    {
        if(usuarioTiendaCodigo == resultados[i].tienda_codigo) existenEnLaMismaTienda = true
    }
    if(!existenEnLaMismaTienda) return callback(null, { mensaje: `ERROR: El usuario y el producto no se encuentran en la misma tienda` });


    if(existeUsuario && existeProducto && existenEnLaMismaTienda)
    {
        console.log('Modificación solicitada: Modificar stock del producto');
        console.log('Producto a modificar: ' + registro.producto_codigo);

        console.log('Datos antes de la modificación');
        resultados = await conexionDataBase.query(
            `SELECT *
            FROM tienda_x_producto
            WHERE tienda_codigo = '${usuarioTiendaCodigo}' AND producto_codigo = '${registro.producto_codigo}' `, {}
        );
        console.log(resultados);


        await conexionDataBase.query( // Actualizo el stock
            `UPDATE tienda_x_producto
            SET stock = ${registro.stock}
            WHERE tienda_codigo = '${usuarioTiendaCodigo}' AND producto_codigo = '${registro.producto_codigo}' `, {}
        )


        console.log('Datos después de la modificación');
        resultados = await conexionDataBase.query(
            `SELECT *
            FROM tienda_x_producto
            WHERE tienda_codigo = '${usuarioTiendaCodigo}' AND producto_codigo = '${registro.producto_codigo}' `, {}
        );
        console.log(resultados);

        return callback(null, { mensaje: `Modificación del stock del producto ${registro.producto_codigo} realizada correctamente` });
    }

}



async function modificarProducto(call, callback)
{
    console.log('************************************************************');
    console.log('Modificando datos');

    try
    {
        // Acá van los datos que nos llegan del cliente desde gRPC
        const registro =
        {
            codigo:             call.request.codigo,
            nombre:             call.request.nombre,
            talle:              call.request.talle,
            foto:               call.request.foto,
            color:              call.request.color
        }
        

        console.log('Datos antes de la modificación');
        resultados = await conexionDataBase.query(
            `SELECT *
            FROM producto
            WHERE codigo = '${registro.codigo}' `, {}
        );
        console.log(resultados);


        await conexionDataBase.query( // Actualizo el producto
            `UPDATE producto
            SET nombre = '${registro.nombre}', talle = '${registro.talle}', foto = '${registro.foto}', color = '${registro.color}'
            WHERE codigo = '${registro.codigo}' `, {}
        )


        console.log('Datos después de la modificación');
        resultados = await conexionDataBase.query(
            `SELECT *
            FROM producto
            WHERE codigo = '${registro.codigo}' `, {}
        );
        console.log(resultados);

        return callback(null, { mensaje: `Modificación del producto ${registro.codigo} realizada correctamente` });
    }
    catch(error) {console.log(error);}

}


/*********************************** EXPORTACIÓN DE LA LÓGICA ***********************************/
exports.altaProducto            = altaProducto
exports.buscarProducto         = buscarProducto
exports.buscarTodosLosProductos = buscarTodosLosProductos
exports.modificarStock          = modificarStock
exports.modificarProducto       = modificarProducto