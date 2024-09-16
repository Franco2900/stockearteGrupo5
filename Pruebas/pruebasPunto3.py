import requests
import json
from requests_toolbelt.multipart.encoder import MultipartEncoder


# TESTEO PUNTO 3.A: Listado de productos
url = "http://localhost:5000/buscarTodosLosProductos"

response = requests.post(url)
print(response.json())

# ====================================================================================
# ====================================================================================
# ====================================================================================

# TESTEO PUNTO 3.B: Listado de usuarios
url = "http://localhost:5000/buscarTodosLosUsuarios"

response = requests.post(url)
print(response.json())

# ====================================================================================
# ====================================================================================
# ====================================================================================

# TESTEO PUNTO 3.C: Listado de tiendas
url = "http://localhost:5000/buscarTodasLasTiendas"

response = requests.post(url)
print(response.json())
