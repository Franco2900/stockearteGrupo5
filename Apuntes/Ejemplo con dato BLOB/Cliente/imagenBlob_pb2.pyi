from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Optional as _Optional

DESCRIPTOR: _descriptor.FileDescriptor

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

class consultarProductoRequest(_message.Message):
    __slots__ = ("codigoProducto",)
    CODIGOPRODUCTO_FIELD_NUMBER: _ClassVar[int]
    codigoProducto: str
    def __init__(self, codigoProducto: _Optional[str] = ...) -> None: ...

class mensajeSimple(_message.Message):
    __slots__ = ("mensaje",)
    MENSAJE_FIELD_NUMBER: _ClassVar[int]
    mensaje: str
    def __init__(self, mensaje: _Optional[str] = ...) -> None: ...
