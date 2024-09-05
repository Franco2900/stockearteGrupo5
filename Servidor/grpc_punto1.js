/*
CONSIGNA:
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


// Función para ejecutar una consulta y devolver una promesa
function consulta(comandoSQL, args) 
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

// PUNTO 1.A
// Como usuario de casa central: Dar de alta o baja las tiendas
// Las tiendas tienen los siguientes datos: ID (generado automatica al insertar una nueva tienda en la tabla MySQL), código alfanumérico, dirección, ciudad, provincia, check de habilitado o deshabilitado

async function altaTienda(/*call, callback*/)
{
    // Acá van los datos que nos llegan del cliente desde gRPC
    /*const registro =
    {
        codigoTienda: call.request.codigo,
        direccion: call.request.direccion,
        ciudad: call.request.ciudad,
        provincia: call.request.provincia,
        habilitado: call.request.habilitado
    }*/

    
    const registro = // PARA PRUEBAS
    {
        codigoTienda: "sanji32542",
        direccion: "Lacoste 1920",
        ciudad: "Las Toninas",
        provincia: "Buenos Aires",
        habilitado: false
    }


    // Chequeo si ya existe la tienda
    var resultados = await consulta(`SELECT EXISTS(SELECT codigoTienda FROM tiendas WHERE codigoTienda = ?) AS existe`, [registro.codigoTienda]);
    var existeTienda = resultados[0].existe;


    if(existeTienda) console.log('Ya existe la tienda');
    else
    {
        conexion.query('INSERT INTO tiendas SET ?', registro, function (error) // Si no existe la tienda, la creo
        {
            if (error) console.log(error);
            console.log('Se hizo el alta de la tienda con el codigo: ' + registro.codigoTienda);
        })
    }

}


async function bajaTienda(/*call, callback*/)
{    
    var codigoTienda = "sanji32542"; // PARA PRUEBAS. ACÁ IRÍA LO QUE NOS LLEGA DESDE GRPC

    // Chequeo si existe la tienda
    var resultados = await consulta(`SELECT EXISTS(SELECT codigoTienda FROM tiendas WHERE codigoTienda = ?) AS existe`, codigoTienda);
    var existeTienda = resultados[0].existe;


    if(existeTienda)
    {
        conexion.query(`DELETE FROM tiendas WHERE codigoTienda = '${codigoTienda}' `, function(error) 
        {
            if (error) console.log(error);
            console.log('Se hizo la baja de la tienda con el codigo: ' + codigoTienda);
        })
    }
    else console.log('No existe la tienda');

}


// PUNTO 1.B
// Como usuario de casa central: Dar de alta usuarios
// Los usuarios tienen los siguientes datos: ID (generado automatica al insertar una nueva tienda en la tabla MySQL), nombre, apellido, nombre de usuario, contraseña, tienda a la que pertenece (solo puede pertenecer a una tienda o a casa central), check de habilitado o deshabilitado

async function altaUsuario(/*call, callback*/)
{
    // Acá van los datos que nos llegan del cliente desde gRPC
    /*const registro =
    {
        nombre: call.request.nombre,
        apellido: call.request.apellido,
        nombreUsuario: call.request.nombreUsuario,
        contrasenia: call.request.contrasenia,
        habilitado: call.request.habilitado
        codigoTienda: call.request.codigoTienda, 
    }*/

    const registro = // PARA PRUEBAS
    {
        nombre: 'Pepe',
        apellido: 'Argento',
        nombreUsuario: 'El Pepo',
        contrasenia: '12345',
        habilitado: true,
        codigoTienda: 'sanji32542'
    }
 
    // Chequeo si ya existe el usuario
    var resultados = await consulta(`SELECT EXISTS(SELECT nombreUsuario FROM usuarios WHERE codigo = ?) AS existe`, [registro.nombreUsuario]);
    var existeUsuario = resultados[0].existe;
    
    // Chequeo si existe la tienda que se quiere asignar al usuario
    resultados = await consulta(`SELECT EXISTS(SELECT codigoTienda FROM tiendas WHERE codigoTienda = ?) AS existe`, [registro.codigoTienda]);
    var existeTienda = resultados[0].existe;
    

    if(existeUsuario) console.log('Ya existe el usuario');
    if(!existeTienda) console.log('No existe la tienda');

    if(!existeUsuario && existeTienda) // Si no existe el usuario y si existe la tienda
    {
        conexion.query('INSERT INTO usuarios SET ?', registro, function (error) // Si no existe el usuario, lo creo
        {
            if (error) console.log(error);
            console.log('Se hizo el alta del usuario: ' + registro.nombreUsuario);
        })
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


async function altaProducto(/*call, callback*/)
{
    // Acá van los datos que nos llegan del cliente desde gRPC
    /*const registro =
    {
        nombre: call.request.nombre,
        codigoProducto: generadorCodigo(),
        talle: call.request.talle,
        foto: call.request.foto, // SUPONGO QUE ACÁ VA EL NOMBRE DE LA FOTO O SU URL EN LA WEB
        color: call.request.color,
        stock: 0
    }*/

 
    const registro = // PARA PRUEBAS
    {
        nombre: 'Remera',
        codigoProducto: generadorCodigo(),
        talle: 'L',
        foto: 'fondo.jpg',
        color: 'Verde',
        stock: 0
    }

    // Chequeo si ya existe el producto 
    // AVERIGUAR SI AL COMPROBAR LA EXISTENCIA DEL PRODUCTO HAY QUE FIJARSE EN EL CODIGO O EN EL NOMBRE, TALLE Y COLOR
    var resultados = await consulta(`SELECT EXISTS(SELECT codigoProducto FROM productos WHERE codigoProducto = ?) AS existe`, [registro.codigoProducto]);
    var existeProducto = resultados[0].existe;
    

    if(existeProducto) console.log('Ya existe el producto');
    else
    {
        conexion.query('INSERT INTO productos SET ?', registro, function (error) // Si no existe el producto, lo creo
        {
            if (error) console.log(error);
            console.log('Se hizo el alta del producto con el codigo: ' + registro.codigoProducto);
        })
    }

}



// PUNTO 1.D
// Como usuario de tienda: Modificar el stock de los productos de la tienda a la que pertenece

async function modificacionProducto(/*call, callback*/)
{
    var nuevoStock = 10; // PARA LAS PRUEBAS
    var codigoProducto = 'YOoKyaALai'; // PARA LAS PRUEBAS. EL WHERE DE MYSQL NO DIFERENCIA MAYUSCULAS NI MINUSCULAS

    // Chequeo si existe el producto
    var resultados = await consulta(`SELECT EXISTS(SELECT codigoProducto FROM productos WHERE codigoProducto = ?) AS existe`, [codigoProducto]);
    var existeProducto = resultados[0].existe;

    if(existeProducto)
    {
        conexion.query(`UPDATE productos SET stock = ${nuevoStock} WHERE codigoProducto = '${codigoProducto}'`, function (error) // Si existe el producto, lo modifico como indica la consigna
        {
            if (error) console.log(error);
            console.log('Se hizo la modificacion de stock del producto con el codigo: ' + codigoProducto);
        })
    }
    else console.log('No existe el producto');

}
