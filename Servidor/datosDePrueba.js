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

async function chequearExistencia(tabla, columna, valor) {
    const resultados = await query(`SELECT EXISTS(SELECT ${columna} FROM ${tabla} WHERE ${columna} = ?) AS existe`, [valor]);
    return resultados[0].existe;
}

async function cargarTienda(registro)
{
    var existeTienda = await chequearExistencia('tienda', 'codigo', registro.codigo);

    if(existeTienda) console.log('ERROR: Ya existe la tienda ' + registro.codigo);
    else
    {
        try
        {
            await query('INSERT INTO tienda SET ?', registro);
            console.log('Se hizo el alta de la tienda con el codigo: ' + registro.codigo);
        }
        catch(error) {console.log(error);}
    }
}


async function cargarUsuario(registro)
{
    const existeUsuario = await chequearExistencia('usuario', 'usuario', registro.usuario);
    const existeTienda  = await chequearExistencia('tienda', 'codigo', registro.tienda_codigo);

    if(existeUsuario) console.log('ERROR: Ya existe el usuario ' + registro.usuario);
    if(!existeTienda) console.log('ERROR: No existe la tienda');
    
    if(!existeUsuario && existeTienda) // Si no existe el usuario y si existe la tienda
    {
        try
        {
            await query('INSERT INTO usuario SET ?', registro);
            console.log('Se hizo el alta del usuario: ' + registro.usuario);
        }
        catch(error) {console.log(error);}
    }
}

/************************** DATOS HARDCODEADOS PARA REALIZAR PRUEBAS ****************************/ 

async function cargaDatosDePrueba()
{
    /*
    const tiendas = [
        { codigo: "sanji32542", direccion: "Lacoste 1920",   ciudad: "Las Toninas",       provincia: "Buenos Aires", habilitado: false },
        { codigo: "asdfgh987",  direccion: "Juan Justo 200", ciudad: "Monte Chingolo",    provincia: "Buenos Aires", habilitado: true },
        { codigo: "xcbewu13",   direccion: "Canarias 1850",  ciudad: "Ciudad de Cordoba", provincia: "Cordoba",      habilitado: true },
        { codigo: "pqr789xyz",  direccion: "Av. Libertador 3000", ciudad: "Buenos Aires", provincia: "Buenos Aires", habilitado: true },
        { codigo: "lmno456stu", direccion: "Calle Falsa 123", ciudad: "La Plata", provincia: "Buenos Aires", habilitado: false },
        { codigo: "wxyz123abc", direccion: "Avenida San Martín 456", ciudad: "Rosario", provincia: "Santa Fe", habilitado: true }
    ];

    for (const tienda of tiendas) {
        await cargarTienda(tienda);
    }*/
    /*
    const usuarios = [
        { nombre: 'Pepe',    apellido: 'Argento',   usuario: 'El Pepo',   password: '12345',           habilitado: true,  tienda_codigo: 'sanji32542' },
        { nombre: 'Moni',    apellido: 'Argento',   usuario: 'La Peluca', password: 'qwerty',          habilitado: true,  tienda_codigo: 'asdfgh987' },
        { nombre: 'Unlero',  apellido: 'Sistemas',  usuario: 'The One',   password: 'fñnbqio_@748e5a', habilitado: false, tienda_codigo: 'asdfgh987' },
        { nombre: 'Horacio', apellido: 'Hernandez', usuario: 'H-H',       password: '564sdgf',         habilitado: true,  tienda_codigo: 'sanji32542' }
    ];*/
    const usuarios = [
        { nombre: 'Pepe',    apellido: 'Argento',   usuario: 'El Pepo',   password: '12345', habilitado: true,  tienda_codigo: 'sanji32542' },
        { nombre: 'Ana',    apellido: 'Martínez', usuario: 'AnaM',     password: 'abc123', habilitado: true,  tienda_codigo: 'ewq22123s' },
        { nombre: 'Carlos', apellido: 'Gómez',    usuario: 'CarlosG', password: 'passw0rd', habilitado: false, tienda_codigo: 'xcbewu13' }
    ];
    
    for (const usuario of usuarios) {
        await cargarUsuario(usuario);
    }

    // FALTAN LOS DATOS DE PRUEBA DE LOS PRODUCTOS. AGREGARLOS CUANDO ESTE TERMINADA LA BASE DE DATOS
}


cargaDatosDePrueba();