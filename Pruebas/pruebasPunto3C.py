import requests
import json
from requests_toolbelt.multipart.encoder import MultipartEncoder

# TESTEO PUNTO 3.C: Listado de tiendas
url = "http://localhost:5000/buscarTodasLasTiendas"

print("\nBuscar todas las tiendas")
try:
    response = requests.get(url)
    print(response.json())
except json.JSONDecodeError:
    print("La respuesta no es un JSON válido")