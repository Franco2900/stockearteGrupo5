# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# NO CHECKED-IN PROTOBUF GENCODE
# source: serviciosStockearte.proto
# Protobuf Python Version: 5.27.2
"""Generated protocol buffer code."""
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import runtime_version as _runtime_version
from google.protobuf import symbol_database as _symbol_database
from google.protobuf.internal import builder as _builder
_runtime_version.ValidateProtobufRuntimeVersion(
    _runtime_version.Domain.PUBLIC,
    5,
    27,
    2,
    '',
    'serviciosStockearte.proto'
)
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()




DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\x19serviciosStockearte.proto\x12\x11stockeartePackage\" \n\rmensajeSimple\x12\x0f\n\x07mensaje\x18\x01 \x01(\t\"\x0e\n\x0cmensajeVacio\"\x99\x01\n\x11\x61ltaTiendaRequest\x12\x16\n\x0eusuarioCentral\x18\x01 \x01(\t\x12\x0e\n\x06\x63odigo\x18\x02 \x01(\t\x12\x11\n\tdireccion\x18\x03 \x01(\t\x12\x0e\n\x06\x63iudad\x18\x04 \x01(\t\x12\x11\n\tprovincia\x18\x05 \x01(\t\x12\x17\n\nhabilitado\x18\x06 \x01(\x08H\x00\x88\x01\x01\x42\r\n\x0b_habilitado\"J\n\x13\x62uscarTiendaRequest\x12\x16\n\x0eusuarioCentral\x18\x01 \x01(\t\x12\x1b\n\x13\x63odigoTiendaABuscar\x18\x02 \x01(\t\"\x98\x01\n\x06tienda\x12\x0e\n\x06\x63odigo\x18\x01 \x01(\t\x12\x11\n\tdireccion\x18\x02 \x01(\t\x12\x0e\n\x06\x63iudad\x18\x03 \x01(\t\x12\x11\n\tprovincia\x18\x04 \x01(\t\x12\x17\n\nhabilitado\x18\x05 \x01(\x08H\x00\x88\x01\x01\x12\x14\n\x07\x63\x65ntral\x18\x06 \x01(\x08H\x01\x88\x01\x01\x42\r\n\x0b_habilitadoB\n\n\x08_central\"C\n\x0e\x61rregloTiendas\x12\x31\n\x0e\x61rregloTiendas\x18\x01 \x03(\x0b\x32\x19.stockeartePackage.tienda\"\xc8\x01\n\x16modificarTiendaRequest\x12\x1e\n\x16\x63odigoTiendaAModificar\x18\x01 \x01(\t\x12\x0e\n\x06\x63odigo\x18\x02 \x01(\t\x12\x11\n\tdireccion\x18\x03 \x01(\t\x12\x0e\n\x06\x63iudad\x18\x04 \x01(\t\x12\x11\n\tprovincia\x18\x05 \x01(\t\x12\x17\n\nhabilitado\x18\x06 \x01(\x08H\x00\x88\x01\x01\x12\x14\n\x07\x63\x65ntral\x18\x07 \x01(\x08H\x01\x88\x01\x01\x42\r\n\x0b_habilitadoB\n\n\x08_central\"H\n\x10\x61rregloNovedades\x12\x34\n\x10\x61rregloNovedades\x18\x01 \x03(\x0b\x32\x1a.stockeartePackage.novedad\"U\n\x07novedad\x12\x0e\n\x06\x63odigo\x18\x01 \x01(\t\x12\x0e\n\x06nombre\x18\x02 \x01(\t\x12\r\n\x05talle\x18\x03 \x01(\t\x12\x0c\n\x04\x66oto\x18\x04 \x01(\t\x12\r\n\x05\x63olor\x18\x05 \x01(\t\"\xb0\x01\n\x12\x61ltaUsuarioRequest\x12\x16\n\x0eusuarioCentral\x18\x01 \x01(\t\x12\x0f\n\x07usuario\x18\x02 \x01(\t\x12\x10\n\x08password\x18\x03 \x01(\t\x12\x0e\n\x06nombre\x18\x04 \x01(\t\x12\x10\n\x08\x61pellido\x18\x05 \x01(\t\x12\x17\n\nhabilitado\x18\x06 \x01(\x08H\x00\x88\x01\x01\x12\x15\n\rtienda_codigo\x18\x07 \x01(\tB\r\n\x0b_habilitado\"Y\n\x14\x62uscarUsuarioRequest\x12\x16\n\x0eusuarioCentral\x18\x01 \x01(\t\x12\x16\n\x0eusuarioABuscar\x18\x02 \x01(\t\x12\x11\n\tidABuscar\x18\x03 \x01(\x05\"\x99\x01\n\x07usuario\x12\n\n\x02id\x18\x01 \x01(\x05\x12\x0f\n\x07usuario\x18\x02 \x01(\t\x12\x10\n\x08password\x18\x03 \x01(\t\x12\x0e\n\x06nombre\x18\x04 \x01(\t\x12\x10\n\x08\x61pellido\x18\x05 \x01(\t\x12\x17\n\nhabilitado\x18\x06 \x01(\x08H\x00\x88\x01\x01\x12\x15\n\rtienda_codigo\x18\x07 \x01(\tB\r\n\x0b_habilitado\"F\n\x0f\x61rregloUsuarios\x12\x33\n\x0f\x61rregloUsuarios\x18\x01 \x03(\x0b\x32\x1a.stockeartePackage.usuario\"\xb8\x01\n\x17modificarUsuarioRequest\x12\x19\n\x11usuarioAModificar\x18\x01 \x01(\t\x12\x0f\n\x07usuario\x18\x02 \x01(\t\x12\x10\n\x08password\x18\x03 \x01(\t\x12\x0e\n\x06nombre\x18\x04 \x01(\t\x12\x10\n\x08\x61pellido\x18\x05 \x01(\t\x12\x17\n\nhabilitado\x18\x06 \x01(\x08H\x00\x88\x01\x01\x12\x15\n\rtienda_codigo\x18\x07 \x01(\tB\r\n\x0b_habilitado\"\xa0\x01\n\x13\x61ltaProductoRequest\x12\x0e\n\x06nombre\x18\x01 \x01(\t\x12\x16\n\x0e\x63odigoProducto\x18\x02 \x01(\t\x12\r\n\x05talle\x18\x03 \x01(\t\x12\x0c\n\x04\x66oto\x18\x04 \x01(\x0c\x12\r\n\x05\x63olor\x18\x05 \x01(\t\x12\x35\n\x0ctiendaObject\x18\x06 \x03(\x0b\x32\x1f.stockeartePackage.TiendaObject\"\x1e\n\x0cTiendaObject\x12\x0e\n\x06\x63odigo\x18\x01 \x01(\t\"N\n\x15\x62uscarProductoRequest\x12\x16\n\x0eusuarioCentral\x18\x01 \x01(\t\x12\x1d\n\x15\x63odigoProductoABuscar\x18\x02 \x01(\t\"\x8b\x01\n\x08producto\x12\x0e\n\x06\x63odigo\x18\x01 \x01(\t\x12\x0e\n\x06nombre\x18\x02 \x01(\t\x12\r\n\x05talle\x18\x03 \x01(\t\x12\r\n\x05\x63olor\x18\x04 \x01(\t\x12\x0c\n\x04\x66oto\x18\x05 \x01(\x0c\x12\x15\n\rtienda_codigo\x18\x06 \x01(\t\x12\x12\n\x05stock\x18\x07 \x01(\x05H\x00\x88\x01\x01\x42\x08\n\x06_stock\"I\n\x10\x61rregloProductos\x12\x35\n\x10\x61rregloProductos\x18\x01 \x03(\x0b\x32\x1b.stockeartePackage.producto\"8\n\x1e\x62uscarTodosLosProductosRequest\x12\x16\n\x0eusuarioCentral\x18\x01 \x01(\t\"O\n\x12\x61rregloProductos_2\x12\x39\n\x12\x61rregloProductos_2\x18\x01 \x03(\x0b\x32\x1d.stockeartePackage.producto_2\"\x95\x01\n\nproducto_2\x12\x0e\n\x06\x63odigo\x18\x01 \x01(\t\x12\x0e\n\x06nombre\x18\x02 \x01(\t\x12\r\n\x05talle\x18\x03 \x01(\t\x12\r\n\x05\x63olor\x18\x04 \x01(\t\x12I\n\x16\x61rregloCodigosDeTienda\x18\x05 \x03(\x0b\x32).stockeartePackage.arregloCodigosDeTienda\"O\n\x12\x61rregloProductos_3\x12\x39\n\x12\x61rregloProductos_3\x18\x01 \x03(\x0b\x32\x1d.stockeartePackage.producto_3\"\x8c\x01\n\nproducto_3\x12\x0e\n\x06\x63odigo\x18\x01 \x01(\t\x12\x0e\n\x06nombre\x18\x02 \x01(\t\x12\r\n\x05talle\x18\x03 \x01(\t\x12\x0c\n\x04\x66oto\x18\x04 \x01(\x0c\x12\r\n\x05\x63olor\x18\x05 \x01(\t\x12\x14\n\x0c\x63odigoTienda\x18\x06 \x01(\t\x12\x12\n\x05stock\x18\x07 \x01(\x05H\x00\x88\x01\x01\x42\x08\n\x06_stock\"O\n\x12\x61rregloProductos_4\x12\x39\n\x12\x61rregloProductos_4\x18\x01 \x03(\x0b\x32\x1d.stockeartePackage.producto_4\"J\n\nproducto_4\x12\x0e\n\x06\x63odigo\x18\x01 \x01(\t\x12\x0e\n\x06nombre\x18\x02 \x01(\t\x12\r\n\x05talle\x18\x03 \x01(\t\x12\r\n\x05\x63olor\x18\x04 \x01(\t\".\n\x16\x61rregloCodigosDeTienda\x12\x14\n\x0c\x63odigoTienda\x18\x01 \x01(\t\"P\n\x15modificarStockRequest\x12\x0f\n\x07usuario\x18\x01 \x01(\t\x12\r\n\x05stock\x18\x02 \x01(\x05\x12\x17\n\x0fproducto_codigo\x18\x03 \x01(\t\"f\n\x18modificarProductoRequest\x12\x0e\n\x06\x63odigo\x18\x01 \x01(\t\x12\x0e\n\x06nombre\x18\x02 \x01(\t\x12\r\n\x05talle\x18\x03 \x01(\t\x12\x0c\n\x04\x66oto\x18\x04 \x01(\x0c\x12\r\n\x05\x63olor\x18\x05 \x01(\t\"Q\n!asignarYDesasignarProductoRequest\x12\x14\n\x0c\x63odigoTienda\x18\x01 \x01(\t\x12\x16\n\x0e\x63odigoProducto\x18\x02 \x01(\t\"%\n\x13\x62uscarCodigoRequest\x12\x0e\n\x06\x63odigo\x18\x01 \x01(\t\"\x1d\n\x0f\x62uscarIdRequest\x12\n\n\x02id\x18\x01 \x01(\x05\"6\n\x11hacerLoginRequest\x12\x0f\n\x07usuario\x18\x01 \x01(\t\x12\x10\n\x08password\x18\x02 \x01(\t\"\xba\x01\n\x12hacerLoginResponse\x12\x0f\n\x07usuario\x18\x01 \x01(\t\x12\x10\n\x08password\x18\x02 \x01(\t\x12\x0e\n\x06nombre\x18\x03 \x01(\t\x12\x10\n\x08\x61pellido\x18\x04 \x01(\t\x12\x17\n\nhabilitado\x18\x05 \x01(\x08H\x00\x88\x01\x01\x12\x15\n\rtienda_codigo\x18\x06 \x01(\t\x12\x14\n\x07\x63\x65ntral\x18\x07 \x01(\x08H\x01\x88\x01\x01\x42\r\n\x0b_habilitadoB\n\n\x08_central\"8\n\x1ftraerProductosDeLaTiendaRequest\x12\x15\n\rtienda_codigo\x18\x01 \x01(\t\"\x95\x01\n\x12productoDeLaTienda\x12\x0e\n\x06\x63odigo\x18\x01 \x01(\t\x12\x0e\n\x06nombre\x18\x02 \x01(\t\x12\r\n\x05talle\x18\x03 \x01(\t\x12\r\n\x05\x63olor\x18\x04 \x01(\t\x12\x0c\n\x04\x66oto\x18\x05 \x01(\x0c\x12\x15\n\rtienda_codigo\x18\x06 \x01(\t\x12\x12\n\x05stock\x18\x07 \x01(\x05H\x00\x88\x01\x01\x42\x08\n\x06_stock\"l\n traerProductosDeLaTiendaResponse\x12H\n\x19\x61rregloProductoDeLaTienda\x18\x01 \x03(\x0b\x32%.stockeartePackage.productoDeLaTienda\"Y\n\x18\x61ltaOrdenDeCompraRequest\x12\x15\n\rtienda_codigo\x18\x01 \x01(\t\x12&\n\x05items\x18\x02 \x03(\x0b\x32\x17.stockeartePackage.item\"I\n0traerOrdenesDeCompraAceptadasYConDespachoRequest\x12\x15\n\rtienda_codigo\x18\x01 \x01(\t\"b\n1traerOrdenesDeCompraAceptadasYConDespachoResponse\x12-\n\x0c\x61rregloItems\x18\x01 \x03(\x0b\x32\x17.stockeartePackage.item\"\xaf\x01\n\x04item\x12\x1f\n\x12id_orden_de_compra\x18\x01 \x01(\x05H\x00\x88\x01\x01\x12\x17\n\x0fproducto_codigo\x18\x02 \x01(\t\x12\r\n\x05\x63olor\x18\x03 \x01(\t\x12\r\n\x05talle\x18\x04 \x01(\t\x12 \n\x13\x63\x61ntidad_solicitada\x18\x05 \x01(\x05H\x01\x88\x01\x01\x42\x15\n\x13_id_orden_de_compraB\x16\n\x14_cantidad_solicitada\"P\n\x16\x61\x63\x65ptarDespachoRequest\x12\x1f\n\x12id_orden_de_compra\x18\x01 \x01(\x05H\x00\x88\x01\x01\x42\x15\n\x13_id_orden_de_compra\"\x9f\x01\n\x0bordenCompra\x12\x15\n\rtienda_codigo\x18\x01 \x01(\t\x12\x1a\n\x12id_orden_de_compra\x18\x02 \x01(\x05\x12\x0e\n\x06\x65stado\x18\x03 \x01(\t\x12\x15\n\robservaciones\x18\x04 \x01(\t\x12\x1a\n\x12\x66\x65\x63ha_de_solicitud\x18\x05 \x01(\t\x12\x1a\n\x12\x66\x65\x63ha_de_recepcion\x18\x06 \x01(\t\"Q\n\x13ordenCompraResponse\x12:\n\x12\x61rregloOrdenCompra\x18\x01 \x03(\x0b\x32\x1e.stockeartePackage.ordenCompra\"/\n\x11traerItemsRequest\x12\x1a\n\x12id_orden_de_compra\x18\x01 \x01(\x05\"C\n\x12traerItemsResponse\x12-\n\x0c\x61rregloItems\x18\x07 \x03(\x0b\x32\x17.stockeartePackage.item2\x92\x17\n\x11stockearteService\x12V\n\naltaTienda\x12$.stockeartePackage.altaTiendaRequest\x1a .stockeartePackage.mensajeSimple\"\x00\x12S\n\x0c\x62uscarTienda\x12&.stockeartePackage.buscarTiendaRequest\x1a\x19.stockeartePackage.tienda\"\x00\x12]\n\x15\x62uscarTodasLasTiendas\x12\x1f.stockeartePackage.mensajeVacio\x1a!.stockeartePackage.arregloTiendas\"\x00\x12`\n\x0fmodificarTienda\x12).stockeartePackage.modificarTiendaRequest\x1a .stockeartePackage.mensajeSimple\"\x00\x12X\n\x0etraerNovedades\x12\x1f.stockeartePackage.mensajeVacio\x1a#.stockeartePackage.arregloNovedades\"\x00\x12O\n\raltaNovedades\x12\x1a.stockeartePackage.novedad\x1a .stockeartePackage.mensajeSimple\"\x00\x12X\n\x0b\x61ltaUsuario\x12%.stockeartePackage.altaUsuarioRequest\x1a .stockeartePackage.mensajeSimple\"\x00\x12V\n\rbuscarUsuario\x12\'.stockeartePackage.buscarUsuarioRequest\x1a\x1a.stockeartePackage.usuario\"\x00\x12_\n\x16\x62uscarTodosLosUsuarios\x12\x1f.stockeartePackage.mensajeVacio\x1a\".stockeartePackage.arregloUsuarios\"\x00\x12\x62\n\x10modificarUsuario\x12*.stockeartePackage.modificarUsuarioRequest\x1a .stockeartePackage.mensajeSimple\"\x00\x12Z\n\x0c\x61ltaProducto\x12&.stockeartePackage.altaProductoRequest\x1a .stockeartePackage.mensajeSimple\"\x00\x12\x61\n\x0e\x62uscarProducto\x12(.stockeartePackage.buscarProductoRequest\x1a#.stockeartePackage.arregloProductos\"\x00\x12u\n\x17\x62uscarTodosLosProductos\x12\x31.stockeartePackage.buscarTodosLosProductosRequest\x1a%.stockeartePackage.arregloProductos_3\"\x00\x12^\n\x0emodificarStock\x12(.stockeartePackage.modificarStockRequest\x1a .stockeartePackage.mensajeSimple\"\x00\x12\x64\n\x11modificarProducto\x12+.stockeartePackage.modificarProductoRequest\x1a .stockeartePackage.mensajeSimple\"\x00\x12k\n\x0f\x61signarProducto\x12\x34.stockeartePackage.asignarYDesasignarProductoRequest\x1a .stockeartePackage.mensajeSimple\"\x00\x12n\n\x12\x64\x65sasignarProducto\x12\x34.stockeartePackage.asignarYDesasignarProductoRequest\x1a .stockeartePackage.mensajeSimple\"\x00\x12Z\n\x0etraerProductos\x12\x1f.stockeartePackage.mensajeVacio\x1a%.stockeartePackage.arregloProductos_4\"\x00\x12U\n\x11traerUsuarioPorId\x12\".stockeartePackage.buscarIdRequest\x1a\x1a.stockeartePackage.usuario\"\x00\x12[\n\x14traerTiendaPorCodigo\x12&.stockeartePackage.buscarCodigoRequest\x1a\x19.stockeartePackage.tienda\"\x00\x12_\n\x16traerProductoPorCodigo\x12&.stockeartePackage.buscarCodigoRequest\x1a\x1b.stockeartePackage.producto\"\x00\x12[\n\nhacerLogin\x12$.stockeartePackage.hacerLoginRequest\x1a%.stockeartePackage.hacerLoginResponse\"\x00\x12\x85\x01\n\x18traerProductosDeLaTienda\x12\x32.stockeartePackage.traerProductosDeLaTiendaRequest\x1a\x33.stockeartePackage.traerProductosDeLaTiendaResponse\"\x00\x12u\n\x16traerProductosNoTienda\x12\x32.stockeartePackage.traerProductosDeLaTiendaRequest\x1a%.stockeartePackage.arregloProductos_4\"\x00\x12\x64\n\x11\x61ltaOrdenDeCompra\x12+.stockeartePackage.altaOrdenDeCompraRequest\x1a .stockeartePackage.mensajeSimple\"\x00\x12\xb8\x01\n)traerOrdenesDeCompraAceptadasYConDespacho\x12\x43.stockeartePackage.traerOrdenesDeCompraAceptadasYConDespachoRequest\x1a\x44.stockeartePackage.traerOrdenesDeCompraAceptadasYConDespachoResponse\"\x00\x12`\n\x0f\x61\x63\x65ptarDespacho\x12).stockeartePackage.aceptarDespachoRequest\x1a .stockeartePackage.mensajeSimple\"\x00\x12g\n\x1atraerOrdenesDeCompraTienda\x12\x1f.stockeartePackage.TiendaObject\x1a&.stockeartePackage.ordenCompraResponse\"\x00\x12[\n\ntraerItems\x12$.stockeartePackage.traerItemsRequest\x1a%.stockeartePackage.traerItemsResponse\"\x00\x62\x06proto3')

_globals = globals()
_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, _globals)
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'serviciosStockearte_pb2', _globals)
if not _descriptor._USE_C_DESCRIPTORS:
  DESCRIPTOR._loaded_options = None
  _globals['_MENSAJESIMPLE']._serialized_start=48
  _globals['_MENSAJESIMPLE']._serialized_end=80
  _globals['_MENSAJEVACIO']._serialized_start=82
  _globals['_MENSAJEVACIO']._serialized_end=96
  _globals['_ALTATIENDAREQUEST']._serialized_start=99
  _globals['_ALTATIENDAREQUEST']._serialized_end=252
  _globals['_BUSCARTIENDAREQUEST']._serialized_start=254
  _globals['_BUSCARTIENDAREQUEST']._serialized_end=328
  _globals['_TIENDA']._serialized_start=331
  _globals['_TIENDA']._serialized_end=483
  _globals['_ARREGLOTIENDAS']._serialized_start=485
  _globals['_ARREGLOTIENDAS']._serialized_end=552
  _globals['_MODIFICARTIENDAREQUEST']._serialized_start=555
  _globals['_MODIFICARTIENDAREQUEST']._serialized_end=755
  _globals['_ARREGLONOVEDADES']._serialized_start=757
  _globals['_ARREGLONOVEDADES']._serialized_end=829
  _globals['_NOVEDAD']._serialized_start=831
  _globals['_NOVEDAD']._serialized_end=916
  _globals['_ALTAUSUARIOREQUEST']._serialized_start=919
  _globals['_ALTAUSUARIOREQUEST']._serialized_end=1095
  _globals['_BUSCARUSUARIOREQUEST']._serialized_start=1097
  _globals['_BUSCARUSUARIOREQUEST']._serialized_end=1186
  _globals['_USUARIO']._serialized_start=1189
  _globals['_USUARIO']._serialized_end=1342
  _globals['_ARREGLOUSUARIOS']._serialized_start=1344
  _globals['_ARREGLOUSUARIOS']._serialized_end=1414
  _globals['_MODIFICARUSUARIOREQUEST']._serialized_start=1417
  _globals['_MODIFICARUSUARIOREQUEST']._serialized_end=1601
  _globals['_ALTAPRODUCTOREQUEST']._serialized_start=1604
  _globals['_ALTAPRODUCTOREQUEST']._serialized_end=1764
  _globals['_TIENDAOBJECT']._serialized_start=1766
  _globals['_TIENDAOBJECT']._serialized_end=1796
  _globals['_BUSCARPRODUCTOREQUEST']._serialized_start=1798
  _globals['_BUSCARPRODUCTOREQUEST']._serialized_end=1876
  _globals['_PRODUCTO']._serialized_start=1879
  _globals['_PRODUCTO']._serialized_end=2018
  _globals['_ARREGLOPRODUCTOS']._serialized_start=2020
  _globals['_ARREGLOPRODUCTOS']._serialized_end=2093
  _globals['_BUSCARTODOSLOSPRODUCTOSREQUEST']._serialized_start=2095
  _globals['_BUSCARTODOSLOSPRODUCTOSREQUEST']._serialized_end=2151
  _globals['_ARREGLOPRODUCTOS_2']._serialized_start=2153
  _globals['_ARREGLOPRODUCTOS_2']._serialized_end=2232
  _globals['_PRODUCTO_2']._serialized_start=2235
  _globals['_PRODUCTO_2']._serialized_end=2384
  _globals['_ARREGLOPRODUCTOS_3']._serialized_start=2386
  _globals['_ARREGLOPRODUCTOS_3']._serialized_end=2465
  _globals['_PRODUCTO_3']._serialized_start=2468
  _globals['_PRODUCTO_3']._serialized_end=2608
  _globals['_ARREGLOPRODUCTOS_4']._serialized_start=2610
  _globals['_ARREGLOPRODUCTOS_4']._serialized_end=2689
  _globals['_PRODUCTO_4']._serialized_start=2691
  _globals['_PRODUCTO_4']._serialized_end=2765
  _globals['_ARREGLOCODIGOSDETIENDA']._serialized_start=2767
  _globals['_ARREGLOCODIGOSDETIENDA']._serialized_end=2813
  _globals['_MODIFICARSTOCKREQUEST']._serialized_start=2815
  _globals['_MODIFICARSTOCKREQUEST']._serialized_end=2895
  _globals['_MODIFICARPRODUCTOREQUEST']._serialized_start=2897
  _globals['_MODIFICARPRODUCTOREQUEST']._serialized_end=2999
  _globals['_ASIGNARYDESASIGNARPRODUCTOREQUEST']._serialized_start=3001
  _globals['_ASIGNARYDESASIGNARPRODUCTOREQUEST']._serialized_end=3082
  _globals['_BUSCARCODIGOREQUEST']._serialized_start=3084
  _globals['_BUSCARCODIGOREQUEST']._serialized_end=3121
  _globals['_BUSCARIDREQUEST']._serialized_start=3123
  _globals['_BUSCARIDREQUEST']._serialized_end=3152
  _globals['_HACERLOGINREQUEST']._serialized_start=3154
  _globals['_HACERLOGINREQUEST']._serialized_end=3208
  _globals['_HACERLOGINRESPONSE']._serialized_start=3211
  _globals['_HACERLOGINRESPONSE']._serialized_end=3397
  _globals['_TRAERPRODUCTOSDELATIENDAREQUEST']._serialized_start=3399
  _globals['_TRAERPRODUCTOSDELATIENDAREQUEST']._serialized_end=3455
  _globals['_PRODUCTODELATIENDA']._serialized_start=3458
  _globals['_PRODUCTODELATIENDA']._serialized_end=3607
  _globals['_TRAERPRODUCTOSDELATIENDARESPONSE']._serialized_start=3609
  _globals['_TRAERPRODUCTOSDELATIENDARESPONSE']._serialized_end=3717
  _globals['_ALTAORDENDECOMPRAREQUEST']._serialized_start=3719
  _globals['_ALTAORDENDECOMPRAREQUEST']._serialized_end=3808
  _globals['_TRAERORDENESDECOMPRAACEPTADASYCONDESPACHOREQUEST']._serialized_start=3810
  _globals['_TRAERORDENESDECOMPRAACEPTADASYCONDESPACHOREQUEST']._serialized_end=3883
  _globals['_TRAERORDENESDECOMPRAACEPTADASYCONDESPACHORESPONSE']._serialized_start=3885
  _globals['_TRAERORDENESDECOMPRAACEPTADASYCONDESPACHORESPONSE']._serialized_end=3983
  _globals['_ITEM']._serialized_start=3986
  _globals['_ITEM']._serialized_end=4161
  _globals['_ACEPTARDESPACHOREQUEST']._serialized_start=4163
  _globals['_ACEPTARDESPACHOREQUEST']._serialized_end=4243
  _globals['_ORDENCOMPRA']._serialized_start=4246
  _globals['_ORDENCOMPRA']._serialized_end=4405
  _globals['_ORDENCOMPRARESPONSE']._serialized_start=4407
  _globals['_ORDENCOMPRARESPONSE']._serialized_end=4488
  _globals['_TRAERITEMSREQUEST']._serialized_start=4490
  _globals['_TRAERITEMSREQUEST']._serialized_end=4537
  _globals['_TRAERITEMSRESPONSE']._serialized_start=4539
  _globals['_TRAERITEMSRESPONSE']._serialized_end=4606
  _globals['_STOCKEARTESERVICE']._serialized_start=4609
  _globals['_STOCKEARTESERVICE']._serialized_end=7571
# @@protoc_insertion_point(module_scope)
