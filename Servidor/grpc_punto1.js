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

const mysql = require('mysql');
const generadorContrasenia = require('generate-password');


var conexion = mysql.createConnection({ // Creo una conexión a la base de datos
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'Stockearte'
})

conexion.connect(function (error) { // Me conecto a la base de datos
  if (error) console.log('Problemas de conexion con mysql')
  else       console.log('Conexión exitosa con la base de datos')
})


// Función para ejecutar un comando SQL y devolver una promesa
function query(comandoSQL, args) 
{
    return new Promise((resolve, reject) => 
    {
        conexion.query(comandoSQL, args, (error, resultados) => 
        {
            if (error) return reject(error);
            resolve(resultados);
        });
    });
}

/********************** DEFINICIÓN DE LA LÓGICA DE LOS MÉTODOS DECLARADOS EN EL ARCHIVO .PROTO ***********************/

// PUNTO 1.A
// Como usuario de casa central: Dar de alta o baja las tiendas
// Las tiendas tienen los siguientes datos: ID (generado automatica al insertar una nueva tienda en la tabla MySQL), código alfanumérico, dirección, ciudad, provincia, check de habilitado o deshabilitado

async function altaTienda(call, callback)
{
    // Acá van los datos que nos llegan del cliente desde gRPC
    const registro =
    {
        codigoTienda: call.request.codigoTienda,
        direccion:    call.request.direccion,
        ciudad:       call.request.ciudad,
        provincia:    call.request.provincia,
        habilitado:   call.request.habilitado
    }

    
    /*const registro = // DATO HARDCODEADO PARA PRUEBAS
    {
        codigoTienda: "sanji32542",
        direccion:    "Lacoste 1920",
        ciudad:       "Las Toninas",
        provincia:    "Buenos Aires",
        habilitado:   false
    }*/


    // Chequeo si ya existe la tienda
    var resultados = await query(`SELECT EXISTS(SELECT codigoTienda FROM tiendas WHERE codigoTienda = ?) AS existe`, [registro.codigoTienda]);
    var existeTienda = resultados[0].existe;


    if(existeTienda)
    {
        console.log('ERROR: Ya existe la tienda');
        return callback(null, { mensaje: 'ERROR: Ya existe la tienda' });
    }
    else
    {
        try // Si no existe la tienda, la creo
        {
            await query('INSERT INTO tiendas SET ?', registro);

            var mensajeExitoso = 'Se hizo el alta de la tienda con el codigo: ' + registro.codigoTienda;
            console.log(mensajeExitoso);
            return callback(null, { mensaje: mensajeExitoso });
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
    var codigoTienda = call.request.codigoTienda;
    // var codigoTienda = "sanji32542"; // DATO HARDCODEADO PARA PRUEBAS

    // Chequeo si existe la tienda
    var resultados = await query(`SELECT EXISTS(SELECT codigoTienda FROM tiendas WHERE codigoTienda = ?) AS existe`, codigoTienda);
    var existeTienda = resultados[0].existe;


    if(existeTienda)
    {
        try 
        {
            await query(`UPDATE tiendas SET habilitado = 0 WHERE codigoTienda = '${codigoTienda}' `, {});

            var mensajeExitoso = 'Se hizo la baja lógica de la tienda con el codigo: ' + codigoTienda;
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
    var codigoTienda = call.request.codigoTienda;
    // var codigoTienda = "sanji32542"; // DATO HARDCODEADO PARA PRUEBAS

    // Chequeo si existe la tienda
    var resultados = await query(`SELECT EXISTS(SELECT codigoTienda FROM tiendas WHERE codigoTienda = ?) AS existe`, codigoTienda);
    var existeTienda = resultados[0].existe;


    if(existeTienda)
    {
        try 
        {
            await query(`UPDATE tiendas SET habilitado = 1 WHERE codigoTienda = '${codigoTienda}' `, {});

            var mensajeExitoso = 'Se hizo el alta lógica de la tienda con el codigo: ' + codigoTienda;
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
// Los usuarios tienen los siguientes datos: ID (generado automatica al insertar una nueva tienda en la tabla MySQL), nombre, apellido, nombre de usuario, contraseña, tienda a la que pertenece (solo puede pertenecer a una tienda o a casa central), check de habilitado o deshabilitado

async function altaUsuario(call, callback)
{
    // Acá van los datos que nos llegan del cliente desde gRPC
    const registro =
    {
        nombre: call.request.nombre,
        apellido: call.request.apellido,
        nombreUsuario: call.request.nombreUsuario,
        contrasenia: call.request.contrasenia,
        habilitado: call.request.habilitado,
        codigoTienda: call.request.codigoTienda
    }

    /*const registro = // DATO HARDCODEADO PARA PRUEBAS
    {
        nombre: 'Pepe',
        apellido: 'Argento',
        nombreUsuario: 'El Pepo',
        contrasenia: '12345',
        habilitado: true,
        codigoTienda: 'sanji32542'
    }*/
 
    // Chequeo si ya existe el usuario
    var resultados = await query(`SELECT EXISTS(SELECT nombreUsuario FROM usuarios WHERE nombreUsuario = ?) AS existe`, [registro.nombreUsuario]);
    var existeUsuario = resultados[0].existe;
    
    // Chequeo si existe la tienda que se quiere asignar al usuario
    resultados = await query(`SELECT EXISTS(SELECT codigoTienda FROM tiendas WHERE codigoTienda = ?) AS existe`, [registro.codigoTienda]);
    var existeTienda = resultados[0].existe;
    

    if(existeUsuario) 
    {
        console.log('Ya existe el usuario');
        return callback(null, { mensaje: 'ERROR: Ya existe el usuario' });
    }
    if(!existeTienda) 
    {
        console.log('No existe la tienda');
        return callback(null, { mensaje: 'ERROR: No existe la tienda' });
    }

    if(!existeUsuario && existeTienda) // Si no existe el usuario y si existe la tienda
    {
        try // Si no existe el usuario, lo creo
        {
            await query('INSERT INTO usuarios SET ?', registro);

            var mensajeExitoso = 'Se hizo el alta del usuario: ' + registro.nombreUsuario;
            console.log(mensajeExitoso);
            return callback(null, { mensaje: mensajeExitoso });
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
// Los productos tienen los siguientes datos: nombre, código único (de 10 caracteres generados al azar), talle, foto, color y stock. El stock se registra por color y talle, es manejado por cada tienda, por lo que este dato en el alta se fija a 0 por defecto

// Crea un código al azar de 10 caracteres
function generadorCodigo()
{
    var codigo = generadorContrasenia.generate({
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
    // Acá van los datos que nos llegan del cliente desde gRPC
    const registro =
    {
        nombre: call.request.nombre,
        codigoProducto: generadorCodigo(),
        talle: call.request.talle,
        foto: call.request.foto, // SUPONGO QUE ACÁ VA EL NOMBRE DE LA FOTO O SU URL EN LA WEB
        color: call.request.color,
    }

    /*const registro = // DATO HARDCODEADO PARA PRUEBAS
    {
        nombre: 'Remera',
        codigoProducto: generadorCodigo(),
        talle: 'L',
        foto: 'fondo.jpg',
        color: 'Verde',
    }*/

    // Chequeo si ya existe el producto 
    // AVERIGUAR SI AL COMPROBAR LA EXISTENCIA DEL PRODUCTO HAY QUE FIJARSE EN EL CODIGO O EN EL NOMBRE, TALLE Y COLOR PORQUE EL CÓDIGO SE GENERA AL AZAR
    var resultados = await query(`SELECT EXISTS(SELECT codigoProducto FROM productos WHERE codigoProducto = ?) AS existe`, [registro.codigoProducto]);
    var existeProducto = resultados[0].existe;
    

    if(existeProducto) 
    {
        console.log('Ya existe el producto');
        return callback(null, { mensaje: 'ERROR: Ya existe el producto' });
    }
    else
    {
        try // Si no existe el producto, lo creo
        {
            await query('INSERT INTO productos SET ?', registro);

            var mensajeExitoso = 'Se hizo el alta del producto: ' +  registro.codigoProducto;
            console.log(mensajeExitoso);
            return callback(null, { mensaje: mensajeExitoso });
        }
        catch(error) 
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
    var resultados = await query(`SELECT EXISTS(SELECT codigoProducto FROM tiendasxproductos WHERE codigoProducto = ?) AS existe`, [codigoProducto]);
    var existeProducto = resultados[0].existe;

    if(existeProducto)
    {
        try 
        {
            await query(`UPDATE tiendasXproductos SET stock = ${nuevoStock} WHERE codigoProducto = '${codigoProducto}' `, {});

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
