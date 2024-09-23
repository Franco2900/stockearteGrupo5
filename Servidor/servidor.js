/*************************************** CONFIGURACIÓN GRPC **********************************************/
// Módulos para gRPC
const gRPC        = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path        = require('path');

var servidor = new gRPC.Server(); // Creo el servidor gRPC

var archivoProto = path.join(__dirname, '/../Protos/serviciosStockearte.proto');

var packageDefinition = protoLoader.loadSync(archivoProto, {keepCase: true, defaults: true});  // Cargo el archivo .proto y lo configuro
// keepTrue mantiene los nombres de los campos tal como están en el archivo .proto
// defaults incluye valores predeterminados para los campos que no están presentes en el mensaje recibido, asegurando que todos los campos tengan un valor, incluso si no se envían explícitamente
const stockeartePackage = gRPC.loadPackageDefinition(packageDefinition).stockeartePackage;     // Cargo el paquete

/*************************************** LÓGICA DEL NEGOCIO *************************************************/
// Lógica Punto 1
const grpc_punto1 = require('./Logica/grpc_punto1.js');

const altaTienda        = grpc_punto1.altaTienda.bind({}); // bind() crea una nueva función que tiene el mismo comportamiento que la original
const bajaLogicaTienda  = grpc_punto1.bajaLogicaTienda.bind({}); // Como no se puede añadir el servicio directamente exportando desde el módulo, clono las funciones
const altaLogicaTienda  = grpc_punto1.altaLogicaTienda.bind({});
const altaUsuario       = grpc_punto1.altaUsuario.bind({});
const altaProducto      = grpc_punto1.altaProducto.bind({});
//const modificacionProducto = grpc_punto1.modificacionProducto.bind({}); // SACAR DE ACÁ PORQUE ESTA REPETIDO EN EL PUNTO 4.C

// Lógica Punto 2
const grpc_punto2 = require('./Logica/grpc_punto2.js');

//const buscarUsuario_X_Usuario      = grpc_punto2.buscarUsuario_X_Usuario.bind({});
//const buscarUsuario_X_TiendaCodigo = grpc_punto2.buscarUsuario_X_TiendaCodigo.bind({});
const buscarUsuarios                 = grpc_punto2.buscarUsuarios.bind({});
//const buscarTienda_X_TiendaCodigo  = grpc_punto2.buscarTienda_X_TiendaCodigo.bind({});
//const buscarTienda_X_Habilitado    = grpc_punto2.buscarTienda_X_Habilitado.bind({});
const buscarTiendas                  =  grpc_punto2.buscarTiendas.bind({});
//const buscarProducto_X_Nombre      = grpc_punto2.buscarProducto_X_Nombre.bind({});
//const buscarProducto_X_Codigo      = grpc_punto2.buscarProducto_X_Codigo.bind({});
//const buscarProducto_X_Talle       = grpc_punto2.buscarProducto_X_Talle.bind({});
//const buscarProducto_X_Color       = grpc_punto2.buscarProducto_X_Color.bind({});
const buscarProductos                = grpc_punto2.buscarProductos.bind({});

// Lógica Punto 3
const grpc_punto3 = require('./Logica/grpc_punto3.js');

const buscarTodosLosProductos = grpc_punto3.buscarTodosLosProductos.bind({});
const buscarTodosLosUsuarios  = grpc_punto3.buscarTodosLosUsuarios.bind({});
const buscarTodasLasTiendas   = grpc_punto3.buscarTodasLasTiendas.bind({});

// Loógica Punto 4
const grpc_punto4 = require('./Logica/grpc_punto4.js');

const modificarUsuario  = grpc_punto4.modificarUsuario.bind({});
const modificarTienda   = grpc_punto4.modificarTienda.bind({});
const modificarStock    = grpc_punto4.modificarStock.bind({});
const modificarProducto = grpc_punto4.modificarProducto.bind({});


//Funciones complementarias
const grpc_complementario = require('./Logica/grpc_complementario.js');

const traerUsuarioPorId        = grpc_complementario.traerUsuarioPorId.bind({});
const traerTiendaPorCodigo     = grpc_complementario.traerTiendaPorCodigo.bind({});
const traerProductoPorCodigo   = grpc_complementario.traerProductoPorCodigo.bind({});
const hacerLogin               = grpc_complementario.hacerLogin.bind({});
const traerProductosDeLaTienda = grpc_complementario.traerProductosDeLaTienda.bind({});


// Añado las funciones al servicio
servidor.addService(stockeartePackage.stockearteService.service, { 


    // Lógica Punto 1: Altas
    altaTienda,
    bajaLogicaTienda,
    altaLogicaTienda,
    altaUsuario,
    altaProducto,
    //modificacionProducto,

    // Lógica Punto 2: Busquedas especificas
    //buscarUsuario_X_Usuario,
    //buscarUsuario_X_TiendaCodigo,
    buscarUsuarios,
    //buscarTienda_X_TiendaCodigo,
    //buscarTienda_X_Habilitado,
    buscarTiendas,
    //buscarProducto_X_Nombre,
    //buscarProducto_X_Codigo,
    //buscarProducto_X_Talle,
    //buscarProducto_X_Color, 
    buscarProductos,

    // Lógica Punto 3: Listados
    buscarTodosLosProductos,
    buscarTodosLosUsuarios,
    buscarTodasLasTiendas,

    // Lógica Punto 4: Modificaciones
    modificarUsuario,
    modificarTienda,
    modificarStock,
    modificarProducto,

    //Funciones complementarias
    traerUsuarioPorId,
    traerTiendaPorCodigo,
    traerProductoPorCodigo,
    hacerLogin,
    traerProductosDeLaTienda
});

/**************************************** INICIO SERVIDOR GRPC ********************************************************/
// Enlazo el servidor a una dirección IP y un puerto y lo arranco
servidor.bindAsync("0.0.0.0:8000", gRPC.ServerCredentials.createInsecure(), () => {
    console.log('Servidor BackEnd Node.js iniciado');
});