import requests
import json
from requests_toolbelt.multipart.encoder import MultipartEncoder


# TESTEO PUNTO 3.A: Listado de productos
url = "http://localhost:5000/buscarTodosLosProductos"

# ====================================================================================
data = {
    "usuarioCentral": "Racing Campeon",
}

print("\nBuscar todos los productos como usuario de tienda central")
try:
    response = requests.get(url, json=data)
    print(response.json())
except json.JSONDecodeError:
    print("La respuesta no es un JSON válido")

# ====================================================================================

data = {
    "usuarioCentral": "La Peluca",
}

print("\nBuscar todos los productos como usuario de tienda comun")
try:
    response = requests.get(url, json=data)
    print(response.json())
except json.JSONDecodeError:
    print("La respuesta no es un JSON válido")
