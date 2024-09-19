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




DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\x19serviciosStockearte.proto\x12\x11stockeartePackage\" \n\rmensajeSimple\x12\x0f\n\x07mensaje\x18\x01 \x01(\t\"\x0e\n\x0cmensajeVacio\"\x8d\x01\n\x07usuario\x12\x0f\n\x07usuario\x18\x01 \x01(\t\x12\x10\n\x08password\x18\x02 \x01(\t\x12\x0e\n\x06nombre\x18\x03 \x01(\t\x12\x10\n\x08\x61pellido\x18\x04 \x01(\t\x12\x17\n\nhabilitado\x18\x05 \x01(\x08H\x00\x88\x01\x01\x12\x15\n\rtienda_codigo\x18\x06 \x01(\tB\r\n\x0b_habilitado\"F\n\x0f\x61rregloUsuarios\x12\x33\n\x0f\x61rregloUsuarios\x18\x01 \x03(\x0b\x32\x1a.stockeartePackage.usuario\"\x98\x01\n\x06tienda\x12\x0e\n\x06\x63odigo\x18\x01 \x01(\t\x12\x11\n\tdireccion\x18\x02 \x01(\t\x12\x0e\n\x06\x63iudad\x18\x03 \x01(\t\x12\x11\n\tprovincia\x18\x04 \x01(\t\x12\x17\n\nhabilitado\x18\x05 \x01(\x08H\x00\x88\x01\x01\x12\x14\n\x07\x63\x65ntral\x18\x06 \x01(\x08H\x01\x88\x01\x01\x42\r\n\x0b_habilitadoB\n\n\x08_central\"C\n\x0e\x61rregloTiendas\x12\x31\n\x0e\x61rregloTiendas\x18\x01 \x03(\x0b\x32\x19.stockeartePackage.tienda\"H\n\x08producto\x12\x0e\n\x06\x63odigo\x18\x01 \x01(\t\x12\x0e\n\x06nombre\x18\x02 \x01(\t\x12\r\n\x05talle\x18\x03 \x01(\t\x12\r\n\x05\x63olor\x18\x04 \x01(\t\"I\n\x10\x61rregloProductos\x12\x35\n\x10\x61rregloProductos\x18\x01 \x03(\x0b\x32\x1b.stockeartePackage.producto\"\x99\x01\n\x11\x61ltaTiendaRequest\x12\x16\n\x0eusuarioCentral\x18\x01 \x01(\t\x12\x0e\n\x06\x63odigo\x18\x02 \x01(\t\x12\x11\n\tdireccion\x18\x03 \x01(\t\x12\x0e\n\x06\x63iudad\x18\x04 \x01(\t\x12\x11\n\tprovincia\x18\x05 \x01(\t\x12\x17\n\nhabilitado\x18\x06 \x01(\x08H\x00\x88\x01\x01\x42\r\n\x0b_habilitado\")\n\x17\x62\x61jaLogicaTiendaRequest\x12\x0e\n\x06\x63odigo\x18\x01 \x01(\t\")\n\x17\x61ltaLogicaTiendaRequest\x12\x0e\n\x06\x63odigo\x18\x01 \x01(\t\"\xb0\x01\n\x12\x61ltaUsuarioRequest\x12\x16\n\x0eusuarioCentral\x18\x01 \x01(\t\x12\x0f\n\x07usuario\x18\x02 \x01(\t\x12\x10\n\x08password\x18\x03 \x01(\t\x12\x0e\n\x06nombre\x18\x04 \x01(\t\x12\x10\n\x08\x61pellido\x18\x05 \x01(\t\x12\x17\n\nhabilitado\x18\x06 \x01(\x08H\x00\x88\x01\x01\x12\x15\n\rtienda_codigo\x18\x07 \x01(\tB\r\n\x0b_habilitado\"\x1e\n\x0cTiendaObject\x12\x0e\n\x06\x63odigo\x18\x01 \x01(\t\"\xa0\x01\n\x13\x61ltaProductoRequest\x12\x0e\n\x06nombre\x18\x01 \x01(\t\x12\x16\n\x0e\x63odigoProducto\x18\x02 \x01(\t\x12\r\n\x05talle\x18\x03 \x01(\t\x12\x0c\n\x04\x66oto\x18\x04 \x01(\t\x12\r\n\x05\x63olor\x18\x05 \x01(\t\x12\x35\n\x0ctiendaObject\x18\x06 \x03(\x0b\x32\x1f.stockeartePackage.TiendaObject\"c\n\x14\x62uscarUsuarioRequest\x12\x16\n\x0eusuarioCentral\x18\x01 \x01(\t\x12\x16\n\x0eusuarioABuscar\x18\x02 \x01(\t\x12\x1b\n\x13\x63odigoTiendaABuscar\x18\x03 \x01(\t\"r\n\x13\x62uscarTiendaRequest\x12\x16\n\x0eusuarioCentral\x18\x01 \x01(\t\x12\x1b\n\x13\x63odigoTiendaABuscar\x18\x02 \x01(\t\x12\x17\n\nhabilitado\x18\x03 \x01(\x08H\x00\x88\x01\x01\x42\r\n\x0b_habilitado\"n\n\x16\x62uscarProductosRequest\x12\x16\n\x0eusuarioCentral\x18\x01 \x01(\t\x12\x0e\n\x06\x63odigo\x18\x02 \x01(\t\x12\x0e\n\x06nombre\x18\x03 \x01(\t\x12\r\n\x05talle\x18\x04 \x01(\t\x12\r\n\x05\x63olor\x18\x05 \x01(\t\"\xb8\x01\n\x17modificarUsuarioRequest\x12\x19\n\x11usuarioAModificar\x18\x01 \x01(\t\x12\x0f\n\x07usuario\x18\x02 \x01(\t\x12\x10\n\x08password\x18\x03 \x01(\t\x12\x0e\n\x06nombre\x18\x04 \x01(\t\x12\x10\n\x08\x61pellido\x18\x05 \x01(\t\x12\x17\n\nhabilitado\x18\x06 \x01(\x08H\x00\x88\x01\x01\x12\x15\n\rtienda_codigo\x18\x07 \x01(\tB\r\n\x0b_habilitado\"\xc2\x01\n\x16modificarTiendaRequest\x12\x18\n\x10tiendaAModificar\x18\x01 \x01(\t\x12\x0e\n\x06\x63odigo\x18\x02 \x01(\t\x12\x11\n\tdireccion\x18\x03 \x01(\t\x12\x0e\n\x06\x63iudad\x18\x04 \x01(\t\x12\x11\n\tprovincia\x18\x05 \x01(\t\x12\x17\n\nhabilitado\x18\x06 \x01(\x08H\x00\x88\x01\x01\x12\x14\n\x07\x63\x65ntral\x18\x07 \x01(\x08H\x01\x88\x01\x01\x42\r\n\x0b_habilitadoB\n\n\x08_central\"P\n\x15modificarStockRequest\x12\x0f\n\x07usuario\x18\x01 \x01(\t\x12\r\n\x05stock\x18\x02 \x01(\x05\x12\x17\n\x0fproducto_codigo\x18\x03 \x01(\t2\xd6\n\n\x11stockearteService\x12V\n\naltaTienda\x12$.stockeartePackage.altaTiendaRequest\x1a .stockeartePackage.mensajeSimple\"\x00\x12\x62\n\x10\x62\x61jaLogicaTienda\x12*.stockeartePackage.bajaLogicaTiendaRequest\x1a .stockeartePackage.mensajeSimple\"\x00\x12\x62\n\x10\x61ltaLogicaTienda\x12*.stockeartePackage.altaLogicaTiendaRequest\x1a .stockeartePackage.mensajeSimple\"\x00\x12X\n\x0b\x61ltaUsuario\x12%.stockeartePackage.altaUsuarioRequest\x1a .stockeartePackage.mensajeSimple\"\x00\x12Z\n\x0c\x61ltaProducto\x12&.stockeartePackage.altaProductoRequest\x1a .stockeartePackage.mensajeSimple\"\x00\x12_\n\x0e\x62uscarUsuarios\x12\'.stockeartePackage.buscarUsuarioRequest\x1a\".stockeartePackage.arregloUsuarios\"\x00\x12\\\n\rbuscarTiendas\x12&.stockeartePackage.buscarTiendaRequest\x1a!.stockeartePackage.arregloTiendas\"\x00\x12\x63\n\x0f\x62uscarProductos\x12).stockeartePackage.buscarProductosRequest\x1a#.stockeartePackage.arregloProductos\"\x00\x12\x61\n\x17\x62uscarTodosLosProductos\x12\x1f.stockeartePackage.mensajeVacio\x1a#.stockeartePackage.arregloProductos\"\x00\x12_\n\x16\x62uscarTodosLosUsuarios\x12\x1f.stockeartePackage.mensajeVacio\x1a\".stockeartePackage.arregloUsuarios\"\x00\x12]\n\x15\x62uscarTodasLasTiendas\x12\x1f.stockeartePackage.mensajeVacio\x1a!.stockeartePackage.arregloTiendas\"\x00\x12\x62\n\x10modificarUsuario\x12*.stockeartePackage.modificarUsuarioRequest\x1a .stockeartePackage.mensajeSimple\"\x00\x12`\n\x0fmodificarTienda\x12).stockeartePackage.modificarTiendaRequest\x1a .stockeartePackage.mensajeSimple\"\x00\x12^\n\x0emodificarStock\x12(.stockeartePackage.modificarStockRequest\x1a .stockeartePackage.mensajeSimple\"\x00\x62\x06proto3')

_globals = globals()
_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, _globals)
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'serviciosStockearte_pb2', _globals)
if not _descriptor._USE_C_DESCRIPTORS:
  DESCRIPTOR._loaded_options = None
  _globals['_MENSAJESIMPLE']._serialized_start=48
  _globals['_MENSAJESIMPLE']._serialized_end=80
  _globals['_MENSAJEVACIO']._serialized_start=82
  _globals['_MENSAJEVACIO']._serialized_end=96
  _globals['_USUARIO']._serialized_start=99
  _globals['_USUARIO']._serialized_end=240
  _globals['_ARREGLOUSUARIOS']._serialized_start=242
  _globals['_ARREGLOUSUARIOS']._serialized_end=312
  _globals['_TIENDA']._serialized_start=315
  _globals['_TIENDA']._serialized_end=467
  _globals['_ARREGLOTIENDAS']._serialized_start=469
  _globals['_ARREGLOTIENDAS']._serialized_end=536
  _globals['_PRODUCTO']._serialized_start=538
  _globals['_PRODUCTO']._serialized_end=610
  _globals['_ARREGLOPRODUCTOS']._serialized_start=612
  _globals['_ARREGLOPRODUCTOS']._serialized_end=685
  _globals['_ALTATIENDAREQUEST']._serialized_start=688
  _globals['_ALTATIENDAREQUEST']._serialized_end=841
  _globals['_BAJALOGICATIENDAREQUEST']._serialized_start=843
  _globals['_BAJALOGICATIENDAREQUEST']._serialized_end=884
  _globals['_ALTALOGICATIENDAREQUEST']._serialized_start=886
  _globals['_ALTALOGICATIENDAREQUEST']._serialized_end=927
  _globals['_ALTAUSUARIOREQUEST']._serialized_start=930
  _globals['_ALTAUSUARIOREQUEST']._serialized_end=1106
  _globals['_TIENDAOBJECT']._serialized_start=1108
  _globals['_TIENDAOBJECT']._serialized_end=1138
  _globals['_ALTAPRODUCTOREQUEST']._serialized_start=1141
  _globals['_ALTAPRODUCTOREQUEST']._serialized_end=1301
  _globals['_BUSCARUSUARIOREQUEST']._serialized_start=1303
  _globals['_BUSCARUSUARIOREQUEST']._serialized_end=1402
  _globals['_BUSCARTIENDAREQUEST']._serialized_start=1404
  _globals['_BUSCARTIENDAREQUEST']._serialized_end=1518
  _globals['_BUSCARPRODUCTOSREQUEST']._serialized_start=1520
  _globals['_BUSCARPRODUCTOSREQUEST']._serialized_end=1630
  _globals['_MODIFICARUSUARIOREQUEST']._serialized_start=1633
  _globals['_MODIFICARUSUARIOREQUEST']._serialized_end=1817
  _globals['_MODIFICARTIENDAREQUEST']._serialized_start=1820
  _globals['_MODIFICARTIENDAREQUEST']._serialized_end=2014
  _globals['_MODIFICARSTOCKREQUEST']._serialized_start=2016
  _globals['_MODIFICARSTOCKREQUEST']._serialized_end=2096
  _globals['_STOCKEARTESERVICE']._serialized_start=2099
  _globals['_STOCKEARTESERVICE']._serialized_end=3465
# @@protoc_insertion_point(module_scope)
