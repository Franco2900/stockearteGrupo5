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

consultas = [
    {
        "descripcion": "Consulta con todos los datos correctos",
        "data": {
            "usuarioCentral": "Racing Campeon",
            "usuarioABuscar": "La Peluca",
            "codigoTiendaABuscar": "asdfgh987"
        }
    },
    {
        "descripcion": "Consulta de un usuario que no existe en la tienda a buscar",
        "data": {
            "usuarioCentral": "Racing Campeon",
            "usuarioABuscar": "La Peluca",
            "codigoTiendaABuscar": "sanji32542"
        }
    },
    {
        "descripcion": "Consulta en la que solo se pasa la tienda",
        "data": {
            "usuarioCentral": "Racing Campeon",
            "usuarioABuscar": "",
            "codigoTiendaABuscar": "sanji32542"
        }
    },
    {
        "descripcion": "Consulta en la que solo se pasa el usuario",
        "data": {
            "usuarioCentral": "Racing Campeon",
            "usuarioABuscar": "La Peluca",
            "codigoTiendaABuscar": ""
        }
    }
]

for consulta in consultas:
    realizarConsulta(url, consulta["descripcion"], consulta["data"])