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
                usuario:     resultadosConsulta[0].usuario, 
                password:  resultadosConsulta[0].password, 
                nombre:     resultadosConsulta[0].nombre, 
                apellido:  resultadosConsulta[0].apellido, 
                habilitado: Boolean(resultadosConsulta[0].habilitado), 
                tienda_codigo:    resultadosConsulta[0].tienda_codigo
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
            codigo:     resultadosConsulta[0].codigo, 
            nombre:  resultadosConsulta[0].nombre, 
            talle:     resultadosConsulta[0].talle, 
            color:  resultadosConsulta[0].color
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

/*********************************** EXPORTACIÓN DE LA LÓGICA ***********************************/
exports.traerUsuarioPorId = traerUsuarioPorId
exports.traerTiendaPorCodigo = traerTiendaPorCodigo
exports.traerProductoPorCodigo = traerProductoPorCodigo