# Generated by the gRPC Python protocol compiler plugin. DO NOT EDIT!
"""Client and server classes corresponding to protobuf-defined services."""
import grpc
import warnings

import serviciosStockearte_pb2 as serviciosStockearte__pb2

GRPC_GENERATED_VERSION = '1.66.1'
GRPC_VERSION = grpc.__version__
_version_not_supported = False

try:
    from grpc._utilities import first_version_is_lower
    _version_not_supported = first_version_is_lower(GRPC_VERSION, GRPC_GENERATED_VERSION)
except ImportError:
    _version_not_supported = True

if _version_not_supported:
    raise RuntimeError(
        f'The grpc package installed is at version {GRPC_VERSION},'
        + f' but the generated code in serviciosStockearte_pb2_grpc.py depends on'
        + f' grpcio>={GRPC_GENERATED_VERSION}.'
        + f' Please upgrade your grpc module to grpcio>={GRPC_GENERATED_VERSION}'
        + f' or downgrade your generated code using grpcio-tools<={GRPC_VERSION}.'
    )


class stockearteServiceStub(object):
    """Missing associated documentation comment in .proto file."""

    def __init__(self, channel):
        """Constructor.

        Args:
            channel: A grpc.Channel.
        """
        self.altaTienda = channel.unary_unary(
                '/stockeartePackage.stockearteService/altaTienda',
                request_serializer=serviciosStockearte__pb2.altaTiendaRequest.SerializeToString,
                response_deserializer=serviciosStockearte__pb2.mensajeSimple.FromString,
                _registered_method=True)
        self.buscarTienda = channel.unary_unary(
                '/stockeartePackage.stockearteService/buscarTienda',
                request_serializer=serviciosStockearte__pb2.buscarTiendaRequest.SerializeToString,
                response_deserializer=serviciosStockearte__pb2.tienda.FromString,
                _registered_method=True)
        self.buscarTodasLasTiendas = channel.unary_unary(
                '/stockeartePackage.stockearteService/buscarTodasLasTiendas',
                request_serializer=serviciosStockearte__pb2.mensajeVacio.SerializeToString,
                response_deserializer=serviciosStockearte__pb2.arregloTiendas.FromString,
                _registered_method=True)
        self.modificarTienda = channel.unary_unary(
                '/stockeartePackage.stockearteService/modificarTienda',
                request_serializer=serviciosStockearte__pb2.modificarTiendaRequest.SerializeToString,
                response_deserializer=serviciosStockearte__pb2.mensajeSimple.FromString,
                _registered_method=True)
        self.altaUsuario = channel.unary_unary(
                '/stockeartePackage.stockearteService/altaUsuario',
                request_serializer=serviciosStockearte__pb2.altaUsuarioRequest.SerializeToString,
                response_deserializer=serviciosStockearte__pb2.mensajeSimple.FromString,
                _registered_method=True)
        self.buscarUsuario = channel.unary_unary(
                '/stockeartePackage.stockearteService/buscarUsuario',
                request_serializer=serviciosStockearte__pb2.buscarUsuarioRequest.SerializeToString,
                response_deserializer=serviciosStockearte__pb2.usuario.FromString,
                _registered_method=True)
        self.buscarTodosLosUsuarios = channel.unary_unary(
                '/stockeartePackage.stockearteService/buscarTodosLosUsuarios',
                request_serializer=serviciosStockearte__pb2.mensajeVacio.SerializeToString,
                response_deserializer=serviciosStockearte__pb2.arregloUsuarios.FromString,
                _registered_method=True)
        self.modificarUsuario = channel.unary_unary(
                '/stockeartePackage.stockearteService/modificarUsuario',
                request_serializer=serviciosStockearte__pb2.modificarUsuarioRequest.SerializeToString,
                response_deserializer=serviciosStockearte__pb2.mensajeSimple.FromString,
                _registered_method=True)
        self.altaProducto = channel.unary_unary(
                '/stockeartePackage.stockearteService/altaProducto',
                request_serializer=serviciosStockearte__pb2.altaProductoRequest.SerializeToString,
                response_deserializer=serviciosStockearte__pb2.mensajeSimple.FromString,
                _registered_method=True)
        self.buscarProducto = channel.unary_unary(
                '/stockeartePackage.stockearteService/buscarProducto',
                request_serializer=serviciosStockearte__pb2.buscarProductoRequest.SerializeToString,
                response_deserializer=serviciosStockearte__pb2.producto.FromString,
                _registered_method=True)
        self.buscarTodosLosProductos = channel.unary_unary(
                '/stockeartePackage.stockearteService/buscarTodosLosProductos',
                request_serializer=serviciosStockearte__pb2.buscarTodosLosProductosRequest.SerializeToString,
                response_deserializer=serviciosStockearte__pb2.arregloProductos_2.FromString,
                _registered_method=True)
        self.modificarStock = channel.unary_unary(
                '/stockeartePackage.stockearteService/modificarStock',
                request_serializer=serviciosStockearte__pb2.modificarStockRequest.SerializeToString,
                response_deserializer=serviciosStockearte__pb2.mensajeSimple.FromString,
                _registered_method=True)
        self.modificarProducto = channel.unary_unary(
                '/stockeartePackage.stockearteService/modificarProducto',
                request_serializer=serviciosStockearte__pb2.modificarProductoRequest.SerializeToString,
                response_deserializer=serviciosStockearte__pb2.mensajeSimple.FromString,
                _registered_method=True)
        self.traerUsuarioPorId = channel.unary_unary(
                '/stockeartePackage.stockearteService/traerUsuarioPorId',
                request_serializer=serviciosStockearte__pb2.buscarIdRequest.SerializeToString,
                response_deserializer=serviciosStockearte__pb2.usuario.FromString,
                _registered_method=True)
        self.traerTiendaPorCodigo = channel.unary_unary(
                '/stockeartePackage.stockearteService/traerTiendaPorCodigo',
                request_serializer=serviciosStockearte__pb2.buscarCodigoRequest.SerializeToString,
                response_deserializer=serviciosStockearte__pb2.tienda.FromString,
                _registered_method=True)
        self.traerProductoPorCodigo = channel.unary_unary(
                '/stockeartePackage.stockearteService/traerProductoPorCodigo',
                request_serializer=serviciosStockearte__pb2.buscarCodigoRequest.SerializeToString,
                response_deserializer=serviciosStockearte__pb2.producto.FromString,
                _registered_method=True)
        self.hacerLogin = channel.unary_unary(
                '/stockeartePackage.stockearteService/hacerLogin',
                request_serializer=serviciosStockearte__pb2.hacerLoginRequest.SerializeToString,
                response_deserializer=serviciosStockearte__pb2.hacerLoginResponse.FromString,
                _registered_method=True)
        self.traerProductosDeLaTienda = channel.unary_unary(
                '/stockeartePackage.stockearteService/traerProductosDeLaTienda',
                request_serializer=serviciosStockearte__pb2.traerProductosDeLaTiendaRequest.SerializeToString,
                response_deserializer=serviciosStockearte__pb2.traerProductosDeLaTiendaResponse.FromString,
                _registered_method=True)


class stockearteServiceServicer(object):
    """Missing associated documentation comment in .proto file."""

    def altaTienda(self, request, context):
        """tiendaService
        """
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def buscarTienda(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def buscarTodasLasTiendas(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def modificarTienda(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def altaUsuario(self, request, context):
        """usuarioService
        """
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def buscarUsuario(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def buscarTodosLosUsuarios(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def modificarUsuario(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def altaProducto(self, request, context):
        """productoService
        """
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def buscarProducto(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def buscarTodosLosProductos(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def modificarStock(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def modificarProducto(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def traerUsuarioPorId(self, request, context):
        """Funciones complementarias
        """
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def traerTiendaPorCodigo(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def traerProductoPorCodigo(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def hacerLogin(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def traerProductosDeLaTienda(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')


def add_stockearteServiceServicer_to_server(servicer, server):
    rpc_method_handlers = {
            'altaTienda': grpc.unary_unary_rpc_method_handler(
                    servicer.altaTienda,
                    request_deserializer=serviciosStockearte__pb2.altaTiendaRequest.FromString,
                    response_serializer=serviciosStockearte__pb2.mensajeSimple.SerializeToString,
            ),
            'buscarTienda': grpc.unary_unary_rpc_method_handler(
                    servicer.buscarTienda,
                    request_deserializer=serviciosStockearte__pb2.buscarTiendaRequest.FromString,
                    response_serializer=serviciosStockearte__pb2.tienda.SerializeToString,
            ),
            'buscarTodasLasTiendas': grpc.unary_unary_rpc_method_handler(
                    servicer.buscarTodasLasTiendas,
                    request_deserializer=serviciosStockearte__pb2.mensajeVacio.FromString,
                    response_serializer=serviciosStockearte__pb2.arregloTiendas.SerializeToString,
            ),
            'modificarTienda': grpc.unary_unary_rpc_method_handler(
                    servicer.modificarTienda,
                    request_deserializer=serviciosStockearte__pb2.modificarTiendaRequest.FromString,
                    response_serializer=serviciosStockearte__pb2.mensajeSimple.SerializeToString,
            ),
            'altaUsuario': grpc.unary_unary_rpc_method_handler(
                    servicer.altaUsuario,
                    request_deserializer=serviciosStockearte__pb2.altaUsuarioRequest.FromString,
                    response_serializer=serviciosStockearte__pb2.mensajeSimple.SerializeToString,
            ),
            'buscarUsuario': grpc.unary_unary_rpc_method_handler(
                    servicer.buscarUsuario,
                    request_deserializer=serviciosStockearte__pb2.buscarUsuarioRequest.FromString,
                    response_serializer=serviciosStockearte__pb2.usuario.SerializeToString,
            ),
            'buscarTodosLosUsuarios': grpc.unary_unary_rpc_method_handler(
                    servicer.buscarTodosLosUsuarios,
                    request_deserializer=serviciosStockearte__pb2.mensajeVacio.FromString,
                    response_serializer=serviciosStockearte__pb2.arregloUsuarios.SerializeToString,
            ),
            'modificarUsuario': grpc.unary_unary_rpc_method_handler(
                    servicer.modificarUsuario,
                    request_deserializer=serviciosStockearte__pb2.modificarUsuarioRequest.FromString,
                    response_serializer=serviciosStockearte__pb2.mensajeSimple.SerializeToString,
            ),
            'altaProducto': grpc.unary_unary_rpc_method_handler(
                    servicer.altaProducto,
                    request_deserializer=serviciosStockearte__pb2.altaProductoRequest.FromString,
                    response_serializer=serviciosStockearte__pb2.mensajeSimple.SerializeToString,
            ),
            'buscarProducto': grpc.unary_unary_rpc_method_handler(
                    servicer.buscarProducto,
                    request_deserializer=serviciosStockearte__pb2.buscarProductoRequest.FromString,
                    response_serializer=serviciosStockearte__pb2.producto.SerializeToString,
            ),
            'buscarTodosLosProductos': grpc.unary_unary_rpc_method_handler(
                    servicer.buscarTodosLosProductos,
                    request_deserializer=serviciosStockearte__pb2.buscarTodosLosProductosRequest.FromString,
                    response_serializer=serviciosStockearte__pb2.arregloProductos_2.SerializeToString,
            ),
            'modificarStock': grpc.unary_unary_rpc_method_handler(
                    servicer.modificarStock,
                    request_deserializer=serviciosStockearte__pb2.modificarStockRequest.FromString,
                    response_serializer=serviciosStockearte__pb2.mensajeSimple.SerializeToString,
            ),
            'modificarProducto': grpc.unary_unary_rpc_method_handler(
                    servicer.modificarProducto,
                    request_deserializer=serviciosStockearte__pb2.modificarProductoRequest.FromString,
                    response_serializer=serviciosStockearte__pb2.mensajeSimple.SerializeToString,
            ),
            'traerUsuarioPorId': grpc.unary_unary_rpc_method_handler(
                    servicer.traerUsuarioPorId,
                    request_deserializer=serviciosStockearte__pb2.buscarIdRequest.FromString,
                    response_serializer=serviciosStockearte__pb2.usuario.SerializeToString,
            ),
            'traerTiendaPorCodigo': grpc.unary_unary_rpc_method_handler(
                    servicer.traerTiendaPorCodigo,
                    request_deserializer=serviciosStockearte__pb2.buscarCodigoRequest.FromString,
                    response_serializer=serviciosStockearte__pb2.tienda.SerializeToString,
            ),
            'traerProductoPorCodigo': grpc.unary_unary_rpc_method_handler(
                    servicer.traerProductoPorCodigo,
                    request_deserializer=serviciosStockearte__pb2.buscarCodigoRequest.FromString,
                    response_serializer=serviciosStockearte__pb2.producto.SerializeToString,
            ),
            'hacerLogin': grpc.unary_unary_rpc_method_handler(
                    servicer.hacerLogin,
                    request_deserializer=serviciosStockearte__pb2.hacerLoginRequest.FromString,
                    response_serializer=serviciosStockearte__pb2.hacerLoginResponse.SerializeToString,
            ),
            'traerProductosDeLaTienda': grpc.unary_unary_rpc_method_handler(
                    servicer.traerProductosDeLaTienda,
                    request_deserializer=serviciosStockearte__pb2.traerProductosDeLaTiendaRequest.FromString,
                    response_serializer=serviciosStockearte__pb2.traerProductosDeLaTiendaResponse.SerializeToString,
            ),
    }
    generic_handler = grpc.method_handlers_generic_handler(
            'stockeartePackage.stockearteService', rpc_method_handlers)
    server.add_generic_rpc_handlers((generic_handler,))
    server.add_registered_method_handlers('stockeartePackage.stockearteService', rpc_method_handlers)


 # This class is part of an EXPERIMENTAL API.
class stockearteService(object):
    """Missing associated documentation comment in .proto file."""

    @staticmethod
    def altaTienda(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(
            request,
            target,
            '/stockeartePackage.stockearteService/altaTienda',
            serviciosStockearte__pb2.altaTiendaRequest.SerializeToString,
            serviciosStockearte__pb2.mensajeSimple.FromString,
            options,
            channel_credentials,
            insecure,
            call_credentials,
            compression,
            wait_for_ready,
            timeout,
            metadata,
            _registered_method=True)

    @staticmethod
    def buscarTienda(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(
            request,
            target,
            '/stockeartePackage.stockearteService/buscarTienda',
            serviciosStockearte__pb2.buscarTiendaRequest.SerializeToString,
            serviciosStockearte__pb2.tienda.FromString,
            options,
            channel_credentials,
            insecure,
            call_credentials,
            compression,
            wait_for_ready,
            timeout,
            metadata,
            _registered_method=True)

    @staticmethod
    def buscarTodasLasTiendas(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(
            request,
            target,
            '/stockeartePackage.stockearteService/buscarTodasLasTiendas',
            serviciosStockearte__pb2.mensajeVacio.SerializeToString,
            serviciosStockearte__pb2.arregloTiendas.FromString,
            options,
            channel_credentials,
            insecure,
            call_credentials,
            compression,
            wait_for_ready,
            timeout,
            metadata,
            _registered_method=True)

    @staticmethod
    def modificarTienda(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(
            request,
            target,
            '/stockeartePackage.stockearteService/modificarTienda',
            serviciosStockearte__pb2.modificarTiendaRequest.SerializeToString,
            serviciosStockearte__pb2.mensajeSimple.FromString,
            options,
            channel_credentials,
            insecure,
            call_credentials,
            compression,
            wait_for_ready,
            timeout,
            metadata,
            _registered_method=True)

    @staticmethod
    def altaUsuario(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(
            request,
            target,
            '/stockeartePackage.stockearteService/altaUsuario',
            serviciosStockearte__pb2.altaUsuarioRequest.SerializeToString,
            serviciosStockearte__pb2.mensajeSimple.FromString,
            options,
            channel_credentials,
            insecure,
            call_credentials,
            compression,
            wait_for_ready,
            timeout,
            metadata,
            _registered_method=True)

    @staticmethod
    def buscarUsuario(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(
            request,
            target,
            '/stockeartePackage.stockearteService/buscarUsuario',
            serviciosStockearte__pb2.buscarUsuarioRequest.SerializeToString,
            serviciosStockearte__pb2.usuario.FromString,
            options,
            channel_credentials,
            insecure,
            call_credentials,
            compression,
            wait_for_ready,
            timeout,
            metadata,
            _registered_method=True)

    @staticmethod
    def buscarTodosLosUsuarios(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(
            request,
            target,
            '/stockeartePackage.stockearteService/buscarTodosLosUsuarios',
            serviciosStockearte__pb2.mensajeVacio.SerializeToString,
            serviciosStockearte__pb2.arregloUsuarios.FromString,
            options,
            channel_credentials,
            insecure,
            call_credentials,
            compression,
            wait_for_ready,
            timeout,
            metadata,
            _registered_method=True)

    @staticmethod
    def modificarUsuario(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(
            request,
            target,
            '/stockeartePackage.stockearteService/modificarUsuario',
            serviciosStockearte__pb2.modificarUsuarioRequest.SerializeToString,
            serviciosStockearte__pb2.mensajeSimple.FromString,
            options,
            channel_credentials,
            insecure,
            call_credentials,
            compression,
            wait_for_ready,
            timeout,
            metadata,
            _registered_method=True)

    @staticmethod
    def altaProducto(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(
            request,
            target,
            '/stockeartePackage.stockearteService/altaProducto',
            serviciosStockearte__pb2.altaProductoRequest.SerializeToString,
            serviciosStockearte__pb2.mensajeSimple.FromString,
            options,
            channel_credentials,
            insecure,
            call_credentials,
            compression,
            wait_for_ready,
            timeout,
            metadata,
            _registered_method=True)

    @staticmethod
    def buscarProducto(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(
            request,
            target,
            '/stockeartePackage.stockearteService/buscarProducto',
            serviciosStockearte__pb2.buscarProductoRequest.SerializeToString,
            serviciosStockearte__pb2.producto.FromString,
            options,
            channel_credentials,
            insecure,
            call_credentials,
            compression,
            wait_for_ready,
            timeout,
            metadata,
            _registered_method=True)

    @staticmethod
    def buscarTodosLosProductos(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(
            request,
            target,
            '/stockeartePackage.stockearteService/buscarTodosLosProductos',
            serviciosStockearte__pb2.buscarTodosLosProductosRequest.SerializeToString,
            serviciosStockearte__pb2.arregloProductos_2.FromString,
            options,
            channel_credentials,
            insecure,
            call_credentials,
            compression,
            wait_for_ready,
            timeout,
            metadata,
            _registered_method=True)

    @staticmethod
    def modificarStock(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(
            request,
            target,
            '/stockeartePackage.stockearteService/modificarStock',
            serviciosStockearte__pb2.modificarStockRequest.SerializeToString,
            serviciosStockearte__pb2.mensajeSimple.FromString,
            options,
            channel_credentials,
            insecure,
            call_credentials,
            compression,
            wait_for_ready,
            timeout,
            metadata,
            _registered_method=True)

    @staticmethod
    def modificarProducto(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(
            request,
            target,
            '/stockeartePackage.stockearteService/modificarProducto',
            serviciosStockearte__pb2.modificarProductoRequest.SerializeToString,
            serviciosStockearte__pb2.mensajeSimple.FromString,
            options,
            channel_credentials,
            insecure,
            call_credentials,
            compression,
            wait_for_ready,
            timeout,
            metadata,
            _registered_method=True)

    @staticmethod
    def traerUsuarioPorId(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(
            request,
            target,
            '/stockeartePackage.stockearteService/traerUsuarioPorId',
            serviciosStockearte__pb2.buscarIdRequest.SerializeToString,
            serviciosStockearte__pb2.usuario.FromString,
            options,
            channel_credentials,
            insecure,
            call_credentials,
            compression,
            wait_for_ready,
            timeout,
            metadata,
            _registered_method=True)

    @staticmethod
    def traerTiendaPorCodigo(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(
            request,
            target,
            '/stockeartePackage.stockearteService/traerTiendaPorCodigo',
            serviciosStockearte__pb2.buscarCodigoRequest.SerializeToString,
            serviciosStockearte__pb2.tienda.FromString,
            options,
            channel_credentials,
            insecure,
            call_credentials,
            compression,
            wait_for_ready,
            timeout,
            metadata,
            _registered_method=True)

    @staticmethod
    def traerProductoPorCodigo(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(
            request,
            target,
            '/stockeartePackage.stockearteService/traerProductoPorCodigo',
            serviciosStockearte__pb2.buscarCodigoRequest.SerializeToString,
            serviciosStockearte__pb2.producto.FromString,
            options,
            channel_credentials,
            insecure,
            call_credentials,
            compression,
            wait_for_ready,
            timeout,
            metadata,
            _registered_method=True)

    @staticmethod
    def hacerLogin(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(
            request,
            target,
            '/stockeartePackage.stockearteService/hacerLogin',
            serviciosStockearte__pb2.hacerLoginRequest.SerializeToString,
            serviciosStockearte__pb2.hacerLoginResponse.FromString,
            options,
            channel_credentials,
            insecure,
            call_credentials,
            compression,
            wait_for_ready,
            timeout,
            metadata,
            _registered_method=True)

    @staticmethod
    def traerProductosDeLaTienda(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(
            request,
            target,
            '/stockeartePackage.stockearteService/traerProductosDeLaTienda',
            serviciosStockearte__pb2.traerProductosDeLaTiendaRequest.SerializeToString,
            serviciosStockearte__pb2.traerProductosDeLaTiendaResponse.FromString,
            options,
            channel_credentials,
            insecure,
            call_credentials,
            compression,
            wait_for_ready,
            timeout,
            metadata,
            _registered_method=True)
