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




DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\x19serviciosStockearte.proto\x12\x11stockeartePackage\" \n\rmensajeSimple\x12\x0f\n\x07mensaje\x18\x01 \x01(\t\"\x0e\n\x0cmensajeVacio\"y\n\x07usuario\x12\x0f\n\x07usuario\x18\x01 \x01(\t\x12\x10\n\x08password\x18\x02 \x01(\t\x12\x0e\n\x06nombre\x18\x03 \x01(\t\x12\x10\n\x08\x61pellido\x18\x04 \x01(\t\x12\x12\n\nhabilitado\x18\x05 \x01(\x08\x12\x15\n\rtienda_codigo\x18\x06 \x01(\t\"F\n\x0f\x61rregloUsuarios\x12\x33\n\x0f\x61rregloUsuarios\x18\x01 \x03(\x0b\x32\x1a.stockeartePackage.usuario\"s\n\x06tienda\x12\x0e\n\x06\x63odigo\x18\x01 \x01(\t\x12\x11\n\tdireccion\x18\x02 \x01(\t\x12\x0e\n\x06\x63iudad\x18\x03 \x01(\t\x12\x11\n\tprovincia\x18\x04 \x01(\t\x12\x12\n\nhabilitado\x18\x05 \x01(\x08\x12\x0f\n\x07\x63\x65ntral\x18\x06 \x01(\x08\"C\n\x0e\x61rregloTiendas\x12\x31\n\x0e\x61rregloTiendas\x18\x01 \x03(\x0b\x32\x19.stockeartePackage.tienda\"_\n\x08producto\x12\x0e\n\x06\x63odigo\x18\x01 \x01(\t\x12\x0e\n\x06nombre\x18\x02 \x01(\t\x12\r\n\x05talle\x18\x03 \x01(\t\x12\r\n\x05\x63olor\x18\x04 \x01(\t\x12\x15\n\rtienda_codigo\x18\x05 \x01(\t\"I\n\x10\x61rregloProductos\x12\x35\n\x10\x61rregloProductos\x18\x01 \x03(\x0b\x32\x1b.stockeartePackage.producto\"D\n\x04prod\x12\x0e\n\x06\x63odigo\x18\x01 \x01(\t\x12\x0e\n\x06nombre\x18\x02 \x01(\t\x12\r\n\x05talle\x18\x03 \x01(\t\x12\r\n\x05\x63olor\x18\x04 \x01(\t\";\n\x0b\x61rregloProd\x12,\n\x0b\x61rregloProd\x18\x01 \x03(\x0b\x32\x17.stockeartePackage.prod\"\x85\x01\n\x11\x61ltaTiendaRequest\x12\x16\n\x0eusuarioCentral\x18\x01 \x01(\t\x12\x0e\n\x06\x63odigo\x18\x02 \x01(\t\x12\x11\n\tdireccion\x18\x03 \x01(\t\x12\x0e\n\x06\x63iudad\x18\x04 \x01(\t\x12\x11\n\tprovincia\x18\x05 \x01(\t\x12\x12\n\nhabilitado\x18\x06 \x01(\x08\")\n\x17\x62\x61jaLogicaTiendaRequest\x12\x0e\n\x06\x63odigo\x18\x01 \x01(\t\")\n\x17\x61ltaLogicaTiendaRequest\x12\x0e\n\x06\x63odigo\x18\x01 \x01(\t\"\x9c\x01\n\x12\x61ltaUsuarioRequest\x12\x16\n\x0eusuarioCentral\x18\x01 \x01(\t\x12\x0f\n\x07usuario\x18\x02 \x01(\t\x12\x10\n\x08password\x18\x03 \x01(\t\x12\x0e\n\x06nombre\x18\x04 \x01(\t\x12\x10\n\x08\x61pellido\x18\x05 \x01(\t\x12\x12\n\nhabilitado\x18\x06 \x01(\x08\x12\x15\n\rtienda_codigo\x18\x07 \x01(\t\"\x1e\n\x0cTiendaObject\x12\x0e\n\x06\x63odigo\x18\x01 \x01(\t\"\xa0\x01\n\x13\x61ltaProductoRequest\x12\x0e\n\x06nombre\x18\x01 \x01(\t\x12\x16\n\x0e\x63odigoProducto\x18\x02 \x01(\t\x12\r\n\x05talle\x18\x03 \x01(\t\x12\x0c\n\x04\x66oto\x18\x04 \x01(\t\x12\r\n\x05\x63olor\x18\x05 \x01(\t\x12\x35\n\x0ctiendaObject\x18\x06 \x03(\x0b\x32\x1f.stockeartePackage.TiendaObject\"c\n\x14\x62uscarUsuarioRequest\x12\x16\n\x0eusuarioCentral\x18\x01 \x01(\t\x12\x16\n\x0eusuarioABuscar\x18\x02 \x01(\t\x12\x1b\n\x13\x63odigoTiendaABuscar\x18\x03 \x01(\t\"M\n\x13\x62uscarTiendaRequest\x12\x16\n\x0eusuarioCentral\x18\x01 \x01(\t\x12\x0e\n\x06\x63odigo\x18\x02 \x01(\t\x12\x0e\n\x06\x65stado\x18\x03 \x01(\x08\"V\n\x16\x62uscarProductosRequest\x12\x0e\n\x06nombre\x18\x01 \x01(\t\x12\x0e\n\x06\x63odigo\x18\x02 \x01(\t\x12\r\n\x05talle\x18\x03 \x01(\t\x12\r\n\x05\x63olor\x18\x04 \x01(\t\"\xa4\x01\n\x17modificarUsuarioRequest\x12\x19\n\x11usuarioAModificar\x18\x01 \x01(\t\x12\x0f\n\x07usuario\x18\x02 \x01(\t\x12\x10\n\x08password\x18\x03 \x01(\t\x12\x0e\n\x06nombre\x18\x04 \x01(\t\x12\x10\n\x08\x61pellido\x18\x05 \x01(\t\x12\x12\n\nhabilitado\x18\x06 \x01(\x08\x12\x15\n\rtienda_codigo\x18\x07 \x01(\t\"\x9d\x01\n\x16modificarTiendaRequest\x12\x18\n\x10tiendaAModificar\x18\x01 \x01(\t\x12\x0e\n\x06\x63odigo\x18\x02 \x01(\t\x12\x11\n\tdireccion\x18\x03 \x01(\t\x12\x0e\n\x06\x63iudad\x18\x04 \x01(\t\x12\x11\n\tprovincia\x18\x05 \x01(\t\x12\x12\n\nhabilitado\x18\x06 \x01(\x08\x12\x0f\n\x07\x63\x65ntral\x18\x07 \x01(\x08\"P\n\x15modificarStockRequest\x12\x0f\n\x07usuario\x18\x01 \x01(\t\x12\r\n\x05stock\x18\x02 \x01(\x05\x12\x17\n\x0fproducto_codigo\x18\x03 \x01(\t2\xd1\n\n\x11stockearteService\x12V\n\naltaTienda\x12$.stockeartePackage.altaTiendaRequest\x1a .stockeartePackage.mensajeSimple\"\x00\x12\x62\n\x10\x62\x61jaLogicaTienda\x12*.stockeartePackage.bajaLogicaTiendaRequest\x1a .stockeartePackage.mensajeSimple\"\x00\x12\x62\n\x10\x61ltaLogicaTienda\x12*.stockeartePackage.altaLogicaTiendaRequest\x1a .stockeartePackage.mensajeSimple\"\x00\x12X\n\x0b\x61ltaUsuario\x12%.stockeartePackage.altaUsuarioRequest\x1a .stockeartePackage.mensajeSimple\"\x00\x12Z\n\x0c\x61ltaProducto\x12&.stockeartePackage.altaProductoRequest\x1a .stockeartePackage.mensajeSimple\"\x00\x12_\n\x0e\x62uscarUsuarios\x12\'.stockeartePackage.buscarUsuarioRequest\x1a\".stockeartePackage.arregloUsuarios\"\x00\x12\\\n\rbuscarTiendas\x12&.stockeartePackage.buscarTiendaRequest\x1a!.stockeartePackage.arregloTiendas\"\x00\x12^\n\x0f\x62uscarProductos\x12).stockeartePackage.buscarProductosRequest\x1a\x1e.stockeartePackage.arregloProd\"\x00\x12\x61\n\x17\x62uscarTodosLosProductos\x12\x1f.stockeartePackage.mensajeVacio\x1a#.stockeartePackage.arregloProductos\"\x00\x12_\n\x16\x62uscarTodosLosUsuarios\x12\x1f.stockeartePackage.mensajeVacio\x1a\".stockeartePackage.arregloUsuarios\"\x00\x12]\n\x15\x62uscarTodasLasTiendas\x12\x1f.stockeartePackage.mensajeVacio\x1a!.stockeartePackage.arregloTiendas\"\x00\x12\x62\n\x10modificarUsuario\x12*.stockeartePackage.modificarUsuarioRequest\x1a .stockeartePackage.mensajeSimple\"\x00\x12`\n\x0fmodificarTienda\x12).stockeartePackage.modificarTiendaRequest\x1a .stockeartePackage.mensajeSimple\"\x00\x12^\n\x0emodificarStock\x12(.stockeartePackage.modificarStockRequest\x1a .stockeartePackage.mensajeSimple\"\x00\x62\x06proto3')

_globals = globals()
_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, _globals)
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'serviciosStockearte_pb2', _globals)
if not _descriptor._USE_C_DESCRIPTORS:
  DESCRIPTOR._loaded_options = None
  _globals['_MENSAJESIMPLE']._serialized_start=48
  _globals['_MENSAJESIMPLE']._serialized_end=80
  _globals['_MENSAJEVACIO']._serialized_start=82
  _globals['_MENSAJEVACIO']._serialized_end=96
  _globals['_USUARIO']._serialized_start=98
  _globals['_USUARIO']._serialized_end=219
  _globals['_ARREGLOUSUARIOS']._serialized_start=221
  _globals['_ARREGLOUSUARIOS']._serialized_end=291
  _globals['_TIENDA']._serialized_start=293
  _globals['_TIENDA']._serialized_end=408
  _globals['_ARREGLOTIENDAS']._serialized_start=410
  _globals['_ARREGLOTIENDAS']._serialized_end=477
  _globals['_PRODUCTO']._serialized_start=479
  _globals['_PRODUCTO']._serialized_end=574
  _globals['_ARREGLOPRODUCTOS']._serialized_start=576
  _globals['_ARREGLOPRODUCTOS']._serialized_end=649
  _globals['_PROD']._serialized_start=651
  _globals['_PROD']._serialized_end=719
  _globals['_ARREGLOPROD']._serialized_start=721
  _globals['_ARREGLOPROD']._serialized_end=780
  _globals['_ALTATIENDAREQUEST']._serialized_start=783
  _globals['_ALTATIENDAREQUEST']._serialized_end=916
  _globals['_BAJALOGICATIENDAREQUEST']._serialized_start=918
  _globals['_BAJALOGICATIENDAREQUEST']._serialized_end=959
  _globals['_ALTALOGICATIENDAREQUEST']._serialized_start=961
  _globals['_ALTALOGICATIENDAREQUEST']._serialized_end=1002
  _globals['_ALTAUSUARIOREQUEST']._serialized_start=1005
  _globals['_ALTAUSUARIOREQUEST']._serialized_end=1161
  _globals['_TIENDAOBJECT']._serialized_start=1163
  _globals['_TIENDAOBJECT']._serialized_end=1193
  _globals['_ALTAPRODUCTOREQUEST']._serialized_start=1196
  _globals['_ALTAPRODUCTOREQUEST']._serialized_end=1356
  _globals['_BUSCARUSUARIOREQUEST']._serialized_start=1358
  _globals['_BUSCARUSUARIOREQUEST']._serialized_end=1457
  _globals['_BUSCARTIENDAREQUEST']._serialized_start=1459
  _globals['_BUSCARTIENDAREQUEST']._serialized_end=1536
  _globals['_BUSCARPRODUCTOSREQUEST']._serialized_start=1538
  _globals['_BUSCARPRODUCTOSREQUEST']._serialized_end=1624
  _globals['_MODIFICARUSUARIOREQUEST']._serialized_start=1627
  _globals['_MODIFICARUSUARIOREQUEST']._serialized_end=1791
  _globals['_MODIFICARTIENDAREQUEST']._serialized_start=1794
  _globals['_MODIFICARTIENDAREQUEST']._serialized_end=1951
  _globals['_MODIFICARSTOCKREQUEST']._serialized_start=1953
  _globals['_MODIFICARSTOCKREQUEST']._serialized_end=2033
  _globals['_STOCKEARTESERVICE']._serialized_start=2036
  _globals['_STOCKEARTESERVICE']._serialized_end=3397
# @@protoc_insertion_point(module_scope)
