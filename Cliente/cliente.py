import grpc                         # Libreria para trabajar con grpc
import serviciosStockearte_pb2      # Contiene las definiciones de los mensajes
import serviciosStockearte_pb2_grpc # Contiene las definiciones de los servicios

#make_response lo podemos usar para un mensaje estático
from flask import Flask,request,make_response
from google.protobuf.json_format import MessageToJson


# Crear una instancia de la aplicación Flask
app = Flask(__name__)

# Crea una conexión de canal insegura con el servidor gRPC en una determinada dirección IP y puerto
canal = grpc.insecure_channel("localhost:8000") 


"""
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Falta implentar endpoint para:

- verStockPorTalleYColor

-generarTocken(LOGIN)
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
"""

# Definir una ruta para la página principal
@app.route('/')
def hello():
    return "¡Hola, Mundo!"

    
@app.route('/altaTienda', methods=['POST'])
def altaTienda():

    # Se crea un stub para interactuar con los servicios
    stub  = serviciosStockearte_pb2_grpc.StockearteStub(canal)

    #Desempaquetamos el diccionario en argumentos con nombre y valor
    solicitud= serviciosStockearte_pb2.altaTiendaRequest(**request.json)

    response=stub.altaTienda(solicitud)
    return MessageToJson(response)


@app.route('/bajaTienda', methods=['POST'])
def bajaTienda():
    stub  = serviciosStockearte_pb2_grpc.StockearteStub(canal)

    solicitud= serviciosStockearte_pb2.bajaLogicaTiendaRequest(**request.json)

    response=stub.bajaLogicaTienda(solicitud)
    return MessageToJson(response)

@app.route('/altaUsuario', methods=['POST'])
def altaUsuario():
    stub  = serviciosStockearte_pb2_grpc.StockearteStub(canal)

    solicitud= serviciosStockearte_pb2.altaUsuarioRequest(**request.json)

    response=stub.altaUsuario(solicitud)
    return MessageToJson(response)


@app.route('/altaProducto', methods=['POST'])
def altaProducto():
    stub  = serviciosStockearte_pb2_grpc.StockearteStub(canal)

    solicitud= serviciosStockearte_pb2.altaProductoRequest(**request.json)

    response=stub.altaProducto(solicitud)
    return MessageToJson(response)



@app.route('/modificarProducto', methods=['POST'])
def modificarProducto():

    stub  = serviciosStockearte_pb2_grpc.StockearteStub(canal)

    solicitud= serviciosStockearte_pb2.modificacionProductoRequest(**request.json)

    response=stub.modificacionProducto(solicitud)
    return MessageToJson(response)


# Ejecutar la aplicación
if __name__ == '__main__':
    #app.run(host='0.0.0.0', port=8080, debug=True)
    app.run(debug=True)