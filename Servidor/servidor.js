/*************************************** CONFIGURACIÓN GRPC **********************************************/
// Módulos para gRPC
const gRPC        = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path        = require('path');

var servidor = new gRPC.Server(); // Creo el servidor gRPC

var archivoProto = path.join(__dirname, '/../Protos/serviciosStockearte.proto');

var packageDefinition = protoLoader.loadSync(archivoProto, {keepCase: true});  // Cargo el archivo .proto y lo configuro
const stockeartePackage = gRPC.loadPackageDefinition(packageDefinition).stockeartePackage; // Cargo el paquete

/*************************************** LÓGICA DEL NEGOCIO *************************************************/
// Lógica Punto 1
const grpc_punto1 = require('./Logica/grpc_punto1.js');

const altaTienda           = grpc_punto1.altaTienda.bind({}); // bind() crea una nueva función que tiene el mismo comportamiento que la original
const bajaLogicaTienda     = grpc_punto1.bajaLogicaTienda.bind({}); // Como no se puede añadir el servicio directamente exportando desde el módulo, clono las funciones
const altaLogicaTienda     = grpc_punto1.altaLogicaTienda.bind({});
const altaUsuario          = grpc_punto1.altaUsuario.bind({});
const altaProducto         = grpc_punto1.altaProducto.bind({});
const modificacionProducto = grpc_punto1.modificacionProducto.bind({});

// Lógica Punto 2
const grpc_punto2 = require('./Logica/grpc_punto2.js');

const buscarUsuario_X_Usuario      = grpc_punto2.buscarUsuario_X_Usuario.bind({});
const buscarUsuario_X_TiendaCodigo = grpc_punto2.buscarUsuario_X_TiendaCodigo.bind({});
const buscarTienda_X_TiendaCodigo  = grpc_punto2.buscarTienda_X_TiendaCodigo.bind({});
const buscarTienda_X_Habilitado    = grpc_punto2.buscarTienda_X_Habilitado.bind({});

// Lógica Punto 3
const grpc_punto3 = require('./Logica/grpc_punto3.js');

const buscarTodosLosProductos = grpc_punto3.buscarTodosLosProductos.bind({});
const buscarTodosLosUsuarios  = grpc_punto3.buscarTodosLosUsuarios.bind({});
const buscarTodasLasTiendas   = grpc_punto3.buscarTodasLasTiendas.bind({});

// Añado las funciones al servicio
servidor.addService(stockeartePackage.stockearteService.service, { 

    // Lógica Punto 1
    altaTienda,
    bajaLogicaTienda,
    altaLogicaTienda,
    altaUsuario,
    altaProducto,
    modificacionProducto,

    // Lógica Punto 2
    buscarUsuario_X_Usuario,
    buscarUsuario_X_TiendaCodigo,
    buscarTienda_X_TiendaCodigo,
    buscarTienda_X_Habilitado,

    // Lógica Punto 3
    buscarTodosLosProductos,
    buscarTodosLosUsuarios,
    buscarTodasLasTiendas
});

/**************************************** INICIO SERVIDOR GRPC ********************************************************/
// Enlazo el servidor a una dirección IP y un puerto y lo arranco
servidor.bindAsync("0.0.0.0:8000", gRPC.ServerCredentials.createInsecure(), () => {
    console.log('Servidor BackEnd Node.js iniciado');
});