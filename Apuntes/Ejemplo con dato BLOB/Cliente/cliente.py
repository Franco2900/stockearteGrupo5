import grpc            
import imagenBlob_pb2       
import imagenBlob_pb2_grpc 
import base64
import json

#make_response lo podemos usar para un mensaje estático
from flask import Flask,request,make_response
from google.protobuf.json_format import MessageToJson



# Crear una instancia de la aplicación Flask
app = Flask(__name__)

# Crea una conexión de canal insegura con el servidor gRPC en una determinada dirección IP y puerto
canal = grpc.insecure_channel("localhost:4000") 



@app.route('/altaProducto', methods=['POST'])
def altaProducto():

    # Ruta a la imagen local
    ruta_imagen = "Imagenes/foto3.jpg" 

    # Leer la imagen y convertirla a Base64
    with open(ruta_imagen, "rb") as imagen_file:
        imagen_base64 = base64.b64encode(imagen_file.read()).decode('utf-8')

    # Insertar la imagen codificada en el campo "foto" del JSON recibido
    request.json["foto"] = imagen_base64

    print(request.json)

    stub  = imagenBlob_pb2_grpc.StockearteStub(canal)

    # Crear la solicitud gRPC con la imagen en bytes
    solicitud= imagenBlob_pb2.altaProductoRequest(**request.json)

    response=stub.altaProducto(solicitud)

    return MessageToJson(response)

@app.route('/mostrarProducto', methods=['POST'])
def mostrarProducto():

    stub  = imagenBlob_pb2_grpc.StockearteStub(canal)


    solicitud= imagenBlob_pb2.consultarProductoRequest(**request.json)
    response=stub.mostrarProducto(solicitud)


    # Convertir el mensaje Protobuf a un string JSON.
    objeto_json_str = MessageToJson(response)

    # Convertir el string JSON a un diccionario de Python.
    objeto = json.loads(objeto_json_str)

    # Decodifica el string en base64
    image_data = base64.b64decode(objeto['mensaje'])


    # Define la ruta y el nombre del archivo donde se guardará la imagen
    output_path = 'Recibido/foto3.jpg'  

    # Guarda la imagen en la carpeta especificada
    with open(output_path, 'wb') as file:
        file.write(image_data)

    return make_response("Foto guardada correctamente")


@app.route('/')
def index():
    # Renderizar el template HTML donde se mostrará la imagen
    return make_response("ok")

# Ejecutar la aplicación
if __name__ == '__main__':
    app.run(debug=True)
