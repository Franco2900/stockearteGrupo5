import grpc                         # Libreria para trabajar con grpc
import serviciosStockearte_pb2      # Contiene las definiciones de los mensajes
import serviciosStockearte_pb2_grpc # Contiene las definiciones de los servicios
import base64
import json

#make_response lo podemos usar para un mensaje estático
from flask import Flask,request,make_response
from google.protobuf.json_format import MessageToJson
from google.protobuf.wrappers_pb2 import BoolValue

# Crear una instancia de la aplicación Flask
app = Flask(__name__)

# Crea una conexión de canal insegura con el servidor gRPC en una determinada dirección IP y puerto
canal = grpc.insecure_channel("localhost:8000") 

# Se crea un stub para interactuar con los servicios
stub  = serviciosStockearte_pb2_grpc.stockearteServiceStub(canal)

# Definir una ruta para la página principal
@app.route('/')
def hello():
    return "¡Hola, Mundo!"

#####################################################################################################
#  PUNTO 1: HACER ALTAS  
#####################################################################################################

# PUNTO 1.A
@app.route('/altaTienda', methods=['POST'])
def altaTienda():

    #Desempaquetamos el diccionario en argumentos con nombre y valor
    solicitud= serviciosStockearte_pb2.altaTiendaRequest(**request.json)

    response=stub.altaTienda(solicitud)
    return MessageToJson(response)


@app.route('/bajaLogicaTienda', methods=['POST'])
def bajaLogicaTienda():
    
    solicitud= serviciosStockearte_pb2.bajaLogicaTiendaRequest(**request.json)

    response=stub.bajaLogicaTienda(solicitud)
    return MessageToJson(response)

@app.route('/altaLogicaTienda', methods=['POST'])
def altaLogicaTienda():

    solicitud= serviciosStockearte_pb2.altaLogicaTiendaRequest(**request.json)

    response=stub.altaLogicaTienda(solicitud)
    return MessageToJson(response)


# PUNTO 1.B
@app.route('/altaUsuario', methods=['POST'])
def altaUsuario():

    solicitud= serviciosStockearte_pb2.altaUsuarioRequest(**request.json)
    print(request.json)
    response=stub.altaUsuario(solicitud)
    return MessageToJson(response)


# PUNTO 1.C
@app.route('/altaProducto', methods=['POST'])
def altaProducto():
    # Convertir la imagen a base64
    foto = request.files["foto"]
    foto_base64 = base64.b64encode(foto.read()).decode('utf-8')

    # Convertir el string JSON a un diccionario de Python
    data = json.loads(request.form['data'])
    data['foto']=foto_base64

    

    # Crear la solicitud gRPC con la imagen en bytes
    solicitud= serviciosStockearte_pb2.altaProductoRequest(**data)

    response=stub.altaProducto(solicitud)
    return MessageToJson(response)


# PUNTO 1.D
@app.route('/modificarProducto', methods=['POST'])
def modificarProducto():

    solicitud= serviciosStockearte_pb2.modificacionProductoRequest(**request.json)

    response=stub.modificacionProducto(solicitud)
    return MessageToJson(response)

#####################################################################################################
#  PUNTO 2: TRAER BUSQUEDA ESPECIFICA  
#####################################################################################################

# PUNTO 2.A
"""
@app.route('/buscarUsuarioXUsuario', methods=['GET'])
def buscarUsuario_X_Usuario():

    solicitud= serviciosStockearte_pb2.buscarUsuario_X_UsuarioRequest(**request.json)

    response=stub.buscarUsuario_X_Usuario(solicitud)
    return MessageToJson(response)


@app.route('/buscarUsuarioXTiendaCodigo', methods=['GET'])
def buscarUsuario_X_TiendaCodigo():

    solicitud= serviciosStockearte_pb2.buscarUsuario_X_TiendaCodigoRequest(**request.json)

    response=stub.buscarUsuario_X_TiendaCodigo(solicitud)
    return MessageToJson(response)
"""

@app.route('/buscarUsuarios', methods=['GET'])
def buscarUsuarios():

    solicitud= serviciosStockearte_pb2.buscarUsuarioRequest(**request.json)

    response=stub.buscarUsuarios(solicitud)
    return MessageToJson(response)


# PUNTO 2.B
"""
@app.route('/buscarTiendaXTiendaCodigo', methods=['GET'])
def buscarTienda_X_TiendaCodigo():

    solicitud= serviciosStockearte_pb2.buscarTienda_X_TiendaCodigoRequest(**request.json)

    response=stub.buscarTienda_X_TiendaCodigo(solicitud)
    return MessageToJson(response)


@app.route('/buscarTiendaXHabilitado', methods=['GET'])
def  buscarTienda_X_Habilitado():

    solicitud= serviciosStockearte_pb2.buscarTienda_X_HabilitadoRequest(**request.json)

    response=stub.buscarTienda_X_Habilitado(solicitud)
    return MessageToJson(response)
"""
    
@app.route('/buscarTiendas', methods=['GET'])
def  buscarTiendas():

    solicitud= serviciosStockearte_pb2.buscarTiendaRequest(**request.json)

    response=stub.buscarTiendas(solicitud)
    return MessageToJson(response)


# PUNTO 2.C
"""
@app.route('/buscarProductoXNombre', methods=['GET'])
def  buscarProducto_X_Nombre():

    solicitud= serviciosStockearte_pb2.buscarProducto_X_NombreRequest(**request.json)

    response=stub.buscarProducto_X_Nombre(solicitud)
    return MessageToJson(response)


@app.route('/buscarProductoXCodigo', methods=['GET'])
def  buscarProducto_X_Codigo():

    solicitud= serviciosStockearte_pb2.buscarProducto_X_CodigoRequest(**request.json)

    response=stub.buscarProducto_X_Codigo(solicitud)
    return MessageToJson(response)


@app.route('/buscarProductoXTalle', methods=['GET'])
def  buscarProducto_X_Talle():    

    solicitud= serviciosStockearte_pb2.buscarProducto_X_TalleRequest(**request.json)

    response=stub.buscarProducto_X_Talle(solicitud)
    return MessageToJson(response)


@app.route('/buscarProductoXColor', methods=['GET'])
def  buscarProducto_X_Color():

    solicitud= serviciosStockearte_pb2.buscarProducto_X_ColorRequest(**request.json)

    response=stub.buscarProducto_X_Color(solicitud)
    return MessageToJson(response)
"""

@app.route('/buscarProductos', methods=['GET'])
def  buscarProductos():

    solicitud= serviciosStockearte_pb2.buscarProductosRequest(**request.json)

    response=stub.buscarProductos(solicitud)
    return MessageToJson(response)

#####################################################################################################
#  PUNTO 3: TRAER LISTADOS  
#####################################################################################################

# PUNTO 3.A
@app.route('/buscarTodosLosProductos', methods=['GET'])
def  buscarTodosLosProductos():    

    solicitud= serviciosStockearte_pb2.buscarTodosLosProductosRequest(**request.json)

    response=stub.buscarTodosLosProductos(solicitud)
    return MessageToJson(response)


# PUNTO 3.B
@app.route('/buscarTodosLosUsuarios', methods=['GET'])
def  buscarTodosLosUsuarios():

    solicitud= serviciosStockearte_pb2.mensajeVacio()

    response=stub.buscarTodosLosUsuarios(solicitud)
    return MessageToJson(response)


# PUNTO 3.C
@app.route('/buscarTodasLasTiendas', methods=['GET'])
def  buscarTodasLasTiendas():

    solicitud= serviciosStockearte_pb2.mensajeVacio()

    response=stub.buscarTodasLasTiendas(solicitud)
    return MessageToJson(response)

#####################################################################################################
#  PUNTO 4: HACER MODIFICACIONES
#####################################################################################################

# PUNTO 4.A
@app.route('/modificarUsuario', methods=['POST'])
def  modificarUsuario():

    solicitud= serviciosStockearte_pb2.modificarUsuarioRequest(**request.json)

    response=stub.modificarUsuario(solicitud)
    return MessageToJson(response)



# PUNTO 4.B
@app.route('/modificarTienda', methods=['POST'])
def  modificarTienda():    

    solicitud= serviciosStockearte_pb2.modificarTiendaRequest(**request.json)

    response=stub.modificarTienda(solicitud)
    return MessageToJson(response)


# PUNTO 4.C
@app.route('/modificarStock', methods=['POST'])
def  modificarStock():

    solicitud= serviciosStockearte_pb2.modificarStockRequest(**request.json)

    response=stub.modificarTienda(solicitud)
    return MessageToJson(response)


@app.route('/traerUsuarioPorId', methods=['GET'])
def  traerUsuarioPorId():

    solicitud= serviciosStockearte_pb2.(**request.json)

    response=stub.(solicitud)
    return MessageToJson(response)



@app.route('/traerTiendaPorCodigo', methods=['GET'])
def  traerTiendaPorCodigo():

    solicitud= serviciosStockearte_pb2.(**request.json)

    response=stub.(solicitud)
    return MessageToJson(response)


@app.route('/traerProductoPorCodigo', methods=['GET'])
def  traerProductoPorCodigo():

    solicitud= serviciosStockearte_pb2.(**request.json)

    response=stub.(solicitud)
    return MessageToJson(response)


# Ejecutar la aplicación
if __name__ == '__main__':
    #app.run(host='0.0.0.0', port=8080, debug=True)
    app.run(debug=True)