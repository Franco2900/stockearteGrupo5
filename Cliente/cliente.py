import grpc                         # Libreria para trabajar con grpc
import serviciosStockearte_pb2      # Contiene las definiciones de los mensajes
import serviciosStockearte_pb2_grpc # Contiene las definiciones de los servicios

from flask import Flask,request,make_response

# Crear una instancia de la aplicación Flask
app = Flask(__name__)

# Crea una conexión de canal insegura con el servidor gRPC en una determinada dirección IP y puerto
canal = grpc.insecure_channel("localhost:8080") 



# Definir una ruta para la página principal
@app.route('/')
def hello():
    return "¡Hola, Mundo!"

    
@app.route('/altaTienda')
def altaTienda():
    # Se crea un stub para interactuar con los servicios
    stub  = serviciosStockearte_pb2_grpc.StockearteStub(canal)
    #result= stub.altaTienda(request.json)
    #return make_response("ok")
    solicitud= serviciosStockearte_pb2.altaTiendaRequest(codigoTienda="1",direccion="Av. siempre viva",ciudad="Lanus",provincia="Buenos Aires",habilitado=True)
    response=stub.altaTienda(solicitud)
    print("Respuesta del servidor: " + response.mensaje)
    return make_response(response.mensaje)

@app.route('/bajaTienda')
def bajaTienda():
    # Se crea un stub para interactuar con los servicios
    stub  = serviciosStockearte_pb2_grpc.StockearteStub(canal)
    solicitud= serviciosStockearte_pb2.bajaTiendaRequest(codigoTienda="1")
    response=stub.bajaTienda(solicitud)
    print("Respuesta del servidor: " + response.mensaje)
    return make_response(response.mensaje)

@app.route('/altaUsuario')
def altaUsuario():
    # Se crea un stub para interactuar con los servicios
    stub  = serviciosStockearte_pb2_grpc.StockearteStub(canal)
    solicitud= serviciosStockearte_pb2.altaUsuarioRequest(nombre="Tony",apellido="Stark",nombreUsuario="TonyStark777",contrasenia="YosoyIronman123",habilitado=True,codigoTienda="1")
    response=stub.altaUsuario(solicitud)
    print("Respuesta del servidor: " + response.mensaje)
    return make_response(response.mensaje)

@app.route('/altaProducto')
def altaProducto():
    # Se crea un stub para interactuar con los servicios
    stub  = serviciosStockearte_pb2_grpc.StockearteStub(canal)
    solicitud= serviciosStockearte_pb2.altaProductoRequest(nombre="Pantalon",codigoProducto="",talle="XXL",foto="Imagen-1",color="verde")
    response=stub.altaProducto(solicitud)
    print("Respuesta del servidor: " + response.mensaje)
    return make_response(response.mensaje)

@app.route('/modificarProducto')
def modificarProducto():
    # Se crea un stub para interactuar con los servicios
    stub  = serviciosStockearte_pb2_grpc.StockearteStub(canal)
    solicitud= serviciosStockearte_pb2.modificacionProductoRequest(codigoProducto="kQtsjcMSMh",stock=20)
    response=stub.modificacionProducto(solicitud)
    print("Respuesta del servidor: " + response.mensaje)
    return make_response(response.mensaje)



# Ejecutar la aplicación
if __name__ == '__main__':
    #app.run(host='0.0.0.0', port=8080, debug=True)
    app.run(debug=True)