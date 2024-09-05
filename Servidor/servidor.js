/*************************************** CONFIGURACIÓN GRPC **********************************************/
// Módulos para gRPC
const gRPC        = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path        = require('path');

var archivoProto = path.join(__dirname, '/../serviciosStockearte.proto');

const packageDefinition = protoLoader.loadSync(archivoProto, {});                   // Cargo el archivo .proto y lo configuro. Acá no le configure nada pero si queremos podemos cargar opciones
const stockeartePackage = gRPC.loadPackageDefinition(packageDefinition).stockearte; // Cargo el paquete persona

/*************************************** LÓGICA DEL NEGOCIO *************************************************/
// Módulos con la lógica del negocio
const grpc_punto1 = require('./grpc_punto1.js');

// Como no se puede añadir el servicio directamente exportando desde el módulo, clono las funciones

const altaTienda   = grpc_punto1.altaTienda.bind({}); // bind() crea una nueva función que tiene el mismo comportamiento que la original
const bajaTienda   = grpc_punto1.bajaTienda.bind({});
const altaUsuario  = grpc_punto1.altaUsuario.bind({});
const altaProducto = grpc_punto1.altaProducto.bind({});
const modificacionProducto = grpc_punto1.modificacionProducto.bind({});

/**************************************** SERVIDOR GRPC ********************************************************/
var servidor = new gRPC.Server(); // Creo el servidor gRPC

// Añado los métodos al servicio Stockearte
servidor.addService(stockeartePackage.Stockearte.service, { 
    altaTienda,
    bajaTienda,
    altaUsuario,
    altaProducto,
    modificacionProducto
});

// Enlazo el servidor a una dirección IP y un puerto y lo arranco
servidor.bindAsync("0.0.0.0:8000", gRPC.ServerCredentials.createInsecure(), () => {
    servidor.start();
});