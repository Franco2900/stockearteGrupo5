import requests
import json
from requests_toolbelt.multipart.encoder import MultipartEncoder

def realizarAlta(url, descripcion, data):

    print('\n' + descripcion)

    try:
        response = requests.post(url, json=data)
        print(response.json())
    except json.JSONDecodeError:
        print("La respuesta no es un JSON válido")


# TESTEO PUNTO 1.B: Alta usuario
url = "http://localhost:5000/altaUsuario"

altas = [

    {
        "descripcion": "Alta de usuario con todos los datos correctos",
        "data": {
            "usuarioCentral": "Racing Campeon",
            "usuario": "RickyFort",
            "password": "chocolate77",
            "nombre": "Ricardo",
            "apellido": "Fort",
            "habilitado": True,
            "tienda_codigo": "lmno456stu"
        }
    },
    {
        "descripcion": "Alta de usuario con todos los datos correctos",
        "data": {
            "usuarioCentral": "Racing Campeon",
            "usuario": "JhonWickardo",
            "password": "letal77",
            "nombre": "Jhon",
            "apellido": "Wick",
            "habilitado": True,
            "tienda_codigo": "10"
        }
    },
    {
        "descripcion": "Alta de usuario ya existente",
        "data": {
            "usuarioCentral": "Racing Campeon",
            "usuario": "JhonWickardo",
            "password": "letal77",
            "nombre": "Jhon",
            "apellido": "Wick",
            "habilitado": True,
            "tienda_codigo": "10"
        }
    }

]

for alta in altas:
    realizarAlta(url, alta["descripcion"], alta["data"])