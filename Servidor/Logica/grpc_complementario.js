const conexionDataBase = require('./conexionDataBase.js');

async function traerUsuarioPorId(call, callback)
{
    console.log('************************************************************');
    console.log('Buscando usuario');

    const id = call.request.id;

    try
    {
        var resultadosConsulta = await conexionDataBase.query(`SELECT usuario, password, nombre, apellido, habilitado, tienda_codigo FROM usuario where id = ${id}`, {});
        
        var respuesta = {
            usuario:       resultadosConsulta[0].usuario, 
            password:      resultadosConsulta[0].password, 
            nombre:        resultadosConsulta[0].nombre, 
            apellido:      resultadosConsulta[0].apellido, 
            habilitado:    Boolean(resultadosConsulta[0].habilitado), 
            tienda_codigo: resultadosConsulta[0].tienda_codigo
        };
        
        
        console.log('************************************************************');
        console.log('Consulta solicitada: Busqueda de usuario por ID');
        console.log('Datos devueltos al cliente:');
        console.log(respuesta);
        return callback(null, respuesta );       
    }
    catch(error) 
    {
        console.log(error);
        return callback(error);
    }
}



async function traerTiendaPorCodigo(call, callback)
{
    console.log('************************************************************');
    console.log('Buscando tienda');

    const cod = call.request.codigo;

    try
    {
        var resultadosConsulta = await conexionDataBase.query(`SELECT codigo, direccion, ciudad, provincia, habilitado, central FROM tienda where codigo = '${cod}'`, {});

        var respuesta = {
            codigo:     resultadosConsulta[0].codigo, 
            direccion:  resultadosConsulta[0].direccion, 
            ciudad:     resultadosConsulta[0].ciudad, 
            provincia:  resultadosConsulta[0].provincia, 
            habilitado: Boolean(resultadosConsulta[0].habilitado), 
            central:    resultadosConsulta[0].central
        };
    
    
        console.log('************************************************************');
        console.log('Consulta solicitada: Busqueda de tienda por codigo');
        console.log('Datos devueltos al cliente:');
        console.log(respuesta);
        return callback(null, respuesta );
    }
    catch(error) 
    {
        console.log(error);
        return callback(error);
    }
}


async function traerProductoPorCodigo(call, callback)
{
    console.log('************************************************************');
    console.log('Buscando producto');

    const cod = call.request.codigo;

    try
    {
        var resultadosConsulta = await conexionDataBase.query(`SELECT codigo, nombre, talle, color FROM producto where codigo = '${cod}'`, {});
        var respuesta = {
            codigo:  resultadosConsulta[0].codigo, 
            nombre:  resultadosConsulta[0].nombre, 
            talle:   resultadosConsulta[0].talle, 
            color:   resultadosConsulta[0].color
        };
    
    
        console.log('************************************************************');
        console.log('Consulta solicitada: Busqueda de producto por codigo');
        console.log('Datos devueltos al cliente:');
        console.log(respuesta);
        return callback(null, respuesta );
    }
    catch(error) 
    {
        console.log(error);
        return callback(error);
    }
}


async function hacerLogin(call, callback)
{
    console.log('************************************************************');
    console.log('Haciendo Login');

    var usuario  = call.request.usuario;
    var password = call.request.password;

    try
    {
        var resultadosConsulta = await conexionDataBase.query(`SELECT u.usuario, u.password, u.nombre, u.apellido, u.habilitado, u.tienda_codigo, t.central 
                                                               FROM usuario u
                                                               INNER JOIN tienda t
                                                               ON u.tienda_codigo = t.codigo
                                                               WHERE u.usuario = '${usuario}' AND u.password = '${password}' `, {});
        
        var respuesta = {
            usuario:       resultadosConsulta[0].usuario, 
            password:      resultadosConsulta[0].password, 
            nombre:        resultadosConsulta[0].nombre, 
            apellido:      resultadosConsulta[0].apellido, 
            habilitado:    Boolean(resultadosConsulta[0].habilitado), 
            tienda_codigo: resultadosConsulta[0].tienda_codigo,
            central:       Boolean(resultadosConsulta[0].central)
        };
    
    
        console.log('************************************************************');
        console.log('Consulta solicitada: Hacer Login');
        console.log('Datos devueltos al cliente:');
        console.log(respuesta);
        return callback(null, respuesta );
    }
    catch(error) 
    {
        console.log(error);
        return callback(error);
    }
}


async function traerProductosDeLaTienda(call, callback)
{
    var tienda_codigo  = call.request.tienda_codigo;

    console.log('************************************************************');
    console.log('Buscando productos de la tienda ' + tienda_codigo);

    try
    {
        var resultadosConsulta = await conexionDataBase.query(`SELECT p.codigo, p.nombre, p.talle, p.foto, p.color, txp.tienda_codigo, txp.stock
                                                               FROM producto p
                                                               INNER JOIN tienda_x_producto txp
                                                               ON p.codigo = txp.producto_codigo
                                                               WHERE txp.tienda_codigo = '${tienda_codigo}' `, {});
        
        console.log(resultadosConsulta[0].stock);
        console.log(typeof( parseInt(resultadosConsulta[0].stock, 10) ) );

        var respuesta = [];
        for(var i = 0; i < resultadosConsulta.length; i++)
        {
            respuesta.push({ 
                codigo:        resultadosConsulta[i].codigo, 
                nombre:        resultadosConsulta[i].nombre, 
                talle:         resultadosConsulta[i].talle ,
                color:         resultadosConsulta[i].color,
                foto:          resultadosConsulta[i].foto,  
                tienda_codigo: resultadosConsulta[i].tienda_codigo,
                stock:         parseInt(resultadosConsulta[i].stock, 10)
            });
        }
    
        console.log('************************************************************');
        console.log('Consulta solicitada: Buscar productos de la tienda ' + tienda_codigo);
        console.log('Datos devueltos al cliente:');
        console.log(respuesta);
        return callback(null, {arregloProductoDeLaTienda: respuesta} );
    }
    catch(error) 
    {
        console.log(error);
        return callback(error);
    }
}



/*********************************** EXPORTACIÓN DE LA LÓGICA ***********************************/
exports.traerUsuarioPorId = traerUsuarioPorId
exports.traerTiendaPorCodigo = traerTiendaPorCodigo
exports.traerProductoPorCodigo = traerProductoPorCodigo
exports.hacerLogin = hacerLogin
exports.traerProductosDeLaTienda = traerProductosDeLaTienda