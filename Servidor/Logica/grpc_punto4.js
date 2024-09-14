/*************************************** CONSIGNA ****************************************/
/*
4) Detalle: el detalle se muestra mediante alguna opción dentro de cada resultado de la búsqueda y va a 
permitir ver la información completa para modificar o eliminar dicho registro. 

A) Usuario: permite modificar todos los campos. 

B) Tiendas: permite modificar todos los campos, incluyendo asignar/desasignar productos/usuarios. 

C) Productos:  permite  modificar  stock  (solo  usuario  de  tienda).  Para  los  usuarios  de  casa  central, 
deberá poder ver el stock que tiene cada tienda, y podrá modificar los demás campos (excepto el 
código único generado en el alta).
*/

/************************************ CONFIGURACIÓN DE LA BASE DE DATOS **********************************/
const conexionDataBase = require('./conexionDataBase.js');

/********************** DEFINICIÓN DE LA LÓGICA DE LOS MÉTODOS DECLARADOS EN EL ARCHIVO .PROTO ***********************/

// PUNTO 4.A
// Modificar todos los campos de usuario
async function modificarUsuario(/*call, callback*/)
{
    console.log('************************************************************');
    console.log('Modificando datos');

    // Acá van los datos que nos llegan del cliente desde gRPC
    /*const registro =
    {
        usuarioAModificar: call.request.usuarioAModificar, // ESTE CAMPO ES NUEVO
        usuario:           call.request.usuario,
        password:          call.request.password,
        nombre:            call.request.nombre,
        apellido:          call.request.apellido,
        habilitado:        call.request.habilitado,
        tienda_codigo:     call.request.tienda_codigo
    }*/
    
    const registro = // DATO HARDCODEADO PARA PRUEBAS
    {
        usuarioAModificar: 'Racing Campeon',
        usuario:           'Racing Campeon',
        password:          '1967',
        nombre:            'Pepe',
        apellido:          'Argento',
        habilitado:        false, // CAMBIA ACÁ CON RESPECTO A LOS DATOS DE PRUEBA
        tienda_codigo:     'sanji32542'
    }

    var existeUsuarioAModificar = await conexionDataBase.chequearExistenciaUsuario(registro.usuarioAModificar);
    var existeTienda            = await conexionDataBase.chequearExistenciaTienda(registro.tienda_codigo);

    if(!existeUsuarioAModificar) return callback(null, { mensaje: `ERROR: No existe el usuario ${registro.usuarioAModificar} ` });
    if(!existeTienda)            return callback(null, { mensaje: `ERROR: No existe la tienda ${registro.tienda_codigo} ` });

    if(existeUsuarioAModificar && existeTienda)
    {
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
    }

}


// PUNTO 4.B
// Modificar todos los campos de tienda. Asignar y desasignar usuarios y/o productos
async function modificarTienda(/*call, callback*/)
{
    console.log('************************************************************');
    console.log('Modificando datos');

    // Acá van los datos que nos llegan del cliente desde gRPC
    /*const registro =
    {
        tiendaAModificar:  call.request.tiendaAModificar, // ESTE CAMPO ES NUEVO
        codigo:            call.request.codigo,
        direccion:         call.request.direccion,
        ciudad:            call.request.ciudad,
        provincia:         call.request.provincia,
        habilitado:        call.request.habilitado,
        central:           call.request.central
    }*/
    
    const registro = // DATO HARDCODEADO PARA PRUEBAS
    {
        tiendaAModificar: 'asdfgh987',
        codigo:           'asdfgh987',
        direccion:        'Juan Justo 200',
        ciudad:           'Monte Chingolo',
        provincia:        'Buenos Aires',
        habilitado:       false, // CAMBIA ACÁ CON RESPECTO A LOS DATOS DE PRUEBA
        central:          0
    }

    var existeTiendaAModificar  = await conexionDataBase.chequearExistenciaTienda(registro.tiendaAModificar);
    if(!existeTiendaAModificar) return callback(null, { mensaje: `ERROR: No existe la tienda ${registro.tiendaAModificar} ` });

    if(existeTiendaAModificar)
    {
        console.log('Datos antes de la modificación');

        var resultados = await conexionDataBase.query(
            `SELECT *
            FROM tienda
            WHERE codigo = '${registro.tiendaAModificar}' `, {}
        );

        console.log(resultados);


        console.log('Datos después de la modificación');

        await conexionDataBase.query(
            `UPDATE tienda
            SET codigo = '${registro.codigo}', direccion = '${registro.direccion}', ciudad = '${registro.ciudad}', provincia = '${registro.provincia}', habilitado = ${registro.habilitado}, central = '${registro.central}'
            WHERE codigo = '${registro.tiendaAModificar}' `, {}
        );

        console.log(registro);
    }

}




/*********************************** EXPORTACIÓN DE LA LÓGICA ***********************************/
exports.modificarUsuario = modificarUsuario
exports.modificarTienda = modificarTienda