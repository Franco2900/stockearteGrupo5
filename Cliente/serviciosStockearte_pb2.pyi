from google.protobuf.internal import containers as _containers
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Iterable as _Iterable, Mapping as _Mapping, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class mensajeSimple(_message.Message):
    __slots__ = ("mensaje",)
    MENSAJE_FIELD_NUMBER: _ClassVar[int]
    mensaje: str
    def __init__(self, mensaje: _Optional[str] = ...) -> None: ...

class mensajeVacio(_message.Message):
    __slots__ = ()
    def __init__(self) -> None: ...

class altaTiendaRequest(_message.Message):
    __slots__ = ("usuarioCentral", "codigo", "direccion", "ciudad", "provincia", "habilitado")
    USUARIOCENTRAL_FIELD_NUMBER: _ClassVar[int]
    CODIGO_FIELD_NUMBER: _ClassVar[int]
    DIRECCION_FIELD_NUMBER: _ClassVar[int]
    CIUDAD_FIELD_NUMBER: _ClassVar[int]
    PROVINCIA_FIELD_NUMBER: _ClassVar[int]
    HABILITADO_FIELD_NUMBER: _ClassVar[int]
    usuarioCentral: str
    codigo: str
    direccion: str
    ciudad: str
    provincia: str
    habilitado: bool
    def __init__(self, usuarioCentral: _Optional[str] = ..., codigo: _Optional[str] = ..., direccion: _Optional[str] = ..., ciudad: _Optional[str] = ..., provincia: _Optional[str] = ..., habilitado: bool = ...) -> None: ...

class buscarTiendaRequest(_message.Message):
    __slots__ = ("usuarioCentral", "codigoTiendaABuscar")
    USUARIOCENTRAL_FIELD_NUMBER: _ClassVar[int]
    CODIGOTIENDAABUSCAR_FIELD_NUMBER: _ClassVar[int]
    usuarioCentral: str
    codigoTiendaABuscar: str
    def __init__(self, usuarioCentral: _Optional[str] = ..., codigoTiendaABuscar: _Optional[str] = ...) -> None: ...

class tienda(_message.Message):
    __slots__ = ("codigo", "direccion", "ciudad", "provincia", "habilitado", "central")
    CODIGO_FIELD_NUMBER: _ClassVar[int]
    DIRECCION_FIELD_NUMBER: _ClassVar[int]
    CIUDAD_FIELD_NUMBER: _ClassVar[int]
    PROVINCIA_FIELD_NUMBER: _ClassVar[int]
    HABILITADO_FIELD_NUMBER: _ClassVar[int]
    CENTRAL_FIELD_NUMBER: _ClassVar[int]
    codigo: str
    direccion: str
    ciudad: str
    provincia: str
    habilitado: bool
    central: bool
    def __init__(self, codigo: _Optional[str] = ..., direccion: _Optional[str] = ..., ciudad: _Optional[str] = ..., provincia: _Optional[str] = ..., habilitado: bool = ..., central: bool = ...) -> None: ...

class arregloTiendas(_message.Message):
    __slots__ = ("arregloTiendas",)
    ARREGLOTIENDAS_FIELD_NUMBER: _ClassVar[int]
    arregloTiendas: _containers.RepeatedCompositeFieldContainer[tienda]
    def __init__(self, arregloTiendas: _Optional[_Iterable[_Union[tienda, _Mapping]]] = ...) -> None: ...

class modificarTiendaRequest(_message.Message):
    __slots__ = ("codigoTiendaAModificar", "codigo", "direccion", "ciudad", "provincia", "habilitado", "central")
    CODIGOTIENDAAMODIFICAR_FIELD_NUMBER: _ClassVar[int]
    CODIGO_FIELD_NUMBER: _ClassVar[int]
    DIRECCION_FIELD_NUMBER: _ClassVar[int]
    CIUDAD_FIELD_NUMBER: _ClassVar[int]
    PROVINCIA_FIELD_NUMBER: _ClassVar[int]
    HABILITADO_FIELD_NUMBER: _ClassVar[int]
    CENTRAL_FIELD_NUMBER: _ClassVar[int]
    codigoTiendaAModificar: str
    codigo: str
    direccion: str
    ciudad: str
    provincia: str
    habilitado: bool
    central: bool
    def __init__(self, codigoTiendaAModificar: _Optional[str] = ..., codigo: _Optional[str] = ..., direccion: _Optional[str] = ..., ciudad: _Optional[str] = ..., provincia: _Optional[str] = ..., habilitado: bool = ..., central: bool = ...) -> None: ...

class altaUsuarioRequest(_message.Message):
    __slots__ = ("usuarioCentral", "usuario", "password", "nombre", "apellido", "habilitado", "tienda_codigo")
    USUARIOCENTRAL_FIELD_NUMBER: _ClassVar[int]
    USUARIO_FIELD_NUMBER: _ClassVar[int]
    PASSWORD_FIELD_NUMBER: _ClassVar[int]
    NOMBRE_FIELD_NUMBER: _ClassVar[int]
    APELLIDO_FIELD_NUMBER: _ClassVar[int]
    HABILITADO_FIELD_NUMBER: _ClassVar[int]
    TIENDA_CODIGO_FIELD_NUMBER: _ClassVar[int]
    usuarioCentral: str
    usuario: str
    password: str
    nombre: str
    apellido: str
    habilitado: bool
    tienda_codigo: str
    def __init__(self, usuarioCentral: _Optional[str] = ..., usuario: _Optional[str] = ..., password: _Optional[str] = ..., nombre: _Optional[str] = ..., apellido: _Optional[str] = ..., habilitado: bool = ..., tienda_codigo: _Optional[str] = ...) -> None: ...

class buscarUsuarioRequest(_message.Message):
    __slots__ = ("usuarioCentral", "usuarioABuscar", "idABuscar")
    USUARIOCENTRAL_FIELD_NUMBER: _ClassVar[int]
    USUARIOABUSCAR_FIELD_NUMBER: _ClassVar[int]
    IDABUSCAR_FIELD_NUMBER: _ClassVar[int]
    usuarioCentral: str
    usuarioABuscar: str
    idABuscar: int
    def __init__(self, usuarioCentral: _Optional[str] = ..., usuarioABuscar: _Optional[str] = ..., idABuscar: _Optional[int] = ...) -> None: ...

class usuario(_message.Message):
    __slots__ = ("id", "usuario", "password", "nombre", "apellido", "habilitado", "tienda_codigo")
    ID_FIELD_NUMBER: _ClassVar[int]
    USUARIO_FIELD_NUMBER: _ClassVar[int]
    PASSWORD_FIELD_NUMBER: _ClassVar[int]
    NOMBRE_FIELD_NUMBER: _ClassVar[int]
    APELLIDO_FIELD_NUMBER: _ClassVar[int]
    HABILITADO_FIELD_NUMBER: _ClassVar[int]
    TIENDA_CODIGO_FIELD_NUMBER: _ClassVar[int]
    id: int
    usuario: str
    password: str
    nombre: str
    apellido: str
    habilitado: bool
    tienda_codigo: str
    def __init__(self, id: _Optional[int] = ..., usuario: _Optional[str] = ..., password: _Optional[str] = ..., nombre: _Optional[str] = ..., apellido: _Optional[str] = ..., habilitado: bool = ..., tienda_codigo: _Optional[str] = ...) -> None: ...

class arregloUsuarios(_message.Message):
    __slots__ = ("arregloUsuarios",)
    ARREGLOUSUARIOS_FIELD_NUMBER: _ClassVar[int]
    arregloUsuarios: _containers.RepeatedCompositeFieldContainer[usuario]
    def __init__(self, arregloUsuarios: _Optional[_Iterable[_Union[usuario, _Mapping]]] = ...) -> None: ...

class modificarUsuarioRequest(_message.Message):
    __slots__ = ("usuarioAModificar", "usuario", "password", "nombre", "apellido", "habilitado", "tienda_codigo")
    USUARIOAMODIFICAR_FIELD_NUMBER: _ClassVar[int]
    USUARIO_FIELD_NUMBER: _ClassVar[int]
    PASSWORD_FIELD_NUMBER: _ClassVar[int]
    NOMBRE_FIELD_NUMBER: _ClassVar[int]
    APELLIDO_FIELD_NUMBER: _ClassVar[int]
    HABILITADO_FIELD_NUMBER: _ClassVar[int]
    TIENDA_CODIGO_FIELD_NUMBER: _ClassVar[int]
    usuarioAModificar: str
    usuario: str
    password: str
    nombre: str
    apellido: str
    habilitado: bool
    tienda_codigo: str
    def __init__(self, usuarioAModificar: _Optional[str] = ..., usuario: _Optional[str] = ..., password: _Optional[str] = ..., nombre: _Optional[str] = ..., apellido: _Optional[str] = ..., habilitado: bool = ..., tienda_codigo: _Optional[str] = ...) -> None: ...

class altaProductoRequest(_message.Message):
    __slots__ = ("nombre", "codigoProducto", "talle", "foto", "color", "tiendaObject")
    NOMBRE_FIELD_NUMBER: _ClassVar[int]
    CODIGOPRODUCTO_FIELD_NUMBER: _ClassVar[int]
    TALLE_FIELD_NUMBER: _ClassVar[int]
    FOTO_FIELD_NUMBER: _ClassVar[int]
    COLOR_FIELD_NUMBER: _ClassVar[int]
    TIENDAOBJECT_FIELD_NUMBER: _ClassVar[int]
    nombre: str
    codigoProducto: str
    talle: str
    foto: bytes
    color: str
    tiendaObject: _containers.RepeatedCompositeFieldContainer[TiendaObject]
    def __init__(self, nombre: _Optional[str] = ..., codigoProducto: _Optional[str] = ..., talle: _Optional[str] = ..., foto: _Optional[bytes] = ..., color: _Optional[str] = ..., tiendaObject: _Optional[_Iterable[_Union[TiendaObject, _Mapping]]] = ...) -> None: ...

class TiendaObject(_message.Message):
    __slots__ = ("codigo",)
    CODIGO_FIELD_NUMBER: _ClassVar[int]
    codigo: str
    def __init__(self, codigo: _Optional[str] = ...) -> None: ...

class buscarProductoRequest(_message.Message):
    __slots__ = ("usuarioCentral", "codigoProductoABuscar")
    USUARIOCENTRAL_FIELD_NUMBER: _ClassVar[int]
    CODIGOPRODUCTOABUSCAR_FIELD_NUMBER: _ClassVar[int]
    usuarioCentral: str
    codigoProductoABuscar: str
    def __init__(self, usuarioCentral: _Optional[str] = ..., codigoProductoABuscar: _Optional[str] = ...) -> None: ...

class producto(_message.Message):
    __slots__ = ("codigo", "nombre", "talle", "color", "foto", "tienda_codigo", "stock")
    CODIGO_FIELD_NUMBER: _ClassVar[int]
    NOMBRE_FIELD_NUMBER: _ClassVar[int]
    TALLE_FIELD_NUMBER: _ClassVar[int]
    COLOR_FIELD_NUMBER: _ClassVar[int]
    FOTO_FIELD_NUMBER: _ClassVar[int]
    TIENDA_CODIGO_FIELD_NUMBER: _ClassVar[int]
    STOCK_FIELD_NUMBER: _ClassVar[int]
    codigo: str
    nombre: str
    talle: str
    color: str
    foto: bytes
    tienda_codigo: str
    stock: int
    def __init__(self, codigo: _Optional[str] = ..., nombre: _Optional[str] = ..., talle: _Optional[str] = ..., color: _Optional[str] = ..., foto: _Optional[bytes] = ..., tienda_codigo: _Optional[str] = ..., stock: _Optional[int] = ...) -> None: ...

class arregloProductos(_message.Message):
    __slots__ = ("arregloProductos",)
    ARREGLOPRODUCTOS_FIELD_NUMBER: _ClassVar[int]
    arregloProductos: _containers.RepeatedCompositeFieldContainer[producto]
    def __init__(self, arregloProductos: _Optional[_Iterable[_Union[producto, _Mapping]]] = ...) -> None: ...

class buscarTodosLosProductosRequest(_message.Message):
    __slots__ = ("usuarioCentral",)
    USUARIOCENTRAL_FIELD_NUMBER: _ClassVar[int]
    usuarioCentral: str
    def __init__(self, usuarioCentral: _Optional[str] = ...) -> None: ...

class arregloProductos_2(_message.Message):
    __slots__ = ("arregloProductos_2",)
    ARREGLOPRODUCTOS_2_FIELD_NUMBER: _ClassVar[int]
    arregloProductos_2: _containers.RepeatedCompositeFieldContainer[producto_2]
    def __init__(self, arregloProductos_2: _Optional[_Iterable[_Union[producto_2, _Mapping]]] = ...) -> None: ...

class producto_2(_message.Message):
    __slots__ = ("codigo", "nombre", "talle", "color", "arregloCodigosDeTienda")
    CODIGO_FIELD_NUMBER: _ClassVar[int]
    NOMBRE_FIELD_NUMBER: _ClassVar[int]
    TALLE_FIELD_NUMBER: _ClassVar[int]
    COLOR_FIELD_NUMBER: _ClassVar[int]
    ARREGLOCODIGOSDETIENDA_FIELD_NUMBER: _ClassVar[int]
    codigo: str
    nombre: str
    talle: str
    color: str
    arregloCodigosDeTienda: _containers.RepeatedCompositeFieldContainer[arregloCodigosDeTienda]
    def __init__(self, codigo: _Optional[str] = ..., nombre: _Optional[str] = ..., talle: _Optional[str] = ..., color: _Optional[str] = ..., arregloCodigosDeTienda: _Optional[_Iterable[_Union[arregloCodigosDeTienda, _Mapping]]] = ...) -> None: ...

class arregloProductos_3(_message.Message):
    __slots__ = ("arregloProductos_3",)
    ARREGLOPRODUCTOS_3_FIELD_NUMBER: _ClassVar[int]
    arregloProductos_3: _containers.RepeatedCompositeFieldContainer[producto_3]
    def __init__(self, arregloProductos_3: _Optional[_Iterable[_Union[producto_3, _Mapping]]] = ...) -> None: ...

class producto_3(_message.Message):
    __slots__ = ("codigo", "nombre", "talle", "foto", "color", "codigoTienda", "stock")
    CODIGO_FIELD_NUMBER: _ClassVar[int]
    NOMBRE_FIELD_NUMBER: _ClassVar[int]
    TALLE_FIELD_NUMBER: _ClassVar[int]
    FOTO_FIELD_NUMBER: _ClassVar[int]
    COLOR_FIELD_NUMBER: _ClassVar[int]
    CODIGOTIENDA_FIELD_NUMBER: _ClassVar[int]
    STOCK_FIELD_NUMBER: _ClassVar[int]
    codigo: str
    nombre: str
    talle: str
    foto: bytes
    color: str
    codigoTienda: str
    stock: int
    def __init__(self, codigo: _Optional[str] = ..., nombre: _Optional[str] = ..., talle: _Optional[str] = ..., foto: _Optional[bytes] = ..., color: _Optional[str] = ..., codigoTienda: _Optional[str] = ..., stock: _Optional[int] = ...) -> None: ...

class arregloCodigosDeTienda(_message.Message):
    __slots__ = ("codigoTienda",)
    CODIGOTIENDA_FIELD_NUMBER: _ClassVar[int]
    codigoTienda: str
    def __init__(self, codigoTienda: _Optional[str] = ...) -> None: ...

class modificarStockRequest(_message.Message):
    __slots__ = ("usuario", "stock", "producto_codigo")
    USUARIO_FIELD_NUMBER: _ClassVar[int]
    STOCK_FIELD_NUMBER: _ClassVar[int]
    PRODUCTO_CODIGO_FIELD_NUMBER: _ClassVar[int]
    usuario: str
    stock: int
    producto_codigo: str
    def __init__(self, usuario: _Optional[str] = ..., stock: _Optional[int] = ..., producto_codigo: _Optional[str] = ...) -> None: ...

class modificarProductoRequest(_message.Message):
    __slots__ = ("codigo", "nombre", "talle", "foto", "color")
    CODIGO_FIELD_NUMBER: _ClassVar[int]
    NOMBRE_FIELD_NUMBER: _ClassVar[int]
    TALLE_FIELD_NUMBER: _ClassVar[int]
    FOTO_FIELD_NUMBER: _ClassVar[int]
    COLOR_FIELD_NUMBER: _ClassVar[int]
    codigo: str
    nombre: str
    talle: str
    foto: bytes
    color: str
    def __init__(self, codigo: _Optional[str] = ..., nombre: _Optional[str] = ..., talle: _Optional[str] = ..., foto: _Optional[bytes] = ..., color: _Optional[str] = ...) -> None: ...

class asignarYDesasignarProductoRequest(_message.Message):
    __slots__ = ("codigoTienda", "codigoProducto")
    CODIGOTIENDA_FIELD_NUMBER: _ClassVar[int]
    CODIGOPRODUCTO_FIELD_NUMBER: _ClassVar[int]
    codigoTienda: str
    codigoProducto: str
    def __init__(self, codigoTienda: _Optional[str] = ..., codigoProducto: _Optional[str] = ...) -> None: ...

class buscarCodigoRequest(_message.Message):
    __slots__ = ("codigo",)
    CODIGO_FIELD_NUMBER: _ClassVar[int]
    codigo: str
    def __init__(self, codigo: _Optional[str] = ...) -> None: ...

class buscarIdRequest(_message.Message):
    __slots__ = ("id",)
    ID_FIELD_NUMBER: _ClassVar[int]
    id: int
    def __init__(self, id: _Optional[int] = ...) -> None: ...

class hacerLoginRequest(_message.Message):
    __slots__ = ("usuario", "password")
    USUARIO_FIELD_NUMBER: _ClassVar[int]
    PASSWORD_FIELD_NUMBER: _ClassVar[int]
    usuario: str
    password: str
    def __init__(self, usuario: _Optional[str] = ..., password: _Optional[str] = ...) -> None: ...

class hacerLoginResponse(_message.Message):
    __slots__ = ("usuario", "password", "nombre", "apellido", "habilitado", "tienda_codigo", "central")
    USUARIO_FIELD_NUMBER: _ClassVar[int]
    PASSWORD_FIELD_NUMBER: _ClassVar[int]
    NOMBRE_FIELD_NUMBER: _ClassVar[int]
    APELLIDO_FIELD_NUMBER: _ClassVar[int]
    HABILITADO_FIELD_NUMBER: _ClassVar[int]
    TIENDA_CODIGO_FIELD_NUMBER: _ClassVar[int]
    CENTRAL_FIELD_NUMBER: _ClassVar[int]
    usuario: str
    password: str
    nombre: str
    apellido: str
    habilitado: bool
    tienda_codigo: str
    central: bool
    def __init__(self, usuario: _Optional[str] = ..., password: _Optional[str] = ..., nombre: _Optional[str] = ..., apellido: _Optional[str] = ..., habilitado: bool = ..., tienda_codigo: _Optional[str] = ..., central: bool = ...) -> None: ...

class traerProductosDeLaTiendaRequest(_message.Message):
    __slots__ = ("tienda_codigo",)
    TIENDA_CODIGO_FIELD_NUMBER: _ClassVar[int]
    tienda_codigo: str
    def __init__(self, tienda_codigo: _Optional[str] = ...) -> None: ...

class productoDeLaTienda(_message.Message):
    __slots__ = ("codigo", "nombre", "talle", "color", "foto", "tienda_codigo", "stock")
    CODIGO_FIELD_NUMBER: _ClassVar[int]
    NOMBRE_FIELD_NUMBER: _ClassVar[int]
    TALLE_FIELD_NUMBER: _ClassVar[int]
    COLOR_FIELD_NUMBER: _ClassVar[int]
    FOTO_FIELD_NUMBER: _ClassVar[int]
    TIENDA_CODIGO_FIELD_NUMBER: _ClassVar[int]
    STOCK_FIELD_NUMBER: _ClassVar[int]
    codigo: str
    nombre: str
    talle: str
    color: str
    foto: bytes
    tienda_codigo: str
    stock: int
    def __init__(self, codigo: _Optional[str] = ..., nombre: _Optional[str] = ..., talle: _Optional[str] = ..., color: _Optional[str] = ..., foto: _Optional[bytes] = ..., tienda_codigo: _Optional[str] = ..., stock: _Optional[int] = ...) -> None: ...

class traerProductosDeLaTiendaResponse(_message.Message):
    __slots__ = ("arregloProductoDeLaTienda",)
    ARREGLOPRODUCTODELATIENDA_FIELD_NUMBER: _ClassVar[int]
    arregloProductoDeLaTienda: _containers.RepeatedCompositeFieldContainer[productoDeLaTienda]
    def __init__(self, arregloProductoDeLaTienda: _Optional[_Iterable[_Union[productoDeLaTienda, _Mapping]]] = ...) -> None: ...

class traerNovedadesRequest(_message.Message):
    __slots__ = ("tienda_codigo",)
    TIENDA_CODIGO_FIELD_NUMBER: _ClassVar[int]
    tienda_codigo: str
    def __init__(self, tienda_codigo: _Optional[str] = ...) -> None: ...

class traerOrdenesDeCompraAceptadasYConDespachoRequest(_message.Message):
    __slots__ = ("tienda_codigo",)
    TIENDA_CODIGO_FIELD_NUMBER: _ClassVar[int]
    tienda_codigo: str
    def __init__(self, tienda_codigo: _Optional[str] = ...) -> None: ...

class traerOrdenesDeCompraAceptadasYConDespachoResponse(_message.Message):
    __slots__ = ()
    def __init__(self) -> None: ...
