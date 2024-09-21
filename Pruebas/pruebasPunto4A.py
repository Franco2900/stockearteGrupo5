import requests
import json
from requests_toolbelt.multipart.encoder import MultipartEncoder


# TESTEO PUNTO 4.A: Modificación usuario
url = 'http://localhost:5000/modificarUsuario'

# ====================================================================================

data = {
    'usuarioAModificar': 'La Peluca',
    'usuario': 'La Mona', # Cambia el nombre de usuario de "La Peluca" a "La Mona"
    'password': 'qwerty',
    'nombre': 'Moni',
    'apellido': 'Argento',
    'habilitado': True,
    'tienda_codigo': 'asdfgh987',
}

print('\nModificar nombre de usuario')
try:
    response = requests.post(url, json=data)
    print(response.json())
except json.JSONDecodeError:
    print("La respuesta no es un JSON válido")

# ====================================================================================

data = {
    'usuarioAModificar': 'The One',
    'usuario': 'The One', 
    'password': 'AAAAA', # Cambia la password de "fñnbqio_@748e5a" a "AAAAA" 
    'nombre': 'Unlero',
    'apellido': 'Sistemas',
    'habilitado': True, # Cambia de deshabilitado a habilitado
    'tienda_codigo': 'asdfgh987',
}

print('\nModificar password y estado de habilitado')
try:
    response = requests.post(url, json=data)
    print(response.json())
except json.JSONDecodeError:
    print("La respuesta no es un JSON válido")
