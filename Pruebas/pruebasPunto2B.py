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


# TESTEO PUNTO 2.B: Buscar tiendas
"""
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
"""

# ====================================================================================

url = "http://localhost:5000/buscarTiendas"


consultas = [
    {
        "descripcion": "Consulta con todos los datos correctos",
        "data": {
            "usuarioCentral": "Racing Campeon",
            "codigoTiendaABuscar": "asdfgh987",
            "habilitado": True
        }
    },
    {
        "descripcion": "Consulta de un usuario que no es de tienda central",
        "data": {
            "usuarioCentral": "The One",
            "codigoTiendaABuscar": "asdfgh987",
            "habilitado": True
        }
    },
    {
        "descripcion": "Consulta de una tienda pero con el estado habilitado opuesto a como esta en la  base de datos",
        "data": {
            "usuarioCentral": "Racing Campeon",
            "codigoTiendaABuscar": "asdfgh987",
            "habilitado": False
        }
    },
    {
        "descripcion": "Consulta en la que solo se pasa el estado habilitado",
        "data": {
            "usuarioCentral": "Racing Campeon",
            "codigoTiendaABuscar": "",
            "habilitado": False
        }
    },
    {
        "descripcion": "Consulta en la que solo se pasa el codigo de la tienda a buscar",
        "data": {
            "usuarioCentral": "Racing Campeon",
            "codigoTiendaABuscar": "lmno456stu",
            "habilitado": None
        }
    }
]


for consulta in consultas:
    realizarConsulta(url, consulta["descripcion"], consulta["data"])