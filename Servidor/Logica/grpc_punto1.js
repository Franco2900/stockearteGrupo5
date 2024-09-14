/*************************************** CONSIGNA ****************************************/
/*
1) Conociendo cuál es la operación principal del sitio, se nos indica el siguiente backlog de tareas:

A) Como usuario de casa central, quiero dar de alta tiendas o eliminarlas. Tengo que poder 
identificarlas unívocamente por un código alfanumérico elegido por mí. Además, debe tener datos 
de dirección, ciudad, provincia y un check para habilitarla o deshabilitarla.

B) Como usuario de casa central, quiero dar de alta usuarios para asignarlos a tiendas. Cada usuario 
cuenta con un nombre de usuario, una contraseña, la tienda a la que pertenece (solo puede 
pertenecer a una tienda o a casa central), nombre, apellido, habilitado/deshabilitado.

C) Como usuario de casa central, quiero dar de alta productos para asignarlos a una o varias tiendas 
a la vez. Cada producto cuenta con los siguientes datos: nombre, código único (de 10 caracteres 
generados al azar), talle, foto, color y stock. El stock se registra por color y talle, es manejado por 
cada tienda, por lo que este dato en el alta se fija a 0 por defecto.

D) Como usuario de tienda, quiero modificar el stock de los productos que tiene asignados mi tienda.
*/

/************************************ CONFIGURACIÓN DE LA BASE DE DATOS **********************************/
const conexionDataBase = require('./conexionDataBase.js');

/********************** DEFINICIÓN DE LA LÓGICA DE LOS MÉTODOS DECLARADOS EN EL ARCHIVO .PROTO ***********************/

// PUNTO 1.A
// Como usuario de casa central: Dar de alta o baja las tiendas

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

    /*const registro = // DATO HARDCODEADO PARA PRUEBAS
    {
        usuarioCentral: "Racing Campeon",
        codigo:         "sanji32542",
        direccion:      "Lacoste 1920",
        ciudad:         "Las Toninas",
        provincia:      "Buenos Aires",
        habilitado:     false
    }*/

    var esUsuarioValido = await conexionDataBase.chequearEsUsuarioValido(registro.usuarioCentral);
    var existeTienda    = await conexionDataBase.chequearExistenciaTienda(registro.tienda_codigo);
    
    if(esUsuarioValido !== true) return callback(null, { mensaje: esUsuarioValido });
    
    if(existeTienda)
    {
        console.log('ERROR: Ya existe la tienda');
        //return callback(null, { mensaje: 'ERROR: Ya existe la tienda' });
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


async function bajaLogicaTienda(call, callback)
{
    console.log('************************************************************');
    console.log('Haciendo baja lógica de tienda');
    
    var codigo = call.request.codigo;
    // var codigo = "sanji32542"; // DATO HARDCODEADO PARA PRUEBAS

    // Chequeo si existe la tienda
    var resultados = await conexionDataBase.query(`SELECT EXISTS(SELECT codigo FROM tienda WHERE codigo = ?) AS existe`, codigo);
    var existeTienda = resultados[0].existe;


    if(existeTienda)
    {
        try 
        {
            await conexionDataBase.query(`UPDATE tienda SET habilitado = 0 WHERE codigo = '${codigo}' `, {});

            var mensajeExitoso = 'Se hizo la baja lógica de la tienda con el codigo: ' + codigo;
            console.log(mensajeExitoso);
            return callback(null, { mensaje: mensajeExitoso });
        }
        catch(error) 
        {
            console.log(error);
            return callback(error);
        }
    }
    else
    {
        console.log('ERROR: No existe la tienda');
        return callback(null, { mensaje: 'ERROR: No existe la tienda' });
    } 

}


async function altaLogicaTienda(call, callback)
{   
    console.log('************************************************************');
    console.log('Haciendo alta lógica de tienda');

    var codigo = call.request.codigo;
    // var codigo = "sanji32542"; // DATO HARDCODEADO PARA PRUEBAS

    // Chequeo si existe la tienda
    var resultados = await conexionDataBase.query(`SELECT EXISTS(SELECT codigo FROM tienda WHERE codigo = ?) AS existe`, codigo);
    var existeTienda = resultados[0].existe;


    if(existeTienda)
    {
        try 
        {
            await conexionDataBase.query(`UPDATE tienda SET habilitado = 1 WHERE codigo = '${codigo}' `, {});

            var mensajeExitoso = 'Se hizo el alta lógica de la tienda con el codigo: ' + codigo;
            console.log(mensajeExitoso);
            return callback(null, { mensaje: mensajeExitoso });
        }
        catch(error) 
        {
            console.log(error);
            return callback(error);
        }
    }
    else
    {
        console.log('ERROR: No existe la tienda');
        return callback(null, { mensaje: 'ERROR: No existe la tienda' });
    } 

}

// PUNTO 1.B
// Como usuario de casa central: Dar de alta usuarios

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

    /*const registro = // DATO HARDCODEADO PARA PRUEBAS
    {
        usuarioCentral:   'Racing Campeon',
        usuario:          'La Peluca',
        password:         'qwerty',
        nombre:           'Moni',
        apellido:         'Argento',
        habilitado:       true,
        tienda_codigo:    'sanji32542'
    }*/


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
        console.log('ERROR: No existe la tienda');
        return callback(null, { mensaje: 'ERROR: No existe la tienda' });
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


// PUNTO 1.C
// Como usuario de casa central: Dar de alta productos y asignarlos a una o varias tiendas
// Los productos tienen los siguientes datos: nombre, código único (de 10 caracteres generados al azar), talle, foto, color y stock.
//El stock se registra por color y talle, es manejado por cada tienda, por lo que este dato en el alta se fija a 0 por defecto

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


async function altaProducto(call, callback) {
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

            var mensajeExitoso = 'Se hizo el alta del producto: ' + codigoProducto;
            console.log(mensajeExitoso);
            return callback(null, { mensaje: mensajeExitoso });
        } 
        catch (error) 
        {
            console.log(error);
            return callback(error);
        }
    }
}



// PUNTO 1.D
// Como usuario de tienda: Modificar el stock de los productos de la tienda a la que pertenece

async function modificacionProducto(call, callback)
{
    var nuevoStock     = call.request.nuevoStock;
    var codigoProducto = call.request.codigoProducto;

    //var nuevoStock = 10; // DATO HARDCODEADO PARA PRUEBAS
    //var codigoProducto = 'YOoKyaALai'; // DATO HARDCODEADO PARA PRUEBAS

    // Chequeo si existe el producto NOTA: EL WHERE DE MYSQL NO DIFERENCIA ENTRE MAYUSCULAS Y MINUSCULAS
    var resultados = await conexionDataBase.query(`SELECT EXISTS(SELECT producto_codigo FROM tienda_x_producto WHERE producto_codigo = ?) AS existe`, [codigoProducto]);
    var existeProducto = resultados[0].existe;

    if(existeProducto)
    {
        try 
        {
            await conexionDataBase.query(`UPDATE tienda_x_producto SET stock = ${nuevoStock} WHERE producto_codigo = '${codigoProducto}' `, {});

            var mensajeExitoso = 'Se hizo la modificacion de stock del producto con el codigo: ' + codigoProducto;
            console.log(mensajeExitoso);
            return callback(null, { mensaje: mensajeExitoso });
        }
        catch(error) 
        {
            console.log(error);
            return callback(error);
        }
    }
    else
    {
        console.log('No existe el producto');
        return callback(null, { mensaje: 'ERROR: No existe el producto' });
    } 

}


/*********************************** EXPORTACIÓN DE LA LÓGICA ***********************************/
exports.altaTienda = altaTienda
exports.bajaLogicaTienda = bajaLogicaTienda
exports.altaLogicaTienda = altaLogicaTienda

exports.altaUsuario = altaUsuario

exports.altaProducto = altaProducto
exports.modificacionProducto = modificacionProducto
