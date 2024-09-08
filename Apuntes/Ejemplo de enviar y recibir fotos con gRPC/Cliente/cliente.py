import grpc            
import imagen_pb2       
import imagen_pb2_grpc 


def subirImagen():

    canal = grpc.insecure_channel("localhost:4000")
    stub  = imagen_pb2_grpc.ImagenStub(canal)   
    
    with open("Fotos/foto2.png", "rb") as foto: # Notese que subo una imagen en formato png
        imagenEnBinario = foto.read()

    # La declaración with asegura que el archivo se cierre automáticamente una vez que se salga del bloque with
    # open() sirve para abrir cualquier archivo
    # rb significa modo de lectura binaria (read binary)
    # read() lee todo el contenido del archivo y lo devuelve (como indicamos rb lo va a devolver en bytes)

    request = imagen_pb2.mensajeImagen(imagen = imagenEnBinario)
    response = stub.subirImagen(request)                            
    
    print("Respuesta del servidor: " + response.mensaje) 
 

def bajarImagen():

    canal = grpc.insecure_channel("localhost:4000")
    stub  = imagen_pb2_grpc.ImagenStub(canal)   

    request = imagen_pb2.mensajeVacio()
    response = stub.bajarImagen(request)

    with open("Fotos/imagenRecibida.jpg", "wb") as foto: 
        foto.write(response.imagen)
        print('Imagen recibida')

    # wb significa modo de escritura binaria (write binary)
    # write() escribe un nuevo archivo, en este caso es la imagen


if __name__ == "__main__":
    subirImagen()
    bajarImagen()
