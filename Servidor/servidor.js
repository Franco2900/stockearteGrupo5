/*************************************** CONFIGURACIÓN GRPC **********************************************/
// Módulos para gRPC
const gRPC        = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path        = require('path');

var servidor = new gRPC.Server(); // Creo el servidor gRPC

/*************************************** LÓGICA DEL NEGOCIO PUNTO 1 *************************************************/
// Cargo el archivo proto del punto 1
var archivoProtoPunto1 = path.join(__dirname, '/../Protos/servicios_grpc_punto1.proto');

var packageDefinition = protoLoader.loadSync(archivoProtoPunto1, {});  // Cargo el archivo .proto y lo configuro. Acá no le configure nada pero si queremos podemos cargar opciones
const servicios_grpc_punto1_package = gRPC.loadPackageDefinition(packageDefinition).servicios_grpc_punto1_package; // Cargo el paquete

// Lógica Punto 1
const grpc_punto1 = require('./Logica/grpc_punto1.js');

const altaTienda           = grpc_punto1.altaTienda.bind({}); // bind() crea una nueva función que tiene el mismo comportamiento que la original
const bajaLogicaTienda     = grpc_punto1.bajaLogicaTienda.bind({}); // Como no se puede añadir el servicio directamente exportando desde el módulo, clono las funciones
const altaLogicaTienda     = grpc_punto1.altaLogicaTienda.bind({});

const altaUsuario          = grpc_punto1.altaUsuario.bind({});

const altaProducto         = grpc_punto1.altaProducto.bind({});
const modificacionProducto = grpc_punto1.modificacionProducto.bind({});


// Añado las funciones al servicio
servidor.addService(servicios_grpc_punto1_package.servicios_grpc_punto1_Service.service, { 
    
    altaTienda,
    bajaLogicaTienda,
    altaLogicaTienda,

    altaUsuario,
    
    altaProducto,
    modificacionProducto
});

/*************************************** LÓGICA DEL NEGOCIO PUNTO 2 *************************************************/
var archivoProtoPunto2 = path.join(__dirname, '/../Protos/servicios_grpc_punto2.proto');

var packageDefinition = protoLoader.loadSync(archivoProtoPunto2, {});                               
const servicios_grpc_punto2_package = gRPC.loadPackageDefinition(packageDefinition).servicios_grpc_punto2_package; 

// Lógica Punto 2
const grpc_punto2 = require('./Logica/grpc_punto2.js');

const buscarUsuario_X_Usuario      = grpc_punto2.buscarUsuario_X_Usuario.bind({});
const buscarUsuario_X_TiendaCodigo = grpc_punto2.buscarUsuario_X_TiendaCodigo.bind({});

const buscarTienda_X_TiendaCodigo  = grpc_punto2.buscarTienda_X_TiendaCodigo.bind({});
const buscarTienda_X_Habilitado    = grpc_punto2.buscarTienda_X_Habilitado.bind({});

servidor.addService(servicios_grpc_punto2_package.servicios_grpc_punto2_Service.service, { 

    buscarUsuario_X_Usuario,
    buscarUsuario_X_TiendaCodigo,

    buscarTienda_X_TiendaCodigo,
    buscarTienda_X_Habilitado
});

/*************************************** LÓGICA DEL NEGOCIO PUNTO 2 *************************************************/
var archivoProtoPunto3 = path.join(__dirname, '/../Protos/servicios_grpc_punto3.proto');

var packageDefinition = protoLoader.loadSync(archivoProtoPunto3, {});                               
const servicios_grpc_punto3_package = gRPC.loadPackageDefinition(packageDefinition).servicios_grpc_punto3_package; 

// Lógica Punto 3
const grpc_punto3 = require('./Logica/grpc_punto3.js');

const buscarTodosLosProductos = grpc_punto3.buscarTodosLosProductos.bind({});
const buscarTodosLosUsuarios  = grpc_punto3.buscarTodosLosUsuarios.bind({});
const buscarTodasLasTiendas   = grpc_punto3.buscarTodasLasTiendas.bind({});

servidor.addService(servicios_grpc_punto3_package.servicios_grpc_punto3_Service.service, { 

    buscarTodosLosProductos,
    buscarTodosLosUsuarios,
    buscarTodasLasTiendas
});

/**************************************** INICIO SERVIDOR GRPC ********************************************************/
// Enlazo el servidor a una dirección IP y un puerto y lo arranco
servidor.bindAsync("0.0.0.0:8000", gRPC.ServerCredentials.createInsecure(), () => {
    console.log('Servidor BackEnd Node.js iniciado');
});