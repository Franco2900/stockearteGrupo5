const gRPC        = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path        = require('path');

var archivoProto = path.join(__dirname, '/../persona.proto');

const packageDefinition = protoLoader.loadSync(archivoProto, {});                // Cargo el archivo .proto y lo configuro. Acá no le configure nada pero si queremos podemos cargar opciones
const personaPackage    = gRPC.loadPackageDefinition(packageDefinition).persona; // Cargo el paquete persona

/*****************************************************************************************************/
// DEFINICIÓN DE LA LÓGICA DE LOS MÉTODOS DECLARADOS EN EL ARCHIVO .PROTO

function saludar(call, callback){

    // Todas las funciones que usan gRPC tienen dos parametros: call y callback
    // En el lado del servidor, call se refiere a los datos que nos llegan (dentro del objeto Request)
    console.log(`Hola ${call.request.nombre}, ten un buen ${call.request.dia}`);

    // En el lado del servidor, callback es una función que se llama cuando se le envia la Response al cliente
    // La función callback tiene dos parametros:
        // El primer parametro es un objeto error (si ocurrió algún error) o null (si no ocurrió ningún error)
        // El segundo parametro es la respuesta (Response) del servidor
    var respuesta = {saludo: "Hola mundo"};
    return callback(null, respuesta); // Si no se ponen los datos de la respuesta en un objeto, el cliente va recibir una respuesta vacia y sin datos
}

/*****************************************************************************************************/

var servidor = new gRPC.Server(); // Creo el servidor gRPC

// Añado los métodos al servicio Persona
servidor.addService(personaPackage.Persona.service, { 
    saludar,
    decirEstadoDeAnimo
});

// Enlazo el servidor a una dirección IP y un puerto y lo arranco
servidor.bindAsync("0.0.0.0:4000", gRPC.ServerCredentials.createInsecure(), () => {
    servidor.start();
});