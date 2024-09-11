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
const grpc_punto2 = require('./grpc_punto2.js');

// Como no se puede añadir el servicio directamente exportando desde el módulo, clono las funciones

// Lógica Punto 1
const altaTienda           = grpc_punto1.altaTienda.bind({}); // bind() crea una nueva función que tiene el mismo comportamiento que la original
const bajaLogicaTienda     = grpc_punto1.bajaLogicaTienda.bind({});
const altaLogicaTienda     = grpc_punto1.altaLogicaTienda.bind({});

const altaUsuario          = grpc_punto1.altaUsuario.bind({});

const altaProducto         = grpc_punto1.altaProducto.bind({});
const modificacionProducto = grpc_punto1.modificacionProducto.bind({});

// Lógica Punto 2
const buscarUsuario_X_Usuario      = grpc_punto2.buscarUsuario_X_Usuario.bind({});
const buscarUsuario_X_TiendaCodigo = grpc_punto2.buscarUsuario_X_TiendaCodigo.bind({});

const buscarTienda_X_TiendaCodigo  = grpc_punto2.buscarTienda_X_TiendaCodigo.bind({});
const buscarTienda_X_Habilitado    = grpc_punto2.buscarTienda_X_Habilitado.bind({});

/**************************************** SERVIDOR GRPC ********************************************************/
var servidor = new gRPC.Server(); // Creo el servidor gRPC

// Añado los métodos al servicio Stockearte
servidor.addService(stockeartePackage.Stockearte.service, { 
    // Funciones punto 1
    altaTienda,
    bajaLogicaTienda,
    altaLogicaTienda,

    altaUsuario,
    
    altaProducto,
    modificacionProducto,

    // Funciones punto 2
    buscarUsuario_X_Usuario,
    buscarUsuario_X_TiendaCodigo,

    buscarTienda_X_TiendaCodigo,
    buscarTienda_X_Habilitado
});

// Enlazo el servidor a una dirección IP y un puerto y lo arranco
servidor.bindAsync("0.0.0.0:8000", gRPC.ServerCredentials.createInsecure(), () => {
    console.log('Servidor Node.js iniciado');
});