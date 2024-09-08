from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Optional as _Optional

DESCRIPTOR: _descriptor.FileDescriptor

class mensajeImagen(_message.Message):
    __slots__ = ("imagen",)
    IMAGEN_FIELD_NUMBER: _ClassVar[int]
    imagen: bytes
    def __init__(self, imagen: _Optional[bytes] = ...) -> None: ...

class subirImagenResponse(_message.Message):
    __slots__ = ("mensaje",)
    MENSAJE_FIELD_NUMBER: _ClassVar[int]
    mensaje: str
    def __init__(self, mensaje: _Optional[str] = ...) -> None: ...

class mensajeVacio(_message.Message):
    __slots__ = ()
    def __init__(self) -> None: ...
