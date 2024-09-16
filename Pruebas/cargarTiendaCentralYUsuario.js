/************************************ CONFIGURACIÓN DE LA BASE DE DATOS **********************************/
const conexionDataBase = require('../Servidor/Logica/conexionDataBase.js');

/************************************ FUNCIONES DE CARGA DE DATOS **********************************/

async function chequearExistencia(tabla, columna, valor) {
    const resultados = await conexionDataBase.query(`SELECT EXISTS(SELECT ${columna} FROM ${tabla} WHERE ${columna} = ?) AS existe`, [valor]);
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
            await conexionDataBase.query('INSERT INTO tienda SET ?', registro);
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
            await conexionDataBase.query('INSERT INTO usuario SET ?', registro);
            console.log('Se hizo el alta del usuario: ' + registro.usuario);
        }
        catch(error) {console.log(error);}
    }
}

/************************** DATOS HARDCODEADOS  ****************************/ 

async function cargarTiendaCentralYUsuario()
{
    console.log('Cargando la tienda central y un usuario de dicha tienda para que la administre');

    const tiendas = [
        { codigo: "sanji32542", direccion: "Lacoste 1920", ciudad: "Las Toninas", provincia: "Buenos Aires", habilitado: false, central: true },
    ];

    for (const tienda of tiendas) {
        await cargarTienda(tienda);
    }
    
    const usuarios = [
        { nombre: 'Pepe', apellido: 'Argento', usuario: 'Racing Campeon', password: '1967', habilitado: true,  tienda_codigo: 'sanji32542' },
    ];
    
    for (const usuario of usuarios) {
        await cargarUsuario(usuario);
    }
 
}

cargarTiendaCentralYUsuario();