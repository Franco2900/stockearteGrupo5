from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Optional as _Optional

DESCRIPTOR: _descriptor.FileDescriptor

class mensajeSimple(_message.Message):
    __slots__ = ("mensaje",)
    MENSAJE_FIELD_NUMBER: _ClassVar[int]
    mensaje: str
    def __init__(self, mensaje: _Optional[str] = ...) -> None: ...

class altaTiendaRequest(_message.Message):
    __slots__ = ("codigoTienda", "direccion", "ciudad", "provincia", "habilitado")
    CODIGOTIENDA_FIELD_NUMBER: _ClassVar[int]
    DIRECCION_FIELD_NUMBER: _ClassVar[int]
    CIUDAD_FIELD_NUMBER: _ClassVar[int]
    PROVINCIA_FIELD_NUMBER: _ClassVar[int]
    HABILITADO_FIELD_NUMBER: _ClassVar[int]
    codigoTienda: str
    direccion: str
    ciudad: str
    provincia: str
    habilitado: bool
    def __init__(self, codigoTienda: _Optional[str] = ..., direccion: _Optional[str] = ..., ciudad: _Optional[str] = ..., provincia: _Optional[str] = ..., habilitado: bool = ...) -> None: ...

class bajaTiendaRequest(_message.Message):
    __slots__ = ("codigoTienda",)
    CODIGOTIENDA_FIELD_NUMBER: _ClassVar[int]
    codigoTienda: str
    def __init__(self, codigoTienda: _Optional[str] = ...) -> None: ...

class altaUsuarioRequest(_message.Message):
    __slots__ = ("nombre", "apellido", "nombreUsuario", "contrasenia", "habilitado", "codigoTienda")
    NOMBRE_FIELD_NUMBER: _ClassVar[int]
    APELLIDO_FIELD_NUMBER: _ClassVar[int]
    NOMBREUSUARIO_FIELD_NUMBER: _ClassVar[int]
    CONTRASENIA_FIELD_NUMBER: _ClassVar[int]
    HABILITADO_FIELD_NUMBER: _ClassVar[int]
    CODIGOTIENDA_FIELD_NUMBER: _ClassVar[int]
    nombre: str
    apellido: str
    nombreUsuario: str
    contrasenia: str
    habilitado: bool
    codigoTienda: str
    def __init__(self, nombre: _Optional[str] = ..., apellido: _Optional[str] = ..., nombreUsuario: _Optional[str] = ..., contrasenia: _Optional[str] = ..., habilitado: bool = ..., codigoTienda: _Optional[str] = ...) -> None: ...

class altaProductoRequest(_message.Message):
    __slots__ = ("nombre", "codigoProducto", "talle", "foto", "color", "stock")
    NOMBRE_FIELD_NUMBER: _ClassVar[int]
    CODIGOPRODUCTO_FIELD_NUMBER: _ClassVar[int]
    TALLE_FIELD_NUMBER: _ClassVar[int]
    FOTO_FIELD_NUMBER: _ClassVar[int]
    COLOR_FIELD_NUMBER: _ClassVar[int]
    STOCK_FIELD_NUMBER: _ClassVar[int]
    nombre: str
    codigoProducto: str
    talle: str
    foto: str
    color: str
    stock: int
    def __init__(self, nombre: _Optional[str] = ..., codigoProducto: _Optional[str] = ..., talle: _Optional[str] = ..., foto: _Optional[str] = ..., color: _Optional[str] = ..., stock: _Optional[int] = ...) -> None: ...

class modificacionProductoRequest(_message.Message):
    __slots__ = ("codigoProducto", "nuevoStock")
    CODIGOPRODUCTO_FIELD_NUMBER: _ClassVar[int]
    NUEVOSTOCK_FIELD_NUMBER: _ClassVar[int]
    codigoProducto: str
    nuevoStock: int
    def __init__(self, codigoProducto: _Optional[str] = ..., nuevoStock: _Optional[int] = ...) -> None: ...
