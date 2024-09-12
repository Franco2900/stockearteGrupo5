/************************************ CONFIGURACIÓN DE LA BASE DE DATOS **********************************/
const mysql  = require('mysql');

var conexion = mysql.createConnection({ // Creo una conexión a la base de datos
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'basedeprueba'
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

/******************************* SUBIR IMAGEN A LA BASE DE DATOS ****************************************/
const fs   = require('fs');
const path = require('path');

async function subirImagen()
{
    var imagen = fs.readFileSync('Fotos_subidas/foto1.jpg');
    var nombre = path.basename('Fotos_subidas/foto1.jpg');

    var registro = {
        nombre: nombre,
        imagen: imagen
    }

    try 
    {
        await query('INSERT INTO imagen SET ?', registro);
        console.log('Imagen subida');
    }
    catch(error) 
    {
        console.log(error);
    }
}


async function bajarImagen()
{
    try 
    {
        var resultados = await query(`SELECT nombre, imagen FROM imagen WHERE nombre = 'foto1.jpg' `, {});
 
        if (resultados.length > 0) 
        {
            const nombre = resultados[0].nombre;
            const imagen = resultados[0].imagen;

            fs.writeFileSync(`Fotos_bajadas/${nombre}`, imagen); // Creo la imagen con los datos que me llegan de la base de datos
            // Si ya existe una imagen con el mismo nombre, la pisa

            console.log('Imagen descargada: ' + nombre);
        } 
        else console.log('Imagen no encontrada');
        
    }
    catch(error) 
    {
        console.log(error);
    }
}

//subirImagen();
bajarImagen();