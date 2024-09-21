import requests
import json
from requests_toolbelt.multipart.encoder import MultipartEncoder

# TESTEO PUNTO 4.B: Modificación tienda
url = 'http://localhost:5000/modificarTienda'

# ====================================================================================

data = {
    'codigoTiendaAModificar': 'lmno456stu',
    'codigo': 'lmno456stu',
    'direccion': 'Calle Verdadera 123', # Cambia la direccion de "Calle False 123" a "Calle Verdadera 123"
    'ciudad': 'La Plata',
    'provincia': 'Buenos Aires',
    'habilitado': False,
    'central': False
}

print('\nModificar direccion de la tienda')
try:
    response = requests.post(url, json=data)
    print(response.json())
except json.JSONDecodeError:
    print("La respuesta no es un JSON válido")

# ====================================================================================

data = {
    'codigoTiendaAModificar': 'pqr789xyz',
    'codigo': 'pqr789xyz',
    'direccion': 'Av. Libertador 3000', 
    'ciudad': 'La Plata', # Cambia la ciudad de "Buenos Aires" a "La Plata"
    'provincia': 'Buenos Aires',
    'habilitado': False, # Cambia el estado de habilitado a deshabilitado
    'central': False
}

print('\nModificar ciudad y estado de habilitado')
try:
    response = requests.post(url, json=data)
    print(response.json())
except json.JSONDecodeError:
    print("La respuesta no es un JSON válido")