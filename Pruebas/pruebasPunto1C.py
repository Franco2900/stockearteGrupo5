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