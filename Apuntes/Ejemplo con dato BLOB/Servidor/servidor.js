const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path        = require('path');  // Módulo para escribir el path de los archivos
const mysql = require('mysql');
const generadorContrasenia = require('generate-password');

// Cargar el archivo .proto
var archivoProto = path.join(__dirname, '/../imagenBlob.proto'); // __dirname es el path del script .js

const packageDefinition = protoLoader.loadSync(archivoProto, {});

const serviciosStockearte = grpc.loadPackageDefinition(packageDefinition).stockearte;





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


// Implementar la función para manejar la solicitud EnviarImagen
async function altaProducto(call, callback) {
 
    // Acá van los datos que nos llegan del cliente desde gRPC
    const registro =
    {
        nombre: call.request.nombre,
        codigoProducto: generadorCodigo(),
        talle: call.request.talle,
        foto: call.request.foto, // SUPONGO QUE ACÁ VA EL NOMBRE DE LA FOTO O SU URL EN LA WEB
        color: call.request.color,
    }

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


/*****************************************************************************************************/

var servidor = new grpc.Server();

servidor.addService(serviciosStockearte.Stockearte.service, { 
    altaProducto
});

servidor.bindAsync("0.0.0.0:4000", grpc.ServerCredentials.createInsecure(), () => {
    console.log('Servidor Node.js iniciado');
});