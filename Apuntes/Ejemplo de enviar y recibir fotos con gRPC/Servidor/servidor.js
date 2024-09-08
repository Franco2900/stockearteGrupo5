const gRPC        = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path        = require('path');  // Módulo para escribir el path de los archivos
const fs          = require('fs');    // Módulo para leer o escribir archivos
const generadorContrasenias = require('generate-password'); // Módulo para generar contraseñas de forma automatica
const sharp       = require('sharp'); // Módulo para convertir las imagenes al formato que queramos

var archivoProto = path.join(__dirname, '/../imagen.proto'); // __dirname es el path del script .js

const packageDefinition = protoLoader.loadSync(archivoProto, {});                
const imagenPackage    = gRPC.loadPackageDefinition(packageDefinition).imagen; 

/*****************************************************************************************************/
// DEFINICIÓN DE LA LÓGICA DE LOS MÉTODOS DECLARADOS EN EL ARCHIVO .PROTO

function subirImagen(call, callback)
{
    var nombreImagen = generadorContrasenias.generate({
        length: 15,
        uppercase: true,
        lowercase: true,
        numbers: true,
        symbols: false
    });

    var imagen = call.request.imagen;
    var imagenPath = path.join(__dirname, `/Fotos/${nombreImagen}.jpg`); 


    sharp(imagen).jpeg().toFile(imagenPath, (error) => // Creo un archivo imagen con los bytes de la imagen que me llego y lo transformo en formato .jpg
    {
        if (error) 
        {
          console.error('Error al guardar la imagen: ', error);
          callback(null, { mensaje: 'Error al guardar la imagen' });
        } 
        else 
        {
          console.log('Imagen guardada en: ', imagenPath);
          callback(null, { mensaje: 'Imagen recibida y guardada correctamente' });
        }
    });

}


function bajarImagen(call, callback)
{
    console.log('Enviando imagen al cliente')

    var imagen = fs.readFileSync('foto1.jpg'); // readFileSync() lee un archivo de forma sincronica
    callback(null, { imagen: imagen });
}

/*****************************************************************************************************/

var servidor = new gRPC.Server();

servidor.addService(imagenPackage.Imagen.service, { 
    subirImagen,
    bajarImagen
});

servidor.bindAsync("0.0.0.0:4000", gRPC.ServerCredentials.createInsecure(), () => {
    console.log('Servidor Node.js iniciado');
});