from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Optional as _Optional

DESCRIPTOR: _descriptor.FileDescriptor

class SaludarRequest(_message.Message):
    __slots__ = ("nombre", "dia")
    NOMBRE_FIELD_NUMBER: _ClassVar[int]
    DIA_FIELD_NUMBER: _ClassVar[int]
    nombre: str
    dia: str
    def __init__(self, nombre: _Optional[str] = ..., dia: _Optional[str] = ...) -> None: ...

class SaludarResponse(_message.Message):
    __slots__ = ("saludo",)
    SALUDO_FIELD_NUMBER: _ClassVar[int]
    saludo: str
    def __init__(self, saludo: _Optional[str] = ...) -> None: ...

class AnimoRequest(_message.Message):
    __slots__ = ("animo",)
    ANIMO_FIELD_NUMBER: _ClassVar[int]
    animo: str
    def __init__(self, animo: _Optional[str] = ...) -> None: ...

class AnimoResponse(_message.Message):
    __slots__ = ("animo", "estadoServidor")
    ANIMO_FIELD_NUMBER: _ClassVar[int]
    ESTADOSERVIDOR_FIELD_NUMBER: _ClassVar[int]
    animo: str
    estadoServidor: str
    def __init__(self, animo: _Optional[str] = ..., estadoServidor: _Optional[str] = ...) -> None: ...
