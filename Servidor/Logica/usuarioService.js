/************************************ CONFIGURACIÓN DE LA BASE DE DATOS **********************************/
const conexionDataBase = require('./conexionDataBase.js');

/********************** DEFINICIÓN DE LA LÓGICA DE LOS MÉTODOS DECLARADOS EN EL ARCHIVO .PROTO ***********************/

async function altaUsuario(call, callback)
{
    console.log('************************************************************');
    console.log('Haciendo alta de usuario');

    // Acá van los datos que nos llegan del cliente desde gRPC
    const registro =
    {
        usuarioCentral:   call.request.usuarioCentral,
        usuario:          call.request.usuario,
        password:         call.request.password,
        nombre:           call.request.nombre,
        apellido:         call.request.apellido,
        habilitado:       call.request.habilitado,
        tienda_codigo:    call.request.tienda_codigo
    }

    var esUsuarioValido = await conexionDataBase.chequearEsUsuarioValido(registro.usuarioCentral);
    var existeUsuario   = await conexionDataBase.chequearExistenciaUsuario(registro.usuario);
    var existeTienda    = await conexionDataBase.chequearExistenciaTienda(registro.tienda_codigo);

    if(esUsuarioValido !== true) return callback(null, { mensaje: esUsuarioValido });
    
    if(existeUsuario)
    {
        console.log('ERROR: Ya existe el usuario que se quiere dar de alta');
        return callback(null, { mensaje: 'ERROR: Ya existe el usuario que se quiere dar de alta' });
    }

    if(!existeTienda) 
    {
        console.log(`ERROR: No existe la tienda con el codigo: ${registro.tienda_codigo} `);
        return callback(null, { mensaje: `ERROR: No existe la tienda con el codigo: ${registro.tienda_codigo} ` });
    }

    if(esUsuarioValido && !existeUsuario && existeTienda) // Si el usuario que ingresa los datos es válido, si no existe el usuario nuevo y si existe la tienda
    {
        try // Creo el usuario
        {
            await conexionDataBase.query(`INSERT INTO usuario 
                SET usuario = '${registro.usuario}', password = '${registro.password}', 
                nombre = '${registro.nombre}', apellido = '${registro.apellido}', 
                habilitado = ${registro.habilitado}, tienda_codigo = '${registro.tienda_codigo}' `, {});

            console.log('Se hizo el alta de la tienda con los siguientes datos');
            console.log(registro);

            return callback(null, { mensaje: `Se hizo el alta del usuario: ${registro.usuario}` });
        }
        catch(error) 
        {
            console.log(error);
            return callback(error);
        }
    }

}



async function buscarUsuario(call, callback) 
{
    try
    {
        // Recibo los datos
        const registro =
        {
            usuarioCentral:  call.request.usuarioCentral,
            usuarioABuscar:  call.request.usuarioABuscar,
            idABuscar:       call.request.idABuscar
        }

        var usuarioCentralEsValido = await conexionDataBase.chequearEsUsuarioValido(registro.usuarioCentral);
        if(usuarioCentralEsValido !== true) return callback(null, { mensaje: usuarioCentralEsValido });


        // Armado de la consulta
        let consultaSQL = `SELECT id, usuario, password, nombre, apellido, habilitado, tienda_codigo 
                           FROM usuario 
                           WHERE 1=1`;

        let parametros = [];

        if (registro.usuarioABuscar) // Si hay un dato a buscar
        {
            consultaSQL += ` AND usuario = ?`;
            parametros.push(registro.usuarioABuscar);
        }

        if (registro.idABuscar)  
        {
            consultaSQL += ` AND id = ?`;
            parametros.push(registro.idABuscar);
        }
        
        if (parametros.length === 0) return callback(null, { mensaje: "ERROR: La consulta está vacía" }); // Si no hay ningún dato


        // Se realiza la consulta
        var resultadosConsulta = await conexionDataBase.query(consultaSQL, parametros);

        var respuesta = {
            id:            resultadosConsulta[0].id, 
            usuario:       resultadosConsulta[0].usuario, 
            password:      resultadosConsulta[0].password, 
            nombre:        resultadosConsulta[0].nombre, 
            apellido:      resultadosConsulta[0].apellido, 
            habilitado:    resultadosConsulta[0].habilitado, 
            tienda_codigo: resultadosConsulta[0].tienda_codigo 
        }


        // Muestro los resultados y se los envio al cliente
        console.log('************************************************************');
        console.log('Consultando datos');
        console.log('Consulta solicitada: Buscar usuarios por nombre de usuario y/o tienda');
        console.log('Nombre de usuario consultado: ' + registro.usuarioABuscar);
        console.log('ID consultado: ' + registro.idABuscar);
        console.log('Datos devueltos al cliente:');
        console.log(respuesta);
        return callback(null, respuesta );

    } catch(error) 
    {
        console.log(error);
        return callback(error);
    }

}



async function buscarTodosLosUsuarios(call, callback)
{
    try
    {
        var resultadosConsulta = await conexionDataBase.query(
            `SELECT id, usuario, password, nombre, apellido, habilitado, tienda_codigo
            FROM usuario `, {}
        );
        
        var respuesta = [];
        for(var i = 0; i < resultadosConsulta.length; i++)
        {
            respuesta.push({
                id:            resultadosConsulta[i].id, 
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



async function modificarUsuario(call, callback)
{
    console.log('************************************************************');
    console.log('Modificando datos');

    // Acá van los datos que nos llegan del cliente desde gRPC
    const registro =
    {
        usuarioAModificar: call.request.usuarioAModificar,
        usuario:           call.request.usuario,
        password:          call.request.password,
        nombre:            call.request.nombre,
        apellido:          call.request.apellido,
        habilitado:        call.request.habilitado,
        tienda_codigo:     call.request.tienda_codigo
    }

    var existeUsuarioAModificar = await conexionDataBase.chequearExistenciaUsuario(registro.usuarioAModificar);
    var existeTienda            = await conexionDataBase.chequearExistenciaTienda(registro.tienda_codigo);

    if(!existeUsuarioAModificar) return callback(null, { mensaje: `ERROR: No existe el usuario ${registro.usuarioAModificar} ` });
    if(!existeTienda)            return callback(null, { mensaje: `ERROR: No existe la tienda ${registro.tienda_codigo} ` });

    if(existeUsuarioAModificar && existeTienda)
    {
        console.log('Modificación solicitada: Modificar usuario');
        console.log('Usuario a modificar: ' + registro.usuarioAModificar);

        console.log('Datos antes de la modificación');
        var resultados = await conexionDataBase.query(
            `SELECT *
            FROM usuario
            WHERE usuario = '${registro.usuarioAModificar}' `, {}
        );
        console.log(resultados);


        console.log('Datos después de la modificación');
        await conexionDataBase.query(
            `UPDATE usuario
            SET usuario = '${registro.usuario}', password = '${registro.password}', nombre = '${registro.nombre}', apellido = '${registro.apellido}', habilitado = ${registro.habilitado}, tienda_codigo = '${registro.tienda_codigo}'
            WHERE usuario = '${registro.usuarioAModificar}' `, {}
        );
        console.log(registro);

        return callback(null, { mensaje: `Modificación del usuario ${registro.usuarioAModificar} realizada correctamente` });
    }

} 

/*********************************** EXPORTACIÓN DE LA LÓGICA ***********************************/
exports.altaUsuario            = altaUsuario
exports.buscarUsuario          = buscarUsuario
exports.buscarTodosLosUsuarios = buscarTodosLosUsuarios
exports.modificarUsuario       = modificarUsuario