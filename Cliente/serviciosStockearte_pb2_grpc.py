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
        self.bajaLogicaTienda = channel.unary_unary(
                '/stockeartePackage.stockearteService/bajaLogicaTienda',
                request_serializer=serviciosStockearte__pb2.bajaLogicaTiendaRequest.SerializeToString,
                response_deserializer=serviciosStockearte__pb2.mensajeSimple.FromString,
                _registered_method=True)
        self.altaLogicaTienda = channel.unary_unary(
                '/stockeartePackage.stockearteService/altaLogicaTienda',
                request_serializer=serviciosStockearte__pb2.altaLogicaTiendaRequest.SerializeToString,
                response_deserializer=serviciosStockearte__pb2.mensajeSimple.FromString,
                _registered_method=True)
        self.altaUsuario = channel.unary_unary(
                '/stockeartePackage.stockearteService/altaUsuario',
                request_serializer=serviciosStockearte__pb2.altaUsuarioRequest.SerializeToString,
                response_deserializer=serviciosStockearte__pb2.mensajeSimple.FromString,
                _registered_method=True)
        self.altaProducto = channel.unary_unary(
                '/stockeartePackage.stockearteService/altaProducto',
                request_serializer=serviciosStockearte__pb2.altaProductoRequest.SerializeToString,
                response_deserializer=serviciosStockearte__pb2.mensajeSimple.FromString,
                _registered_method=True)
        self.buscarUsuarios = channel.unary_unary(
                '/stockeartePackage.stockearteService/buscarUsuarios',
                request_serializer=serviciosStockearte__pb2.buscarUsuarioRequest.SerializeToString,
                response_deserializer=serviciosStockearte__pb2.arregloUsuarios.FromString,
                _registered_method=True)
        self.buscarTiendas = channel.unary_unary(
                '/stockeartePackage.stockearteService/buscarTiendas',
                request_serializer=serviciosStockearte__pb2.buscarTiendaRequest.SerializeToString,
                response_deserializer=serviciosStockearte__pb2.arregloTiendas.FromString,
                _registered_method=True)
        self.buscarProductos = channel.unary_unary(
                '/stockeartePackage.stockearteService/buscarProductos',
                request_serializer=serviciosStockearte__pb2.buscarProductosRequest.SerializeToString,
                response_deserializer=serviciosStockearte__pb2.arregloProductos.FromString,
                _registered_method=True)
        self.buscarTodosLosProductos = channel.unary_unary(
                '/stockeartePackage.stockearteService/buscarTodosLosProductos',
                request_serializer=serviciosStockearte__pb2.mensajeVacio.SerializeToString,
                response_deserializer=serviciosStockearte__pb2.arregloProductos.FromString,
                _registered_method=True)
        self.buscarTodosLosUsuarios = channel.unary_unary(
                '/stockeartePackage.stockearteService/buscarTodosLosUsuarios',
                request_serializer=serviciosStockearte__pb2.mensajeVacio.SerializeToString,
                response_deserializer=serviciosStockearte__pb2.arregloUsuarios.FromString,
                _registered_method=True)
        self.buscarTodasLasTiendas = channel.unary_unary(
                '/stockeartePackage.stockearteService/buscarTodasLasTiendas',
                request_serializer=serviciosStockearte__pb2.mensajeVacio.SerializeToString,
                response_deserializer=serviciosStockearte__pb2.arregloTiendas.FromString,
                _registered_method=True)
        self.modificarUsuario = channel.unary_unary(
                '/stockeartePackage.stockearteService/modificarUsuario',
                request_serializer=serviciosStockearte__pb2.modificarUsuarioRequest.SerializeToString,
                response_deserializer=serviciosStockearte__pb2.mensajeSimple.FromString,
                _registered_method=True)
        self.modificarTienda = channel.unary_unary(
                '/stockeartePackage.stockearteService/modificarTienda',
                request_serializer=serviciosStockearte__pb2.modificarTiendaRequest.SerializeToString,
                response_deserializer=serviciosStockearte__pb2.mensajeSimple.FromString,
                _registered_method=True)
        self.modificarStock = channel.unary_unary(
                '/stockeartePackage.stockearteService/modificarStock',
                request_serializer=serviciosStockearte__pb2.modificarStockRequest.SerializeToString,
                response_deserializer=serviciosStockearte__pb2.mensajeSimple.FromString,
                _registered_method=True)


class stockearteServiceServicer(object):
    """Missing associated documentation comment in .proto file."""

    def altaTienda(self, request, context):
        """PUNTO 1.A
        """
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def bajaLogicaTienda(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def altaLogicaTienda(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def altaUsuario(self, request, context):
        """PUNTO 1.B
        """
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def altaProducto(self, request, context):
        """PUNTO 1.C
        """
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def buscarUsuarios(self, request, context):
        """PUNTO 1.D
        ESTA FUNCIÓN ES PARA MODIFICAR EL STOCK DE UN PRODUCTO, PERO LA HICE MAL. EN SU LUGAR SE USA LA FUNCIÓN modificarStock
        VERIFICAR SI ESTA NO SE HACE PORQUE ESTA REPETIDA EN EL PUNTO 4.C
        rpc modificacionProducto (modificacionProductoRequest) returns (mensajeSimple) {}

        PUNTO 2.A
        rpc buscarUsuario_X_Usuario (buscarUsuario_X_UsuarioRequest) returns (usuario) {} //SACAR
        rpc buscarUsuario_X_TiendaCodigo (buscarUsuario_X_TiendaCodigoRequest) returns (arregloUsuarios) {} //SACAR
        """
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def buscarTiendas(self, request, context):
        """PUNTO 2.B
        rpc buscarTienda_X_TiendaCodigo (buscarTienda_X_TiendaCodigoRequest) returns (tienda) {} //SACAR
        rpc buscarTienda_X_Habilitado (buscarTienda_X_HabilitadoRequest) returns (arregloTiendas) {} //SACAR
        """
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def buscarProductos(self, request, context):
        """PUNTO 2.C
        rpc buscarProducto_X_Nombre (buscarProducto_X_NombreRequest) returns (arregloProductos) {} //SACAR
        rpc buscarProducto_X_Codigo (buscarProducto_X_CodigoRequest) returns (producto) {} //SACAR
        rpc buscarProducto_X_Talle (buscarProducto_X_TalleRequest) returns (arregloProductos) {} //SACAR
        rpc buscarProducto_X_Color (buscarProducto_X_ColorRequest) returns (arregloProductos) {} //SACAR
        """
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def buscarTodosLosProductos(self, request, context):
        """PUNTO 3.A
        """
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def buscarTodosLosUsuarios(self, request, context):
        """PUNTO 3.B
        """
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def buscarTodasLasTiendas(self, request, context):
        """PUNTO 3.C
        """
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def modificarUsuario(self, request, context):
        """PUNTO 4.A
        """
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def modificarTienda(self, request, context):
        """PUNTO 4.B
        """
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def modificarStock(self, request, context):
        """PUNTO 4.C
        """
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
            'bajaLogicaTienda': grpc.unary_unary_rpc_method_handler(
                    servicer.bajaLogicaTienda,
                    request_deserializer=serviciosStockearte__pb2.bajaLogicaTiendaRequest.FromString,
                    response_serializer=serviciosStockearte__pb2.mensajeSimple.SerializeToString,
            ),
            'altaLogicaTienda': grpc.unary_unary_rpc_method_handler(
                    servicer.altaLogicaTienda,
                    request_deserializer=serviciosStockearte__pb2.altaLogicaTiendaRequest.FromString,
                    response_serializer=serviciosStockearte__pb2.mensajeSimple.SerializeToString,
            ),
            'altaUsuario': grpc.unary_unary_rpc_method_handler(
                    servicer.altaUsuario,
                    request_deserializer=serviciosStockearte__pb2.altaUsuarioRequest.FromString,
                    response_serializer=serviciosStockearte__pb2.mensajeSimple.SerializeToString,
            ),
            'altaProducto': grpc.unary_unary_rpc_method_handler(
                    servicer.altaProducto,
                    request_deserializer=serviciosStockearte__pb2.altaProductoRequest.FromString,
                    response_serializer=serviciosStockearte__pb2.mensajeSimple.SerializeToString,
            ),
            'buscarUsuarios': grpc.unary_unary_rpc_method_handler(
                    servicer.buscarUsuarios,
                    request_deserializer=serviciosStockearte__pb2.buscarUsuarioRequest.FromString,
                    response_serializer=serviciosStockearte__pb2.arregloUsuarios.SerializeToString,
            ),
            'buscarTiendas': grpc.unary_unary_rpc_method_handler(
                    servicer.buscarTiendas,
                    request_deserializer=serviciosStockearte__pb2.buscarTiendaRequest.FromString,
                    response_serializer=serviciosStockearte__pb2.arregloTiendas.SerializeToString,
            ),
            'buscarProductos': grpc.unary_unary_rpc_method_handler(
                    servicer.buscarProductos,
                    request_deserializer=serviciosStockearte__pb2.buscarProductosRequest.FromString,
                    response_serializer=serviciosStockearte__pb2.arregloProductos.SerializeToString,
            ),
            'buscarTodosLosProductos': grpc.unary_unary_rpc_method_handler(
                    servicer.buscarTodosLosProductos,
                    request_deserializer=serviciosStockearte__pb2.mensajeVacio.FromString,
                    response_serializer=serviciosStockearte__pb2.arregloProductos.SerializeToString,
            ),
            'buscarTodosLosUsuarios': grpc.unary_unary_rpc_method_handler(
                    servicer.buscarTodosLosUsuarios,
                    request_deserializer=serviciosStockearte__pb2.mensajeVacio.FromString,
                    response_serializer=serviciosStockearte__pb2.arregloUsuarios.SerializeToString,
            ),
            'buscarTodasLasTiendas': grpc.unary_unary_rpc_method_handler(
                    servicer.buscarTodasLasTiendas,
                    request_deserializer=serviciosStockearte__pb2.mensajeVacio.FromString,
                    response_serializer=serviciosStockearte__pb2.arregloTiendas.SerializeToString,
            ),
            'modificarUsuario': grpc.unary_unary_rpc_method_handler(
                    servicer.modificarUsuario,
                    request_deserializer=serviciosStockearte__pb2.modificarUsuarioRequest.FromString,
                    response_serializer=serviciosStockearte__pb2.mensajeSimple.SerializeToString,
            ),
            'modificarTienda': grpc.unary_unary_rpc_method_handler(
                    servicer.modificarTienda,
                    request_deserializer=serviciosStockearte__pb2.modificarTiendaRequest.FromString,
                    response_serializer=serviciosStockearte__pb2.mensajeSimple.SerializeToString,
            ),
            'modificarStock': grpc.unary_unary_rpc_method_handler(
                    servicer.modificarStock,
                    request_deserializer=serviciosStockearte__pb2.modificarStockRequest.FromString,
                    response_serializer=serviciosStockearte__pb2.mensajeSimple.SerializeToString,
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
    def bajaLogicaTienda(request,
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
            '/stockeartePackage.stockearteService/bajaLogicaTienda',
            serviciosStockearte__pb2.bajaLogicaTiendaRequest.SerializeToString,
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
    def altaLogicaTienda(request,
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
            '/stockeartePackage.stockearteService/altaLogicaTienda',
            serviciosStockearte__pb2.altaLogicaTiendaRequest.SerializeToString,
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
    def buscarUsuarios(request,
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
            '/stockeartePackage.stockearteService/buscarUsuarios',
            serviciosStockearte__pb2.buscarUsuarioRequest.SerializeToString,
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
    def buscarTiendas(request,
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
            '/stockeartePackage.stockearteService/buscarTiendas',
            serviciosStockearte__pb2.buscarTiendaRequest.SerializeToString,
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
    def buscarProductos(request,
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
            '/stockeartePackage.stockearteService/buscarProductos',
            serviciosStockearte__pb2.buscarProductosRequest.SerializeToString,
            serviciosStockearte__pb2.arregloProductos.FromString,
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
            serviciosStockearte__pb2.mensajeVacio.SerializeToString,
            serviciosStockearte__pb2.arregloProductos.FromString,
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
