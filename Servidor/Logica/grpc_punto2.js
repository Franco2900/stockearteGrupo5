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
/*
async function buscarUsuario_X_Usuario(call, callback)
{
    try
    {
        var usuarioCentral = call.request.usuarioCentral;
        var usuarioABuscar = call.request.usuarioABuscar;
        //var usuarioCentral = 'Racing Campeon';    // DATO HARDCODEADO PARA PRUEBAS
        //var usuarioABuscar = 'La Peluca';         // DATO HARDCODEADO PARA PRUEBAS

        // Compruebo si el usuario que solicita los datos es válido
        var usuarioCentralEsValido = await conexionDataBase.chequearEsUsuarioValido(usuarioCentral);
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
            var resultadosConsulta = await conexionDataBase.query(
                `SELECT usuario, password, nombre, apellido, habilitado, tienda_codigo 
                FROM usuario 
                WHERE usuario = '${usuarioABuscar}' `, {}
            );
        
            var respuesta = { 
                usuario:       resultadosConsulta[0].usuario, 
                password:      resultadosConsulta[0].password, 
                nombre:        resultadosConsulta[0].nombre, 
                apellido:      resultadosConsulta[0].apellido, 
                habilitado:    resultadosConsulta[0].habilitado, 
                tienda_codigo: resultadosConsulta[0].tienda_codigo 
            };
            
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
    try
    {
        var usuarioCentral = call.request.usuarioCentral;
        var tiendaABuscar  = call.request.tiendaABuscar;
        //var usuarioCentral = 'El Pepo';    // DATO HARDCODEADO PARA PRUEBAS
        //var tiendaABuscar  = 'asdfgh987';  // DATO HARDCODEADO PARA PRUEBAS

        // Compruebo si el usuario que solicita los datos es válido
        var usuarioCentralEsValido = await conexionDataBase.chequearEsUsuarioValido(usuarioCentral);
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
            var resultadosConsulta = await conexionDataBase.query(
                `SELECT usuario, password, nombre, apellido, habilitado, tienda_codigo 
                FROM usuario 
                WHERE tienda_codigo = '${tiendaABuscar}' `, {}
            );

            // ACÁ CAMBIA CON RESPECTO A LA FUNCIÓN ANTERIOR PORQUE UNA TIENDA PUEDE TENER MUCHOS USUARIOS
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
            console.log('Consultando datos');
            console.log('Consulta solicitada: Buscar usuario por codigo de tienda');
            console.log('Usuario que solicito los datos: ' + usuarioCentral);
            console.log('Tienda que consulto: ' + tiendaABuscar);
            console.log('Datos devueltos al cliente:');
            console.log(respuesta);
            return callback(null, {arregloUsuarios: respuesta} );
        }
    
    }
    catch(error) {console.log(error);}

}
*/

async function buscarUsuarios(call, callback) 
{
    try
    {
        // Recibo los datos
        const registro =
        {
            usuarioCentral:        call.request.usuarioCentral,
            usuarioABuscar:        call.request.usuarioABuscar,
            codigoTiendaABuscar:   call.request.codigoTiendaABuscar
        }

        var usuarioCentralEsValido = await conexionDataBase.chequearEsUsuarioValido(registro.usuarioCentral);
        if(usuarioCentralEsValido !== true) return callback(null, { mensaje: usuarioCentralEsValido });


        // Armado de la consulta
        let consultaSQL = `SELECT usuario, password, nombre, apellido, habilitado, tienda_codigo 
                           FROM usuario 
                           WHERE 1=1`;

        let parametros = [];

        if (registro.usuarioABuscar) // Si hay un dato a buscar
        {
            consultaSQL += ` AND usuario = ?`;
            parametros.push(registro.usuarioABuscar);
        }

        if (registro.codigoTiendaABuscar)  
        {
            consultaSQL += ` AND tienda_codigo = ?`;
            parametros.push(registro.codigoTiendaABuscar);
        }
        
        if (parametros.length === 0) return callback(null, { mensaje: "ERROR: La consulta está vacía" }); // Si no hay ningún dato


        // Se realiza la consulta
        var resultadosConsulta = await conexionDataBase.query(consultaSQL, parametros);

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


        // Muestro los resultados y se los envio al cliente
        console.log('************************************************************');
        console.log('Consultando datos');
        console.log('Consulta solicitada: Buscar usuarios por nombre de usuario y/o tienda');
        console.log('Nombre de usuario consultado: ' + registro.usuarioABuscar);
        console.log('Codigo tienda consultado: ' + registro.codigoTiendaABuscar);
        console.log('Datos devueltos al cliente:');
        console.log(respuesta);
        return callback(null, {arregloUsuarios: respuesta} );

    } catch(error) 
    {
        console.log(error);
        return callback(error);
    }

}

// PUNTO 2.B
// Como usuario de casa central: Buscar tiendas por código y/o estado (habilitada/deshabilitada).
/*
async function buscarTienda_X_TiendaCodigo(call, callback)
{
    var usuarioCentral = call.request.usuarioCentral;
    var tiendaABuscar  = call.request.tiendaABuscar;
    //var usuarioCentral = 'El Pepo';    // DATO HARDCODEADO PARA PRUEBAS
    //var tiendaABuscar  = 'asdfgh987';  // DATO HARDCODEADO PARA PRUEBAS

    try
    {
        // Compruebo si el usuario que solicita los datos es válido
        var usuarioCentralEsValido = await conexionDataBase.chequearEsUsuarioValido(usuarioCentral);
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
            var resultadosConsulta = await conexionDataBase.query(
                `SELECT codigo, direccion, ciudad, provincia, habilitado, central
                FROM tienda 
                WHERE codigo = '${tiendaABuscar}' `, {}
            );
        
            var respuesta = { 
                codigo:     resultadosConsulta[0].codigo, 
                direccion:  resultadosConsulta[0].direccion, 
                ciudad:     resultadosConsulta[0].ciudad, 
                provincia:  resultadosConsulta[0].provincia, 
                habilitado: resultadosConsulta[0].habilitado, 
                central:    resultadosConsulta[0].central 
            };
            
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
        var usuarioCentralEsValido = await conexionDataBase.chequearEsUsuarioValido(usuarioCentral);
        if(usuarioCentralEsValido !== true) return callback(null, { mensaje: usuarioCentralEsValido });

        // Si todo esta OK
        if(usuarioCentralEsValido) 
        {
            var resultadosConsulta = await conexionDataBase.query(
                `SELECT codigo, direccion, ciudad, provincia, habilitado, central
                FROM tienda
                WHERE habilitado = ${habilitado} `, {}
            );

            // Puede haber muchas tiendas
            var respuesta = [];
            for(var i = 0; i < resultadosConsulta.length; i++)
            {
                respuesta.push({
                    codigo:     resultadosConsulta[i].codigo, 
                    direccion:  resultadosConsulta[i].direccion, 
                    ciudad:     resultadosConsulta[i].ciudad, 
                    provincia:  resultadosConsulta[i].provincia, 
                    habilitado: resultadosConsulta[i].habilitado,
                    central:    resultadosConsulta[i].central 
                });
            }

            console.log('************************************************************');
            console.log('Consultando datos');
            console.log('Consulta solicitada: Buscar tienda por habilitado');
            console.log('Usuario que solicito los datos: ' + usuarioCentral);
            console.log('Habilitado consultado: ' + habilitado);
            console.log('Datos devueltos al cliente:');
            console.log(respuesta);
            return callback(null, {arregloTiendas: respuesta} );
        }
    
    }
    catch(error) {console.log(error);}

}
*/

async function buscarTiendas(call, callback) {

    try
    {
        // Recibo los datos
        const registro =
        {
            usuarioCentral:       call.request.usuarioCentral,
            codigoTiendaABuscar:  call.request.codigoTiendaABuscar,
            habilitado:           call.request.habilitado
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

        if (registro.habilitado !== undefined) // ACÁ CAMBIA PORQUE ES BOOLEANO
        {
            consultaSQL += ` AND habilitado = ?`;
            parametros.push(registro.habilitado);
        }

        if (parametros.length === 0) return callback(null, { mensaje: "ERROR: La consulta está vacía" }); // Si no hay ningún dato


        // Se realiza la consulta
        var resultadosConsulta = await conexionDataBase.query(consultaSQL, parametros);

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


        // Muestro los resultados y se los envio al cliente
        console.log('************************************************************');
        console.log('Consultando datos');
        console.log('Consulta solicitada: Buscar tienda por código y/o estado habilitado');
        console.log('Codigo tienda consultado: ' + registro.codigoTiendaABuscar);
        console.log('Estado habilitado consultado: ' + registro.habilitado);
        console.log('Datos devueltos al cliente:');
        console.log(respuesta);
        return callback(null, {arregloTiendas: respuesta});

    } catch(error) 
    {
        console.log(error);
        return callback(error);
    }

}


// PUNTO 2.C
// Buscar productos. Se pueden filtrar por nombre, código, talle, color.
// NOTA: ESTAS BÚSQUEDAS NO PIDEN CHEQUEO DE USUARIO CENTRAL
/*
async function buscarProducto_X_Nombre(call, callback)
{
    var nombre = call.request.nombre;
    //var nombre = 'Camisa Básica'; // DATO HARDCODEADO PARA PRUEBAS

    try
    {
        var resultadosConsulta = await conexionDataBase.query(
            `SELECT codigo, nombre, talle, foto, color
            FROM producto
            WHERE nombre = '${nombre}' `, {}
        );

        // Puede haber muchos productos con el mismo nombre pero en distinto talle o color
        var respuesta = [];
        for(var i = 0; i < resultadosConsulta.length; i++)
        {
            respuesta.push({
                codigo: resultadosConsulta[i].codigo, 
                nombre: resultadosConsulta[i].nombre, 
                talle:  resultadosConsulta[i].talle, 
                foto:   resultadosConsulta[i].foto, 
                color:  resultadosConsulta[i].color 
            });
        }

        console.log('************************************************************');
        console.log('Consultando datos');
        console.log('Consulta solicitada: Buscar producto por nombre');
        console.log('Nombre consultado: ' + nombre);
        console.log('Datos devueltos al cliente:');
        console.log(respuesta);
        return callback(null, {arregloProductos: respuesta} );

    }
    catch(error) {console.log(error);}
    
}


async function buscarProducto_X_Codigo(call, callback)
{
    var codigo = call.request.codigo;
    //var codigo = 'PJ456'; // DATO HARDCODEADO PARA PRUEBAS

    try
    {
        var resultadosConsulta = await conexionDataBase.query(
            `SELECT codigo, nombre, talle, foto, color
            FROM producto
            WHERE codigo = '${codigo}' `, {}
        );

        // Solo puede haber un producto con dicho codigo
        var respuesta = { 
            codigo: resultadosConsulta[0].codigo, 
            nombre: resultadosConsulta[0].nombre, 
            talle:  resultadosConsulta[0].talle, 
            foto:   resultadosConsulta[0].foto, 
            color:  resultadosConsulta[0].color 
        };

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
        var resultadosConsulta = await conexionDataBase.query(
            `SELECT codigo, nombre, talle, foto, color
            FROM producto
            WHERE talle = '${talle}' `, {}
        );

        // Puede haber muchos productos con el mismo talle
        var respuesta = [];
        for(var i = 0; i < resultadosConsulta.length; i++)
        {
            respuesta.push({
                codigo: resultadosConsulta[i].codigo, 
                nombre: resultadosConsulta[i].nombre, 
                talle:  resultadosConsulta[i].talle, 
                foto:   resultadosConsulta[i].foto, 
                color:  resultadosConsulta[i].color 
            });
        }

        console.log('************************************************************');
        console.log('Consultando datos');
        console.log('Consulta solicitada: Buscar producto por talle');
        console.log('Talle consultado: ' + talle);
        console.log('Datos devueltos al cliente:');
        console.log(respuesta);
        return callback(null, {arregloProductos: respuesta} );

    }
    catch(error) {console.log(error);}
}


async function buscarProducto_X_Color(call, callback)
{
    var color = call.request.color;
    //var color = 'Rojo'; // DATO HARDCODEADO PARA PRUEBAS

    try
    {
        var resultadosConsulta = await conexionDataBase.query(
            `SELECT codigo, nombre, talle, foto, color
            FROM producto
            WHERE color = '${color}' `, {}
        );

        // Puede haber muchos productos con el mismo color
        var respuesta = [];
        for(var i = 0; i < resultadosConsulta.length; i++)
        {
            respuesta.push({
                codigo: resultadosConsulta[i].codigo, 
                nombre: resultadosConsulta[i].nombre, 
                talle:  resultadosConsulta[i].talle, 
                foto:   resultadosConsulta[i].foto, 
                color:  resultadosConsulta[i].color 
            });
        }

        console.log('************************************************************');
        console.log('Consultando datos');
        console.log('Consulta solicitada: Buscar producto por color');
        console.log('Color consultado: ' + color);
        console.log('Datos devueltos al cliente:');
        console.log(respuesta);
        return callback(null, {arregloProductos: respuesta} );

    }
    catch(error) {console.log(error);}
}
*/

async function buscarProductos(call, callback) {

    try
    {
        // Recibo los datos
        const registro =
        {
            usuarioCentral: call.request.usuarioCentral,
            codigo:         call.request.codigo,
            nombre:         call.request.nombre,
            talle:          call.request.talle,
            color:          call.request.color
        }

        var usuarioCentralEsValido = await conexionDataBase.chequearEsUsuarioValido(registro.usuarioCentral);
        if(usuarioCentralEsValido !== true) return callback(null, { mensaje: usuarioCentralEsValido });

        // Armado de la consulta
        let consultaSQL = `SELECT codigo, nombre, talle, foto, color 
                           FROM producto 
                           WHERE 1=1`;

        let parametros = [];

        if (registro.codigo) // Si hay un dato a buscar
        {
            consultaSQL += ` AND codigo = ?`;
            parametros.push(registro.codigo);
        }

        if (registro.nombre)
        {
            consultaSQL += ` AND nombre = ?`;
            parametros.push(registro.nombre);
        }

        if (registro.talle) 
        {
            consultaSQL += ` AND talle = ?`;
            parametros.push(registro.talle);
        }

        if (registro.color) 
        {
            consultaSQL += ` AND color = ?`;
            parametros.push(registro.color);
        }

        if (parametros.length === 0) return callback(null, { mensaje: "ERROR: La consulta está vacía" }); // Si no hay ningún dato


        // Se realiza la consulta
        var resultadosConsulta = await conexionDataBase.query(consultaSQL, parametros);

        var respuesta = [];
        for(var i = 0; i < resultadosConsulta.length; i++)
        {
            respuesta.push({
                codigo:     resultadosConsulta[i].codigo, 
                nombre:     resultadosConsulta[i].nombre, 
                talle:      resultadosConsulta[i].talle, 
                foto:       resultadosConsulta[i].foto, 
                color:      resultadosConsulta[i].color
            });
        }


        // Muestro los resultados y se los envio al cliente
        console.log('************************************************************');
        console.log('Consultando datos');
        console.log('Consulta solicitada: Buscar producto por código y/o nombre y/o talle y/o color');
        console.log('Codigo producto consultado: ' + registro.codigo);
        console.log('Nombre consultado: ' + registro.nombre);
        console.log('Talle consultado: ' + registro.talle);
        console.log('Color consultado: ' + registro.color);
        console.log('Datos devueltos al cliente:');
        console.log(respuesta);
        return callback(null, {arregloProductos: respuesta});

    } catch(error) 
    {
        console.log(error);
        return callback(error);
    }

}

/*********************************** EXPORTACIÓN DE LA LÓGICA ***********************************/
//exports.buscarUsuario_X_Usuario = buscarUsuario_X_Usuario //SACAR
//exports.buscarUsuario_X_TiendaCodigo = buscarUsuario_X_TiendaCodigo //SACAR
exports.buscarUsuarios = buscarUsuarios

//exports.buscarTienda_X_TiendaCodigo = buscarTienda_X_TiendaCodigo //SACAR
//exports.buscarTienda_X_Habilitado = buscarTienda_X_Habilitado //SACAR
exports.buscarTiendas = buscarTiendas

//exports.buscarProducto_X_Nombre = buscarProducto_X_Nombre //SACAR
//exports.buscarProducto_X_Codigo = buscarProducto_X_Codigo //SACAR
//exports.buscarProducto_X_Talle = buscarProducto_X_Talle //SACAR
//exports.buscarProducto_X_Color = buscarProducto_X_Color //SACAR
exports.buscarProductos = buscarProductos