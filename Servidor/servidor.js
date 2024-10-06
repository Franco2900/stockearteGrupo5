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
// tiendaService
const tiendaService = require('./Logica/tiendaService.js');

const altaTienda            = tiendaService.altaTienda.bind({});   // bind() crea una nueva función que tiene el mismo comportamiento que la original
const buscarTienda          = tiendaService.buscarTienda.bind({}); // Como no se puede añadir el servicio directamente exportando desde el módulo, clono las funciones
const buscarTodasLasTiendas = tiendaService.buscarTodasLasTiendas.bind({});
const modificarTienda       = tiendaService.modificarTienda.bind({});
const traerNovedades        = tiendaService.traerNovedades.bind({});

// usuarioService
const usuarioService = require('./Logica/usuarioService.js');

const altaUsuario            = usuarioService.altaUsuario.bind({});
const buscarUsuario         = usuarioService.buscarUsuario.bind({});
const buscarTodosLosUsuarios = usuarioService.buscarTodosLosUsuarios.bind({});
const modificarUsuario       = usuarioService.modificarUsuario.bind({});

// productoService
const productoService = require('./Logica/productoService.js');

const altaProducto            = productoService.altaProducto.bind({});
const buscarProducto          = productoService.buscarProducto.bind({});
const buscarTodosLosProductos = productoService.buscarTodosLosProductos.bind({});
const modificarStock          = productoService.modificarStock.bind({});
const modificarProducto       = productoService.modificarProducto.bind({});
const asignarProducto         = productoService.asignarProducto.bind({});
const desasignarProducto      = productoService.desasignarProducto.bind({});


//Funciones complementarias
const traerUsuarioPorId        = usuarioService.traerUsuarioPorId.bind({});
const traerTiendaPorCodigo     = tiendaService.traerTiendaPorCodigo.bind({});
const traerProductoPorCodigo   = productoService.traerProductoPorCodigo.bind({});
const hacerLogin               = usuarioService.hacerLogin.bind({});
const traerProductosDeLaTienda = productoService.traerProductosDeLaTienda.bind({});


// Funciones proveedorService
/*const proveedorService = require('./Logica/proveedorService.js');

const traerNovedades  = proveedorService.traerNovedades.bind({});
const traerOrdenesDeCompraAceptadasYConDespacho = proveedorService.traerOrdenesDeCompraAceptadasYConDespacho.bind({});
const aceptarDespacho = proveedorService.aceptarDespacho.bind({});
proveedorService.consumirNovedades();   // Esto es una función automatica que va a estar todo el tiempo activa, no es para gRPC
proveedorService.consumirSolicitudes(); // Lo mismo
*/
// Añado las funciones al servicio
servidor.addService(stockeartePackage.stockearteService.service, { 

    // tiendaService
    altaTienda,
    buscarTienda,
    buscarTodasLasTiendas,
    modificarTienda,
    traerNovedades,

    // usuarioService
    altaUsuario,
    buscarUsuario,
    buscarTodosLosUsuarios,
    modificarUsuario,

    // productoService
    altaProducto,
    buscarProducto,
    buscarTodosLosProductos,
    modificarStock,
    modificarProducto,
    asignarProducto,
    desasignarProducto,

    // Funciones complementarias
    traerUsuarioPorId,
    traerTiendaPorCodigo,
    traerProductoPorCodigo,
    hacerLogin,
    traerProductosDeLaTienda,

    // proveedorService
    /*traerNovedades,
    traerOrdenesDeCompraAceptadasYConDespacho,
    aceptarDespacho*/
});


/**************************************** INICIO SERVIDOR GRPC ********************************************************/
// Enlazo el servidor a una dirección IP y un puerto y lo arranco
servidor.bindAsync("0.0.0.0:8000", gRPC.ServerCredentials.createInsecure(), () => {
    console.log('Servidor Tienda iniciado');
});