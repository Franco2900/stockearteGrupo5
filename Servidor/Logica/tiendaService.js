/************************************ CONFIGURACIÓN DE LA BASE DE DATOS **********************************/
const conexionDataBase = require('./conexionDataBase.js');

/********************** DEFINICIÓN DE LA LÓGICA DE LOS MÉTODOS DECLARADOS EN EL ARCHIVO .PROTO ***********************/

async function altaTienda(call, callback)
{
    console.log('************************************************************');
    console.log('Haciendo alta de tienda');

    // Acá van los datos que nos llegan del cliente desde gRPC
    const registro =
    {
        usuarioCentral: call.request.usuarioCentral,
        codigo:         call.request.codigo,
        direccion:      call.request.direccion,
        ciudad:         call.request.ciudad,
        provincia:      call.request.provincia,
        habilitado:     call.request.habilitado
    }


    var esUsuarioValido = await conexionDataBase.chequearEsUsuarioValido(registro.usuarioCentral);
    var existeTienda    = await conexionDataBase.chequearExistenciaTienda(registro.codigo);
    
    if(esUsuarioValido !== true) return callback(null, { mensaje: esUsuarioValido });
    
    if(existeTienda)
    {
        console.log('ERROR: Ya existe la tienda');
        return callback(null, { mensaje: 'ERROR: Ya existe la tienda' });
    }


    if(esUsuarioValido && !existeTienda) 
    {
        try // Si no existe la tienda, la creo
        {
            await conexionDataBase.query(`INSERT INTO tienda 
                SET codigo = '${registro.codigo}', direccion = '${registro.direccion}', 
                ciudad = '${registro.ciudad}', provincia = '${registro.provincia}', 
                habilitado = '${registro.habilitado}' `, {});

            console.log('Se hizo el alta de la tienda con los siguientes datos');
            console.log(registro);

            return callback(null, { mensaje: `Se hizo el alta de la tienda con el codigo: ${registro.codigo}` });
        }
        catch(error) 
        {
            console.log(error);
            return callback(error);
        }
    }
    
}



async function buscarTienda(call, callback) {

    try
    {
        // Recibo los datos
        const registro =
        {
            usuarioCentral:       call.request.usuarioCentral,
            codigoTiendaABuscar:  call.request.codigoTiendaABuscar
        }

        var usuarioCentralEsValido = await conexionDataBase.chequearEsUsuarioValido(registro.usuarioCentral);
        if(usuarioCentralEsValido !== true) return callback(null, { mensaje: usuarioCentralEsValido });

        // Armado de la consulta
        let consultaSQL = `SELECT codigo, direccion, ciudad, provincia, habilitado, central 
                           FROM tienda 
                           WHERE 1=1`;

        let parametros = [];

        if (registro.codigoTiendaABuscar) // Si hay un dato a buscar
        {
            consultaSQL += ` AND codigo = ?`;
            parametros.push(registro.codigoTiendaABuscar);
        }

        if (parametros.length === 0) return callback(null, { mensaje: "ERROR: La consulta está vacía" }); // Si no hay ningún dato


        // Se realiza la consulta
        var resultadosConsulta = await conexionDataBase.query(consultaSQL, parametros);

        var respuesta = {
            codigo:     resultadosConsulta[0].codigo, 
            direccion:  resultadosConsulta[0].direccion, 
            ciudad:     resultadosConsulta[0].ciudad, 
            provincia:  resultadosConsulta[0].provincia, 
            habilitado: Boolean(resultadosConsulta[0].habilitado), 
            central:    Boolean(resultadosConsulta[0].central)
        }


        // Muestro los resultados y se los envio al cliente
        console.log('************************************************************');
        console.log('Consultando datos');
        console.log('Consulta solicitada: Buscar tienda por código y/o estado habilitado');
        console.log('Codigo tienda consultado: ' + registro.codigoTiendaABuscar);
        console.log('Estado habilitado consultado: ' + registro.habilitado);
        console.log('Datos devueltos al cliente:');
        console.log(respuesta);
        return callback(null, respuesta);

    } catch(error) 
    {
        console.log(error);
        return callback(error);
    }

}



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



async function modificarTienda(call, callback)
{
    console.log('************************************************************');
    console.log('Modificando datos');

    // Acá van los datos que nos llegan del cliente desde gRPC
    const registro =
    {
        codigoTiendaAModificar: call.request.codigoTiendaAModificar, // ESTE CAMPO ES NUEVO
        codigo:                 call.request.codigo,
        direccion:              call.request.direccion,
        ciudad:                 call.request.ciudad,
        provincia:              call.request.provincia,
        habilitado:             call.request.habilitado
    }

    var existeTiendaAModificar  = await conexionDataBase.chequearExistenciaTienda(registro.codigoTiendaAModificar);
    if(!existeTiendaAModificar) return callback(null, { mensaje: `ERROR: No existe la tienda ${registro.codigoTiendaAModificar}` });

    if(existeTiendaAModificar)
    {
        console.log('Modificación solicitada: Modificar tienda');
        console.log('Tienda a modificar: ' + registro.codigoTiendaAModificar);

        console.log('Datos antes de la modificación');
        var resultados = await conexionDataBase.query(
            `SELECT *
            FROM tienda
            WHERE codigo = '${registro.codigoTiendaAModificar}' `, {}
        );
        console.log(resultados);


        console.log('Datos después de la modificación');
        await conexionDataBase.query(
            `UPDATE tienda
            SET codigo = '${registro.codigo}', direccion = '${registro.direccion}', ciudad = '${registro.ciudad}', provincia = '${registro.provincia}', habilitado = ${registro.habilitado}
            WHERE codigo = '${registro.codigoTiendaAModificar}' `, {}
        );
        console.log(registro);

        return callback(null, { mensaje: `Modificación de la tienda ${registro.codigoTiendaAModificar} realizada correctamente` });
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

/*********************************** EXPORTACIÓN DE LA LÓGICA ***********************************/
exports.altaTienda            = altaTienda
exports.buscarTienda          = buscarTienda
exports.buscarTodasLasTiendas = buscarTodasLasTiendas
exports.modificarTienda       = modificarTienda
exports.traerTiendaPorCodigo  = traerTiendaPorCodigo