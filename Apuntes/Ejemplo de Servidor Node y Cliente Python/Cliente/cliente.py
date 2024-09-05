import grpc             # Libreria para trabajar con grpc
import persona_pb2      # Contiene las definiciones de los mensajes
import persona_pb2_grpc # Contiene las definiciones de los servicios


def run():

    canal = grpc.insecure_channel("localhost:4000") # Crea una conexión de canal insegura con el servidor gRPC en una determinada dirección IP y puerto
    stub  = persona_pb2_grpc.PersonaStub(canal)     # Se crea un stub para interactuar con los servicios
    
    request = persona_pb2.SaludarRequest(nombre="Unlero", dia="Domingo") # Uso la definicion de un mensaje para crear una request
    response = stub.saludar(request)                                     # Llamo a uno de los metodos de los servicios y guardo la respuesta del servidor
    
    print("Respuesta del servidor: " + response.saludo) # Uno de los atributos de la respuesta del servidor


if __name__ == "__main__":
    run()
