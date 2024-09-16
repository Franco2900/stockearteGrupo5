import requests
import json
from requests_toolbelt.multipart.encoder import MultipartEncoder


# TESTEO PUNTO 2.A: Buscar usuarios
url = "http://localhost:5000/buscarUsuario_X_Usuario"

data = {
    "usuarioCentral": "Racing Campeon",
    "usuarioABuscar": "La Peluca"
}

response = requests.post(url, json=data)
print(response.json())

# ====================================================================================

url = "http://localhost:5000/buscarUsuario_X_TiendaCodigo"

data = {
    "usuarioCentral": "Racing Campeon",
    "tiendaABuscar": "lmno456st"
}

response = requests.post(url, json=data)
print(response.json())

# ====================================================================================
# ====================================================================================
# ====================================================================================

# TESTEO PUNTO 2.B: Buscar tiendas
url = "http://localhost:5000/buscarTienda_X_TiendaCodigo"

data = {
    "usuarioCentral": "Racing Campeon",
    "tiendaABuscar": "lmno456st"
}

response = requests.post(url, json=data)
print(response.json())

# ====================================================================================

url = "http://localhost:5000/buscarTienda_X_Habilitado"

data = {
    "usuarioCentral": "Racing Campeon",
    "habilitado": False
}

response = requests.post(url, json=data)
print(response.json())

# ====================================================================================
# ====================================================================================
# ====================================================================================

# TESTEO PUNTO 2.C: Buscar productos
url = "http://localhost:5000/buscarProducto_X_Nombre"

data = {
    "nombre": "            ",
}

response = requests.post(url, json=data)
print(response.json())

# ====================================================================================

url = "http://localhost:5000/buscarProducto_X_Codigo"

data = {
    "codigo": "            ",
}

response = requests.post(url, json=data)
print(response.json())

# ====================================================================================

url = "http://localhost:5000/buscarProducto_X_Talle"

data = {
    "talle": "            ",
}

response = requests.post(url, json=data)
print(response.json())

# ====================================================================================

url = "http://localhost:5000/buscarProducto_X_Color"

data = {
    "color": "            ",
}

response = requests.post(url, json=data)
print(response.json())