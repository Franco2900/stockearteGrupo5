/************************************ CONFIGURACIÓN DE LA BASE DE DATOS **********************************/
const mysql = require('mysql');

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

/************************************ FUNCIONES DE CARGA DE DATOS **********************************/

async function cargarTienda(registro)
{
    // Chequeo si ya existe la tienda
    var resultados = await query(`SELECT EXISTS(SELECT codigoTienda FROM tiendas WHERE codigoTienda = ?) AS existe`, [registro.codigoTienda]);
    var existeTienda = resultados[0].existe;

    if(existeTienda) console.log('ERROR: Ya existe la tienda');
    else
    {
        try
        {
            await query('INSERT INTO tiendas SET ?', registro);
            console.log('Se hizo el alta de la tienda con el codigo: ' + registro.codigoTienda);
        }
        catch(error) {console.log(error);}
    }
}


async function cargarUsuario(registro)
{
    // Chequeo si ya existe el usuario
    var resultados = await query(`SELECT EXISTS(SELECT nombreUsuario FROM usuarios WHERE nombreUsuario = ?) AS existe`, [registro.nombreUsuario]);
    var existeUsuario = resultados[0].existe;
    
    // Chequeo si existe la tienda que se quiere asignar al usuario
    resultados = await query(`SELECT EXISTS(SELECT codigoTienda FROM tiendas WHERE codigoTienda = ?) AS existe`, [registro.codigoTienda]);
    var existeTienda = resultados[0].existe;

    if(existeUsuario) console.log('ERROR: Ya existe el usuario ' + registro.nombreUsuario);
    if(!existeTienda) console.log('ERROR: No existe la tienda');
    
    if(!existeUsuario && existeTienda) // Si no existe el usuario y si existe la tienda
    {
        try
        {
            await query('INSERT INTO usuarios SET ?', registro);
            console.log('Se hizo el alta del usuario: ' + registro.nombreUsuario);
        }
        catch(error) {console.log(error);}
    }
}

/************************** DATOS HARDCODEADOS PARA REALIZAR PRUEBAS ****************************/ 

async function cargaDatosDePrueba()
{

    // CARGA DE TIENDAS
    var registro =
    {
        codigoTienda: "sanji32542",
        direccion:    "Lacoste 1920",
        ciudad:       "Las Toninas",
        provincia:    "Buenos Aires",
        habilitado:   false
    }

    cargarTienda(registro);

    registro =
    {
        codigoTienda: "asdfgh987",
        direccion:    "Juan Justo 200",
        ciudad:       "Monte Chingolo",
        provincia:    "Buenos Aires",
        habilitado:   true
    }

    cargarTienda(registro);

    registro =
    {
        codigoTienda: "xcbewu13",
        direccion:    "Canarias 1850",
        ciudad:       "Ciudad de  Cordoba",
        provincia:    "Cordoba",
        habilitado:   true
    }

    cargarTienda(registro);

    // CARGA DE USUARIOS
    registro =
    {
        nombre: 'Pepe',
        apellido: 'Argento',
        nombreUsuario: 'El Pepo',
        contrasenia: '12345',
        habilitado: true,
        codigoTienda: 'sanji32542'
    }

    cargarUsuario(registro);

    registro =
    {
        nombre: 'Moni',
        apellido: 'Argento',
        nombreUsuario: 'La Peluca',
        contrasenia: 'qwerty',
        habilitado: true,
        codigoTienda: 'asdfgh987'
    }

    cargarUsuario(registro);


    registro =
    {
        nombre: 'Unlero',
        apellido: 'Sistemas',
        nombreUsuario: 'The One',
        contrasenia: 'fñnbqio_@748e5a',
        habilitado: false,
        codigoTienda: 'asdfgh987'
    }

    cargarUsuario(registro);

    registro =
    {
        nombre: 'Horacio',
        apellido: 'Hernandez',
        nombreUsuario: 'H-H',
        contrasenia: '564sdgf',
        habilitado: true,
        codigoTienda: 'sanji32542'
    }

    cargarUsuario(registro);

    // FALTAN LOS DATOS DE PRUEBA DE LOS PRODUCTOS. AGREGARLOS CUANDO ESTE TERMINADA LA BASE DE DATOS
}


cargaDatosDePrueba();