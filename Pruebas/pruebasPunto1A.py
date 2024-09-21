import requests
import json
from requests_toolbelt.multipart.encoder import MultipartEncoder

def realizarSolicitud(url, descripcion, data):

    print('\n' + descripcion)

    try:
        response = requests.post(url, json=data)
        print(response.json())
    except json.JSONDecodeError:
        print("La respuesta no es un JSON válido")


# TESTEO PUNTO 1.A: Alta tienda
url = "http://localhost:5000/altaTienda"

altas = [

    {
        "descripcion": "Alta de tienda con todos los datos correctos",
        "data": {
            "usuarioCentral": "Racing Campeon",
            "codigo": "8",
            "direccion": "Hogwarts",
            "ciudad": "Caballito",
            "provincia": "Buenos Aires",
            "habilitado": True
        }
    },
    {
        "descripcion": "Alta de tienda con todos los datos correctos",
        "data": {
            "usuarioCentral": "Racing Campeon",
            "codigo": "9",
            "direccion": "Larroque",
            "ciudad": "Lomas",
            "provincia": "Buenos Aires",
            "habilitado": True
        }
    },
    {
        "descripcion": "Alta de tienda con todos los datos correctos",
        "data": {
            "usuarioCentral": "Racing Campeon",
            "codigo": "10",
            "direccion": "Pavon",
            "ciudad": "Banfield",
            "provincia": "Buenos Aires",
            "habilitado": True
        }
    }

]

for alta in altas:
    realizarSolicitud(url, alta["descripcion"], alta["data"])

# ====================================================================================

url = "http://localhost:5000/bajaLogicaTienda"

codigos = ["9", "10"]

for codigo in codigos:
    data = {"codigo": codigo}
    realizarSolicitud(url, "Baja logica de tienda", data)

# ====================================================================================

url = "http://localhost:5000/altaLogicaTienda"

codigos = ["9", "10"]

for codigo in codigos:
    data = {"codigo": codigo}
    realizarSolicitud(url, "Alta logica de tienda", data)
