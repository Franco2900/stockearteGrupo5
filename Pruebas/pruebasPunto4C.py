import requests
import json
from requests_toolbelt.multipart.encoder import MultipartEncoder

# TESTEO PUNTO 4.C: Modificación stock
url = 'http://localhost:5000/modificarStock'

# ====================================================================================

data = {
    'usuario': 'H-H',
    'stock': '3', # CAMBIA STOCK A 3
    'producto_codigo': 'CB123'
}

print('\nModificar stock del producto')
try:
    response = requests.post(url, json=data)
    print(response.json())
except json.JSONDecodeError:
    print("La respuesta no es un JSON válido")


# TESTEO PUNTO 4.C: Modificar Producto
# ====================================================================================

