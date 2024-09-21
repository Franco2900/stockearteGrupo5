import requests
import json
from requests_toolbelt.multipart.encoder import MultipartEncoder

# TESTEO PUNTO 3.B: Listado de usuarios
url = "http://localhost:5000/buscarTodosLosUsuarios"

print("\nBuscar todos los usuarios")
try:
    response = requests.get(url)
    print(response.json())
except json.JSONDecodeError:
    print("La respuesta no es un JSON válido")