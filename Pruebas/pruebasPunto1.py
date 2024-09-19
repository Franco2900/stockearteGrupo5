import requests
import json
from requests_toolbelt.multipart.encoder import MultipartEncoder


# TESTEO PUNTO 1.A: Alta tienda
url = "http://localhost:5000/altaTienda"

data = {
    "usuarioCentral": "Racing Campeon",
    "codigo": "8",
    "direccion": "Hogwarts",
    "ciudad": "Caballito",
    "provincia": "Buenos Aires",
    "habilitado": True
}

response = requests.post(url, json=data)
print(response.json() )


data = {
    "usuarioCentral": "Racing Campeon",
    "codigo": "9",
    "direccion": "Larroque",
    "ciudad": "Lomas",
    "provincia": "Buenos Aires",
    "habilitado": True
}

try:
    response = requests.get(url, json=data)
    print(response.json())
except json.JSONDecodeError:
    print("La respuesta no es un JSON válido")


data = {
    "usuarioCentral": "Racing Campeon",
    "codigo": "10",
    "direccion": "Pavon",
    "ciudad": "Banfield",
    "provincia": "Buenos Aires",
    "habilitado": True
}

try:
    response = requests.get(url, json=data)
    print(response.json())
except json.JSONDecodeError:
    print("La respuesta no es un JSON válido")

# ====================================================================================

url = "http://localhost:5000/bajaLogicaTienda"

data = {"codigo": "9"}

try:
    response = requests.get(url, json=data)
    print(response.json())
except json.JSONDecodeError:
    print("La respuesta no es un JSON válido")

data = {"codigo": "10"}

try:
    response = requests.get(url, json=data)
    print(response.json())
except json.JSONDecodeError:
    print("La respuesta no es un JSON válido")
# ====================================================================================


url = "http://localhost:5000/altaLogicaTienda"

data = {"codigo": "9"}

try:
    response = requests.get(url, json=data)
    print(response.json())
except json.JSONDecodeError:
    print("La respuesta no es un JSON válido")

data=  {"codigo": "10"}

try:
    response = requests.get(url, json=data)
    print(response.json())
except json.JSONDecodeError:
    print("La respuesta no es un JSON válido")

# ====================================================================================
# ====================================================================================
# ====================================================================================

# TESTEO PUNTO 1.B: Alta usuario
url = "http://localhost:5000/altaUsuario"

data={
    "usuarioCentral": "Racing Campeon",
    "usuario": "RickyFort",
    "password": "chocolate77",
    "nombre": "Ricardo",
    "apellido": "Fort",
    "habilitado": True,
    "tienda_codigo": "lmno456stu"
}


try:
    response = requests.get(url, json=data)
    print(response.json())
except json.JSONDecodeError:
    print("La respuesta no es un JSON válido")

data={
    "usuarioCentral": "Racing Campeon",
    "usuario": "JhonWickardo",
    "password": "letal77",
    "nombre": "Jhon",
    "apellido": "Wick",
    "habilitado": True,
    "tienda_codigo": "10"
}


try:
    response = requests.get(url, json=data)
    print(response.json())
except json.JSONDecodeError:
    print("La respuesta no es un JSON válido")

# ====================================================================================
# ====================================================================================
# ====================================================================================

# TESTEO PUNTO 1.C: Alta producto
url = "http://localhost:5000/altaProducto"


data = {
    "nombre": "Campera",
    "talle": "XL",
    "color": "Roja",
    "tiendaObject": [{"codigo": "9"}, {"codigo": "10"}],
}

# Crea el MultipartEncoder
m = MultipartEncoder(
    fields={
        "data": json.dumps(data),
        "foto": ("campera-roja.jpg", open("campera-roja.jpg", "rb"), "image/jpeg"),
    }
)

headers = {"Content-Type": m.content_type}

r = requests.post(url, data=m, headers=headers)

# Imprime la respuesta en formato JSON
print(r.json())


# ====================================================================================
"""
url = "http://localhost:5000/modificarProducto"

data = {"codigoProducto": "iXqBlBDGSc", "nuevoStock": 12}

try:
    response = requests.get(url, json=data)
    print(response.json())
except json.JSONDecodeError:
    print("La respuesta no es un JSON válido")

data = {"codigoProducto": "TZYdjxMAat", "nuevoStock": 23}

try:
    response = requests.get(url, json=data)
    print(response.json())
except json.JSONDecodeError:
    print("La respuesta no es un JSON válido")
"""
# ====================================================================================
# ====================================================================================
