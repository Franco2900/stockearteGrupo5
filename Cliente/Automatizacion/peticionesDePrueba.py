import requests


# ====================================================================================
url = "http://localhost:5000/altaTienda"

data = {
    "usuarioCentral": "Racing Campeon",
    "codigo": "8",
    "direccion": "Hogwarts",
    "ciudad": "Caballito",
    "provincia": "Buenos Aires",
    "habilitado": True,
}

response = requests.post(url, json=data)
print(response.json())

data = {
    "usuarioCentral": "Racing Campeon",
    "codigo": "9",
    "direccion": "Larroque",
    "ciudad": "Lomas",
    "provincia": "Buenos Aires",
    "habilitado": True,
}

response = requests.post(url, json=data)
print(response.json())


data = {
    "usuarioCentral": "Racing Campeon",
    "codigo": "10",
    "direccion": "Pavon",
    "ciudad": "Banfield",
    "provincia": "Buenos Aires",
    "habilitado": True,
}

response = requests.post(url, json=data)
print(response.json())

# ====================================================================================

url = "http://localhost:5000/bajaLogicaTienda"

data = {"codigo": "9"}

response = requests.post(url, json=data)
print(response.json())

data = {"codigo": "10"}

response = requests.post(url, json=data)
print(response.json())
# ====================================================================================


url = "http://localhost:5000/altaLogicaTienda"

data = {"codigo": "9"}

response = requests.post(url, json=data)
print(response.json())

data=  {"codigo": "10"}

response = requests.post(url, json=data)
print(response.json())
# ====================================================================================

url = "http://localhost:5000/altaUsuario"

data={
    "usuarioCentral": "Racing Campeon",
    "usuario": "RickyFort",
    "password": "chocolate77",
    "nombre": "Ricardo",
    "apellido": "Fort",
    "habilitado": True,
    "tienda_codigo": "9"
}


response = requests.post(url, json=data)
print(response.json())

data={
    "usuarioCentral": "Racing Campeon",
    "usuario": "JhonWickardo",
    "password": "letal77",
    "nombre": "Jhon",
    "apellido": "Wick",
    "habilitado": True,
    "tienda_codigo": "10"
}


response = requests.post(url, json=data)
print(response.json())
# ====================================================================================

url = "http://localhost:5000/altaProducto"


data = {
    "nombre": "Campera",
    "talle": "XL",
    "color": "Roja",
    "tiendaObject": [{"codigo": "9"}, {"codigo": "10"}]
}


files = {'foto': open('campera-roja.jpg', 'rb')}

response = requests.post(url,files=files,data=data)

print(response.json())

# ====================================================================================


url = "http://localhost:5000/modificarProducto"

data = {"codigoProducto": "bGvCpouhkd", "nuevoStock": 12}

response = requests.post(url, json=data)
print(response.json())

data = {"codigoProducto": "sOMqnqycMc", "nuevoStock": 23}

response = requests.post(url, json=data)
print(response.json())
# ====================================================================================
# ====================================================================================
