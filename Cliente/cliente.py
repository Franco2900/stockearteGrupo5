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
# tiendaService
#####################################################################################################

@app.route('/altaTienda', methods=['POST'])
def altaTienda():

    #Desempaquetamos el diccionario en argumentos con nombre y valor
    solicitud= serviciosStockearte_pb2.altaTiendaRequest(**request.json)

    response=stub.altaTienda(solicitud)
    return MessageToJson(response)


@app.route('/buscarTienda', methods=['POST'])
def  buscarTiendas():

    solicitud= serviciosStockearte_pb2.buscarTiendaRequest(**request.json)

    response=stub.buscarTienda(solicitud)
    return MessageToJson(response)


@app.route('/buscarTodasLasTiendas', methods=['GET'])
def  buscarTodasLasTiendas():

    solicitud= serviciosStockearte_pb2.mensajeVacio()

    response=stub.buscarTodasLasTiendas(solicitud)
    return MessageToJson(response)


@app.route('/modificarTienda', methods=['POST'])
def  modificarTienda():    

    solicitud= serviciosStockearte_pb2.modificarTiendaRequest(**request.json)

    response=stub.modificarTienda(solicitud)
    return MessageToJson(response)

#####################################################################################################
# usuarioService 
#####################################################################################################

@app.route('/altaUsuario', methods=['POST'])
def altaUsuario():

    solicitud= serviciosStockearte_pb2.altaUsuarioRequest(**request.json)
    print(request.json)
    response=stub.altaUsuario(solicitud)
    return MessageToJson(response)


@app.route('/buscarUsuario', methods=['POST'])
def buscarUsuarios():

    solicitud= serviciosStockearte_pb2.buscarUsuarioRequest(**request.json)

    response=stub.buscarUsuario(solicitud)
    return MessageToJson(response)


@app.route('/buscarTodosLosUsuarios', methods=['GET'])
def  buscarTodosLosUsuarios():

    solicitud= serviciosStockearte_pb2.mensajeVacio()

    response=stub.buscarTodosLosUsuarios(solicitud)
    return MessageToJson(response)


@app.route('/modificarUsuario', methods=['POST'])
def  modificarUsuario():

    solicitud= serviciosStockearte_pb2.modificarUsuarioRequest(**request.json)

    response=stub.modificarUsuario(solicitud)
    return MessageToJson(response)

#####################################################################################################
# productoService 
#####################################################################################################

#@app.route('/altaProducto', methods=['POST'])
#def altaProducto():
#    # Convertir la imagen a base64
#    foto = request.files['foto']
#    foto_base64 = base64.b64encode(foto.read()).decode('utf-8')
#
#    # Convertir el string JSON a un diccionario de Python
#    data = json.loads(request.form['data'])
#    data['foto']=foto_base64
#
#    
#    # Crear la solicitud gRPC con la imagen en bytes
#    solicitud= serviciosStockearte_pb2.altaProductoRequest(**data)
#
#    response=stub.altaProducto(solicitud)
#    return MessageToJson(response)

#@app.route('/altaProducto', methods=['POST'])
#def altaProducto():
#    # Convertir el string JSON a un diccionario de Python
#    data = request.json
#
#    # Crear la solicitud gRPC con la imagen en bytes
#    solicitud = serviciosStockearte_pb2.altaProductoRequest(**data)
#
#    response = stub.altaProducto(solicitud)
#    return MessageToJson(response)
@app.route('/altaProducto', methods=['POST'])
def altaProducto():
    data = request.json
    # print(data)
    # Convertir el campo "foto" a bytes
    data['foto'] = base64.b64decode(data['foto'])
    
    # Crear la solicitud gRPC
    solicitud = serviciosStockearte_pb2.altaProductoRequest(**data)
    
    response = stub.altaProducto(solicitud)
    return MessageToJson(response)


@app.route('/buscarProducto', methods=['POST'])
def  buscarProductos():

    solicitud= serviciosStockearte_pb2.buscarProductoRequest(**request.json)

    response=stub.buscarProducto(solicitud)
    return MessageToJson(response)


@app.route('/buscarTodosLosProductos', methods=['POST'])
def  buscarTodosLosProductos():    

    solicitud= serviciosStockearte_pb2.buscarTodosLosProductosRequest(**request.json)

    response=stub.buscarTodosLosProductos(solicitud)
    return MessageToJson(response)


@app.route('/modificarStock', methods=['POST'])
def  modificarStock():

    solicitud= serviciosStockearte_pb2.modificarStockRequest(**request.json)

    response=stub.modificarStock(solicitud)
    return MessageToJson(response)


@app.route('/modificarProducto', methods=['POST'])
def  modificarProducto():
    data = request.json
    print(data)
    # Convertir el campo "foto" a bytes
    data['foto'] = base64.b64decode(data['foto'])
    solicitud= serviciosStockearte_pb2.modificarProductoRequest(**data)

    response=stub.modificarProducto(solicitud)
    return MessageToJson(response)

#####################################################################################################
#  FUNCIONES COMPLEMENTARIAS
#####################################################################################################

@app.route('/traerUsuarioPorId', methods=['POST'])
def  traerUsuarioPorId():

    solicitud= serviciosStockearte_pb2.buscarIdRequest(**request.json)

    response=stub.traerUsuarioPorId(solicitud)
    return MessageToJson(response)



@app.route('/traerTiendaPorCodigo', methods=['POST'])
def  traerTiendaPorCodigo():

    solicitud= serviciosStockearte_pb2.buscarCodigoRequest(**request.json)

    response=stub.traerTiendaPorCodigo(solicitud)
    return MessageToJson(response)


@app.route('/traerProductoPorCodigo', methods=['POST'])
def  traerProductoPorCodigo():

    solicitud= serviciosStockearte_pb2.buscarCodigoRequest(**request.json)

    response=stub.traerProductoPorCodigo(solicitud)
    return MessageToJson(response)


@app.route('/hacerLogin', methods=['POST'])
def  hacerLogin():

    solicitud= serviciosStockearte_pb2.hacerLoginRequest(**request.json)

    response=stub.hacerLogin(solicitud)
    return MessageToJson(response)


@app.route('/traerProductosDeLaTienda', methods=['POST'])
def  traerProductosDeLaTienda():

    solicitud= serviciosStockearte_pb2.traerProductosDeLaTiendaRequest(**request.json)

    response=stub.traerProductosDeLaTienda(solicitud)
    return MessageToJson(response)



# Ejecutar la aplicación
if __name__ == '__main__':
    #app.run(host='0.0.0.0', port=8080, debug=True)
    app.run(debug=True)