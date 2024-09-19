import requests
import json
from requests_toolbelt.multipart.encoder import MultipartEncoder

def realizarConsulta(url, descripcion, data):

    print('\n' + descripcion)

    try:
        response = requests.get(url, json=data)
        print(response.json())
    except json.JSONDecodeError:
        print("La respuesta no es un JSON válido")


# TESTEO PUNTO 2.C: Buscar productos
"""
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
# ====================================================================================

url = "http://localhost:5000/buscarProductos"


consultas = [
    {
        "descripcion": "Consulta con todos los datos correctos",
        "data": {
            "usuarioCentral": "Racing Campeon",
            "codigo": "PJ456",
            "nombre": "Pantalones Jeans",
            "talle": "L",
            "color": "Azul",
        }
    },
    {
        "descripcion": "Consulta con solo el codigo",
        "data": {
            "usuarioCentral": "Racing Campeon",
            "codigo": "PJ456",
            "nombre": None,
            "talle": None,
            "color": None,
        }
    },
    {
        "descripcion": "Consulta con solo el nombre",
        "data": {
            "usuarioCentral": "Racing Campeon",
            "codigo": None,
            "nombre": "Pantalones Jeans",
            "talle": None,
            "color": None,
        }
    },
    {
        "descripcion": "Consulta con solo el talle",
        "data": {
            "usuarioCentral": "Racing Campeon",
            "codigo": None,
            "nombre": None,
            "talle": "L",
            "color": None,
        }
    },
    {
        "descripcion": "Consulta con solo el color",
        "data": {
            "usuarioCentral": "Racing Campeon",
            "codigo": None,
            "nombre": None,
            "talle": None,
            "color": "Azul",
        }
    },
    {
        "descripcion": "Consulta con solo el talle y el color",
        "data": {
            "usuarioCentral": "Racing Campeon",
            "codigo": None,
            "nombre": None,
            "talle": "M",
            "color": "Rojo",
        }
    }
]


for consulta in consultas:
    realizarConsulta(url, consulta["descripcion"], consulta["data"])

