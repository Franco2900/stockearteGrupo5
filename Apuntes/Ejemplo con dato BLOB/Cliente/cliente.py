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

    # Convertir la imagen a base64
    foto = request.files['foto']
    foto_base64 = base64.b64encode(foto.read()).decode('utf-8')

    # Convertir el string JSON a un diccionario de Python
    data = json.loads(request.form['data'])
    data['foto']=foto_base64

    stub  = imagenBlob_pb2_grpc.StockearteStub(canal)

    # Crear la solicitud gRPC con la imagen en bytes
    solicitud= imagenBlob_pb2.altaProductoRequest(**data)

    response=stub.altaProducto(solicitud)

    return MessageToJson(response)


@app.route('/')
def index():
    return make_response("ok")

# Ejecutar la aplicación
if __name__ == '__main__':
    app.run(debug=True)
