import requests
import json
from requests_toolbelt.multipart.encoder import MultipartEncoder


# TESTEO PUNTO 4.A: Modificación usuario
url = 'http://localhost:5000/modificarUsuario'

data = {
    'usuarioAModificar': 'La Peluca',
    'usuario': 'La Mona',
    'password': 'qwerty',
    'nombre': 'Moni',
    'apellido': 'Argento',
    'habilitado': True,
    'tienda_codigo': 'asdfgh987',
}

response = requests.post(url, json=data)
print(response.json())

# ====================================================================================
# ====================================================================================
# ====================================================================================

# TESTEO PUNTO 4.B: Modificación tienda
url = 'http://localhost:5000/modificarTienda'

data = {
    'tiendaAModificar': ' ',
    'codigo': ' ',
    'direccion': ' ',
    'ciudad': ' ',
    'provincia': ' ',
    'habilitado': ' ',
    'central': ' '
}

response = requests.post(url, json=data)
print(response.json())


