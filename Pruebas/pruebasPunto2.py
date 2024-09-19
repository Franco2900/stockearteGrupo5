import requests
import json
from requests_toolbelt.multipart.encoder import MultipartEncoder

"""
# TESTEO PUNTO 2.A: Buscar usuarios
url = "http://localhost:5000/buscarUsuarioXUsuario"

data = {
    "usuarioCentral": "Racing Campeon",
    "usuarioABuscar": "La Peluca"
}

try:
    response = requests.get(url, json=data)
    print(response.json())
except json.JSONDecodeError:
    print("La respuesta no es un JSON válido")

# ====================================================================================

url = "http://localhost:5000/buscarUsuarioXTiendaCodigo"

data = {
    "usuarioCentral": "Racing Campeon",
    "tiendaABuscar": "sanji32542"
}

try:
    response = requests.get(url, json=data)
    print(response.json())
except json.JSONDecodeError:
    print("La respuesta no es un JSON válido")
"""

# ====================================================================================

url = "http://localhost:5000/buscarUsuarios"

data = {
    "usuarioCentral": "Racing Campeon",
    "usuarioABuscar": "La Peluca",
    "codigoTiendaABuscar": "asdfgh987"
}

try:
    response = requests.get(url, json=data)
    print(response.json())
except json.JSONDecodeError:
    print("La respuesta no es un JSON válido")

# El usuario a buscar no esta en esa tienda
data = {
    "usuarioCentral": "Racing Campeon",
    "usuarioABuscar": "La Peluca",
    "codigoTiendaABuscar": "sanji32542"
}

try:
    response = requests.get(url, json=data)
    print(response.json())
except json.JSONDecodeError:
    print("La respuesta no es un JSON válido")

# Solo se pasa la tienda
data = {
    "usuarioCentral": "Racing Campeon",
    "usuarioABuscar": "",
    "codigoTiendaABuscar": "sanji32542"
}

try:
    response = requests.get(url, json=data)
    print(response.json())
except json.JSONDecodeError:
    print("La respuesta no es un JSON válido")

# Solo se pasa el usuario
data = {
    "usuarioCentral": "Racing Campeon",
    "usuarioABuscar": "La Peluca",
    "codigoTiendaABuscar": ""
}

try:
    response = requests.get(url, json=data)
    print(response.json())
except json.JSONDecodeError:
    print("La respuesta no es un JSON válido")

# ====================================================================================
# ====================================================================================
# ====================================================================================
"""
# TESTEO PUNTO 2.B: Buscar tiendas
url = "http://localhost:5000/buscarTiendaXTiendaCodigo"

data = {
    "usuarioCentral": "Racing Campeon",
    "tiendaABuscar": "xcbewu13"
}

try:
    response = requests.get(url, json=data)
    print(response.json())
except json.JSONDecodeError:
    print("La respuesta no es un JSON válido")


# ====================================================================================

url = "http://localhost:5000/buscarTiendaXHabilitado"

data = {
    "usuarioCentral": "Racing Campeon",
    "habilitado": True
}

try:
    response = requests.get(url, json=data)
    print(response.json())
except json.JSONDecodeError:
    print("La respuesta no es un JSON válido")


data = {
    "usuarioCentral": "Racing Campeon",
    "habilitado": False
}

#json_data = json.dumps(data)

try:
    response = requests.get(url, json=data)
    print(response.json())
except json.JSONDecodeError:
    print("La respuesta no es un JSON válido")

# ====================================================================================
# ====================================================================================
# ====================================================================================

# TESTEO PUNTO 2.C: Buscar productos
url = "http://localhost:5000/buscarProductoXNombre"

data = {
    "nombre": "Camisa Básica",
}

try:
    response = requests.get(url, json=data)
    print(response.json())
except json.JSONDecodeError:
    print("La respuesta no es un JSON válido")


# ====================================================================================

url = "http://localhost:5000/buscarProductoXCodigo"

data = {
    "codigo": "CB123",
}

try:
    response = requests.get(url, json=data)
    print(response.json())
except json.JSONDecodeError:
    print("La respuesta no es un JSON válido")


# ====================================================================================

url = "http://localhost:5000/buscarProductoXTalle"

data = {
    "talle": "L",
}

try:
    response = requests.get(url, json=data)
    print(response.json())
except json.JSONDecodeError:
    print("La respuesta no es un JSON válido")


# ====================================================================================

url = "http://localhost:5000/buscarProductoXColor"

data = {
    "color": "Azul",
}

try:
    response = requests.get(url, json=data)
    print(response.json())
except json.JSONDecodeError:
    print("La respuesta no es un JSON válido")
"""