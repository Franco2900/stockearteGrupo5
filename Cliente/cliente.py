import grpc                         # Libreria para trabajar con grpc
import serviciosStockearte_pb2      # Contiene las definiciones de los mensajes
import serviciosStockearte_pb2_grpc # Contiene las definiciones de los servicios
import base64
import json

#make_response lo podemos usar para un mensaje estático
from flask import Flask,request,make_response
from google.protobuf.json_format import MessageToJson


# Crear una instancia de la aplicación Flask
app = Flask(__name__)

# Crea una conexión de canal insegura con el servidor gRPC en una determinada dirección IP y puerto
canal = grpc.insecure_channel("localhost:8000") 

# Definir una ruta para la página principal
@app.route('/')
def hello():
    return "¡Hola, Mundo!"

    
@app.route('/altaTienda', methods=['POST'])
def altaTienda():

    # Se crea un stub para interactuar con los servicios
    stub  = serviciosStockearte_pb2_grpc.stockearteServiceStub(canal)

    #Desempaquetamos el diccionario en argumentos con nombre y valor
    solicitud= serviciosStockearte_pb2.altaTiendaRequest(**request.json)

    response=stub.altaTienda(solicitud)
    return MessageToJson(response)


@app.route('/bajaLogicaTienda', methods=['POST'])
def bajaLogicaTienda():
    stub  = serviciosStockearte_pb2_grpc.stockearteServiceStub(canal)

    solicitud= serviciosStockearte_pb2.bajaLogicaTiendaRequest(**request.json)

    response=stub.bajaLogicaTienda(solicitud)
    return MessageToJson(response)

@app.route('/altaLogicaTienda', methods=['POST'])
def altaLogicaTienda():
    stub  = serviciosStockearte_pb2_grpc.stockearteServiceStub(canal)

    solicitud= serviciosStockearte_pb2.altaLogicaTiendaRequest(**request.json)

    response=stub.altaLogicaTienda(solicitud)
    return MessageToJson(response)


@app.route('/altaUsuario', methods=['POST'])
def altaUsuario():
    stub  = serviciosStockearte_pb2_grpc.stockearteServiceStub(canal)

    solicitud= serviciosStockearte_pb2.altaUsuarioRequest(**request.json)
    print(request.json)
    response=stub.altaUsuario(solicitud)
    return MessageToJson(response)


@app.route('/altaProducto', methods=['POST'])
def altaProducto():
    # Convertir la imagen a base64
    foto = request.files["foto"]
    foto_base64 = base64.b64encode(foto.read()).decode('utf-8')

    # Convertir el string JSON a un diccionario de Python
    data = json.loads(request.form['data'])
    data['foto']=foto_base64

    stub  = serviciosStockearte_pb2_grpc.stockearteServiceStub(canal)

    # Crear la solicitud gRPC con la imagen en bytes
    solicitud= serviciosStockearte_pb2.altaProductoRequest(**data)

    response=stub.altaProducto(solicitud)
    return MessageToJson(response)



@app.route('/modificarProducto', methods=['POST'])
def modificarProducto():

    stub  = serviciosStockearte_pb2_grpc.stockearteServiceStub(canal)

    solicitud= serviciosStockearte_pb2.modificacionProductoRequest(**request.json)

    response=stub.modificacionProducto(solicitud)
    return MessageToJson(response)


@app.route('/buscarUsuarioXUsuario', methods=['GET'])
def buscarUsuario_X_Usuario():

    stub  = serviciosStockearte_pb2_grpc.stockearteServiceStub(canal)

    solicitud= serviciosStockearte_pb2.buscarUsuario_X_UsuarioRequest(**request.json)

    response=stub.buscarUsuario_X_Usuario(solicitud)
    return MessageToJson(response)


@app.route('/buscarUsuarioXTiendaCodigo', methods=['GET'])
def buscarUsuario_X_TiendaCodigo():

    stub  = serviciosStockearte_pb2_grpc.stockearteServiceStub(canal)

    solicitud= serviciosStockearte_pb2.buscarUsuario_X_TiendaCodigoRequest(**request.json)

    response=stub.buscarUsuario_X_TiendaCodigo(solicitud)
    return MessageToJson(response)


@app.route('/buscarUsuarios', methods=['GET'])
def buscarUsuarios():

    stub  = serviciosStockearte_pb2_grpc.stockearteServiceStub(canal)

    solicitud= serviciosStockearte_pb2.buscarUsuarioRequest(**request.json)

    response=stub.buscarUsuarios(solicitud)
    return MessageToJson(response)


@app.route('/buscarTiendaXTiendaCodigo', methods=['GET'])
def buscarTienda_X_TiendaCodigo():

    stub  = serviciosStockearte_pb2_grpc.stockearteServiceStub(canal)

    solicitud= serviciosStockearte_pb2.buscarTienda_X_TiendaCodigoRequest(**request.json)

    response=stub.buscarTienda_X_TiendaCodigo(solicitud)
    return MessageToJson(response)


@app.route('/buscarTiendaXHabilitado', methods=['GET'])
def  buscarTienda_X_Habilitado():

    stub  = serviciosStockearte_pb2_grpc.stockearteServiceStub(canal)

    solicitud= serviciosStockearte_pb2.buscarTienda_X_HabilitadoRequest(**request.json)

    response=stub.buscarTienda_X_Habilitado(solicitud)
    return MessageToJson(response)

@app.route('/buscarTiendas', methods=['GET'])
def  buscarTiendas():

    stub  = serviciosStockearte_pb2_grpc.stockearteServiceStub(canal)

    solicitud= serviciosStockearte_pb2.buscarTiendaRequest(**request.json)

    response=stub.buscarTiendas(solicitud)
    return MessageToJson(response)


@app.route('/buscarProductoXNombre', methods=['GET'])
def  buscarProducto_X_Nombre():

    stub  = serviciosStockearte_pb2_grpc.stockearteServiceStub(canal)

    solicitud= serviciosStockearte_pb2.buscarProducto_X_NombreRequest(**request.json)

    response=stub.buscarProducto_X_Nombre(solicitud)
    return MessageToJson(response)


@app.route('/buscarProductoXCodigo', methods=['GET'])
def  buscarProducto_X_Codigo():

    stub  = serviciosStockearte_pb2_grpc.stockearteServiceStub(canal)

    solicitud= serviciosStockearte_pb2.buscarProducto_X_CodigoRequest(**request.json)

    response=stub.buscarProducto_X_Codigo(solicitud)
    return MessageToJson(response)


@app.route('/buscarProductoXTalle', methods=['GET'])
def  buscarProducto_X_Talle():

    stub  = serviciosStockearte_pb2_grpc.stockearteServiceStub(canal)

    solicitud= serviciosStockearte_pb2.buscarProducto_X_TalleRequest(**request.json)

    response=stub.buscarProducto_X_Talle(solicitud)
    return MessageToJson(response)


@app.route('/buscarProductoXColor', methods=['GET'])
def  buscarProducto_X_Color():

    stub  = serviciosStockearte_pb2_grpc.stockearteServiceStub(canal)

    solicitud= serviciosStockearte_pb2.buscarProducto_X_ColorRequest(**request.json)

    response=stub.buscarProducto_X_Color(solicitud)
    return MessageToJson(response)

@app.route('/buscarProductos', methods=['GET'])
def  buscarProductos():

    stub  = serviciosStockearte_pb2_grpc.stockearteServiceStub(canal)

    solicitud= serviciosStockearte_pb2.buscarProductosRequest(**request.json)

    response=stub.buscarProductos(solicitud)
    return MessageToJson(response)


@app.route('/buscarTodosLosProductos', methods=['GET'])
def  buscarTodosLosProductos():

    stub  = serviciosStockearte_pb2_grpc.stockearteServiceStub(canal)

    solicitud= serviciosStockearte_pb2.mensajeVacio(**request.json)

    response=stub.buscarTodosLosProductos(solicitud)
    return MessageToJson(response)


@app.route('/buscarTodosLosUsuarios', methods=['GET'])
def  buscarTodosLosUsuarios():

    stub  = serviciosStockearte_pb2_grpc.stockearteServiceStub(canal)

    solicitud= serviciosStockearte_pb2.mensajeVacio(**request.json)

    response=stub.buscarTodosLosUsuarios(solicitud)
    return MessageToJson(response)


@app.route('/buscarTodasLasTiendas', methods=['GET'])
def  buscarTodasLasTiendas():

    stub  = serviciosStockearte_pb2_grpc.stockearteServiceStub(canal)

    solicitud= serviciosStockearte_pb2.mensajeVacio(**request.json)

    response=stub.buscarTodasLasTiendas(solicitud)
    return MessageToJson(response)


@app.route('/modificarUsuario', methods=['POST'])
def  modificarUsuario():

    stub  = serviciosStockearte_pb2_grpc.stockearteServiceStub(canal)

    solicitud= serviciosStockearte_pb2.modificarUsuarioRequest(**request.json)

    response=stub.modificarUsuario(solicitud)
    return MessageToJson(response)


@app.route('/modificarTienda', methods=['POST'])
def  modificarTienda():

    stub  = serviciosStockearte_pb2_grpc.stockearteServiceStub(canal)

    solicitud= serviciosStockearte_pb2.modificarTiendaRequest(**request.json)

    response=stub.modificarTienda(solicitud)
    return MessageToJson(response)


@app.route('/modificarStock', methods=['POST'])
def  modificarStock():

    stub  = serviciosStockearte_pb2_grpc.stockearteServiceStub(canal)

    solicitud= serviciosStockearte_pb2.modificarStockRequest(**request.json)

    response=stub.modificarTienda(solicitud)
    return MessageToJson(response)



# Ejecutar la aplicación
if __name__ == '__main__':
    #app.run(host='0.0.0.0', port=8080, debug=True)
    app.run(debug=True)