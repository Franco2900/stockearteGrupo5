import React, { createContext, useState, useEffect} from 'react';
import axios from 'axios';
import { Buffer } from 'buffer';
import {productos, tiendas, usuarios} from '../context/Datos'
const UserContext = createContext();

export const UserProvider = ({ children }) => {

  const [user, setUser] = useState(()=>{
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    console.log('User context updated:', user);
  }, [user]);

//USUARIO
const  altaUsuario = async(u) =>{
  try {
    const params = {
      usuarioCentral: user.usuario,
      usuario: u.usuario,
      password: u.password,
      nombre: u.nombre,
      apellido: u.apellido,
      habilitado: u.habilitado,
      tienda_codigo : u.tiendaCodigo,
    };
    //console.log("PARAMS ALTA USUARIO: "+ JSON.stringify(params));  
    const response = await axios.post('/api/altaUsuario', JSON.stringify(params), {
      headers: {
        'Content-Type': 'application/json',
      },
    });     
    return response.data.mensaje; 
  } catch (error) {
    console.error('Error crear USUARIO:', error);
    throw error;
  }
};
const  modificarUsuario = async(u) =>{
  try {     
    const params = {
      usuarioAModificar: u.usuarioAModificar,
      usuario: u.usuario,
      password: u.password,
      nombre: u.nombre,
      apellido: u.apellido,
      habilitado: u.habilitado,
      tienda_codigo: u.tiendaCodigo,
    };      
    const response = await axios.post('/api/modificarUsuario', JSON.stringify(params), {
      headers: {
        'Content-Type': 'application/json',
      },
    });     
    return response.data.mensaje;      
  } catch (error) {
    console.error('Error al modificar usuario:', error);
    throw error;
  }
};
  const buscarUsuario = async (userName) => {
    try {
      const params =  {
        usuarioCentral: user.usuario ,
        usuarioABuscar: userName
      };
        
      const response = await axios.post('/api/buscarUsuario', JSON.stringify(params), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;

     // const userList = await buscarTodosLosUsuarios();
     // const usuario = userList.find(u => u.usuario === userName)
     // return usuario
    } catch (error) {
      console.error('Error al obtener', error);
      throw error;
    }
  };


  const buscarTodosLosUsuarios = async () => {
    try {
      const response = await axios.get(`/api/buscarTodosLosUsuarios`);
      return response.data.arregloUsuarios;
    } catch (error) {
      console.error('Error al obtener el usuarioSeguidos:', error);
      throw error;
    }
  };
  const traerUsuariosTienda = async (tiendaId) => {
    try {
      //const response = await axios.get(`http://127.0.0.1:5000/traerUsuariosTienda/${tiendaId}`);
      //return response.data;
      const listaUsuarios = usuarios.filter(usuario => usuario.tienda_codigo === tiendaId)
      return listaUsuarios
    } catch (error) {
      console.error('Error al obtener el usuarioSeguidos:', error);
      throw error;
    }
  };

  //PRODUCTOS
  const  altaProducto = async(p) =>{
    console.log("OBJETO p", p)
    try {
      const params = {
        nombre: p.nombre,
        talle: p.talle,
        foto: p.foto.replace('data:image/jpeg;base64,', ''),
        color: p.color,
        tiendaObject: p.tiendaList.map((t) => ({
          codigo: t.codigo,
        })),
      };
      
      console.log("PARAMS ALTA PRODUCTO: "+ JSON.stringify(params));     
      const response = await axios.post('/api/altaProducto', JSON.stringify(params), {
        headers: {
          'Content-Type': 'application/json',
        },
      });     
      return response.data.mensaje; 
    } catch (error) {
      console.error('Error crear USUARIO:', error);
      throw error;
    }
  };
  const modificarProducto = async(p) =>{
    console.log("OBJETO p", p)
    try {
      const params = {
        codigo : p.codigo,
        nombre: p.nombre,
        talle: p.talle,
        foto: p.foto.replace('data:image/jpeg;base64,', ''),
        color: p.color,        
      };
      
      console.log("PARAMS MODIFICAR PRODUCTO: "+ JSON.stringify(params));     
      const response = await axios.post('/api/modificarProducto', JSON.stringify(params), {
        headers: {
          'Content-Type': 'application/json',
        },
      });     
      return response.data.mensaje; 
    } catch (error) {
      console.error('Error crear USUARIO:', error);
      throw error;
    }
  };
  const  modificarStock = async(p) =>{
    console.log("OBJETO p", p)
    try {
      const params = {
        usuario : user.usuario,
        stock: parseInt(p.stock, 10) ,
        producto_codigo: p.codigo,        
      };
      
      console.log("PARAMS MODIFICAR Stock: "+ JSON.stringify(params));     
      const response = await axios.post('/api/modificarStock', JSON.stringify(params), {
        headers: {
          'Content-Type': 'application/json',
        },
      });     
      return response.data.mensaje; 
    } catch (error) {
      console.error('Error crear USUARIO:', error);
      throw error;
    }
  };
  const asignarProducto = async (list, codigoTienda) => {
    try {
      const respuestas = await Promise.all(
        list.map(async (p) => {
          const params = {
            codigoTienda: codigoTienda,
            codigoProducto: p.codigo,
          };          
          //console.log("PARAMS MODIFICAR Stock: " + JSON.stringify(params));     
          
          const response = await axios.post('/api/asignarProducto', JSON.stringify(params), {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          
          return response.data.mensaje; 
        })
      );
      console.log("Mensajes", respuestas)
      return respuestas;   
    } catch (error) {
      console.error('Error al asignar productos:', error);
      throw error;
    }
  };
  const desasignarProducto = async (list, codigoTienda) => {
    try {
      const respuestas = await Promise.all(
        list.map(async (p) => {
          const params = {
            codigoTienda: codigoTienda,
            codigoProducto: p.codigo,
          };          
          //console.log("PARAMS MODIFICAR Stock: " + JSON.stringify(params));     
          
          const response = await axios.post('/api/desasignarProducto', JSON.stringify(params), {
            headers: {
              'Content-Type': 'application/json',
            },
          });          
          return response.data.mensaje; 
        })
      );
      console.log("Mensajes", respuestas)
      return respuestas;   
    } catch (error) {
      console.error('Error al asignar productos:', error);
      throw error;
    }
  };

  async function traerProductosDeLaTienda () {
    try {    
          const params =  {
           tienda_codigo: user.tiendaCodigo ,
         };
         const response = await axios.post(`/api/traerProductosDeLaTienda`,JSON.stringify(params), {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          //console.log("PRODUCTOS: " +JSON.stringify(response.data.arregloProductoDeLaTienda))
          const productosList = response.data.arregloProductoDeLaTienda.map((producto) => ({
            codigo: producto.codigo,
            nombre: producto.nombre,
            talle: producto.talle,
            foto: producto.foto,
            color: producto.color,
            tiendaCodigo: producto.codigoTienda,
            stock : producto.stock || 0
          }));
           return productosList;
     
    } catch (error) {
      console.error('Error al obtener los productos:', error);
      throw error;
    }
  };
  const buscarProducto = async (codigo) => {
    try {
      const params =  {
        usuarioCentral: user.usuario ,
        codigoProductoABuscar: codigo ,        
      };
      const response = await axios.post('/api/buscarProducto', JSON.stringify(params), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Productos obtenido:', JSON.stringify(response.data.arregloProductos));
      const productosList = response.data.arregloProductos.map((producto) => ({
        codigo: producto.codigo,
        nombre: producto.nombre,
        talle: producto.talle,
        foto: producto.foto,
        color: producto.color,
        tiendaCodigo: producto.tiendaCodigo,
        stock : producto.stock || 0
      }));
       return productosList[0];
    } catch (error) {
      console.error('Error al obtener la tienda:', error);
      throw error;
    }
  };
  const buscarProductoTienda = async (codigo) => {
    try {
      const params =  {
        usuarioCentral: user.usuario ,
        codigoProductoABuscar: codigo ,        
      };
      const response = await axios.post('/api/buscarProducto', JSON.stringify(params), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Productos obtenido:', JSON.stringify(response.data.arregloProductos));
      const productosList = response.data.arregloProductos.map((producto) => ({
        codigo: producto.codigo,
        nombre: producto.nombre,
        talle: producto.talle,
        foto: producto.foto,
        color: producto.color,
        tiendaCodigo: producto.tiendaCodigo,
        stock : producto.stock || 0
      }));
      return productosList.find((producto) => producto.tiendaCodigo === user.tiendaCodigo);
    } catch (error) {
      console.error('Error al obtener la tienda:', error);
      throw error;
    }
  };
     async function buscarTodosLosProductos () {
      try {           
       const params =  {
        usuarioCentral: user.usuario ,             
      };
      const response = await axios.post(`/api/buscarTodosLosProductos`,JSON.stringify(params), {
         headers: {
           'Content-Type': 'application/json',
         },
       });
       //console.log("PRODUCTOS: " +JSON.stringify(response.data.arregloProductos3))
       const productosList = response.data.arregloProductos3.map((producto) => ({
        codigo: producto.codigo,
        nombre: producto.nombre,
        talle: producto.talle,
        foto: producto.foto,
        color: producto.color,
        tiendaCodigo: producto.codigoTienda,
        stock : producto.stock || 0
      }));
       return productosList;       
      } catch (error) {
        console.error('Error al obtener los productos:', error);
        throw error;
      }
    };

  //TIENDAS
  async function buscarTodasLasTiendas() {
    try {
      const response = await axios.get(`/api/buscarTodasLasTiendas`);
      console.log("TIENDAS: " +JSON.stringify(response.data.arregloTiendas))
      return response.data.arregloTiendas;
      //return tiendas
    } catch (error) {
      console.error('Error al obtener las tiendas:', error);
      throw error;
    }
  }
  const buscarTienda = async (codigo) => {
    try {
      const params =  {
        usuarioCentral: user.usuario ,
        codigoTiendaABuscar: codigo ,        
      };
      const response = await axios.post('/api/buscarTienda', JSON.stringify(params), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Tienda obtenido:', JSON.stringify(response));
      return response.data;
    } catch (error) {
      console.error('Error al obtener la tienda:', error);
      throw error;
    }
  };
  const  altaTienda = async(tienda) =>{
    try {
      const params = {
        usuarioCentral: user.usuario,
        codigo: tienda.codigo,
        direccion: tienda.direccion,
        ciudad: tienda.ciudad,
        provincia: tienda.provincia,
        habilitado: tienda.habilitado,
      };
      console.log("PARAMS ALTA TIENDA: "+params.toString());     
      const response = await axios.post('/api/altaTienda', JSON.stringify(params), {
        headers: {
          'Content-Type': 'application/json',
        },
      });     
      return response.data.mensaje; 
    } catch (error) {
      console.error('Error crear la tienda:', error);
      throw error;
    }
  }
   const  modificarTienda = async(tienda) =>{
    try {     
      const params = {
        codigoTiendaAModificar: tienda.codigoTiendaAModificar,
        codigo: tienda.codigo,
        direccion: tienda.direccion,
        ciudad: tienda.ciudad,
        provincia: tienda.provincia,
        habilitado: tienda.habilitado,
      };      
      const response = await axios.post('/api/modificarTienda', JSON.stringify(params), {
        headers: {
          'Content-Type': 'application/json',
        },
      });     
      return response.data.mensaje;      
    } catch (error) {
      console.error('Error al modificar la tienda:', error);
      throw error;
    }
  };

  async function hacerLogin(userTo) {
    try {
      const params =  {
        usuario: userTo.usuario ,
        password: userTo.password , 
      };
        
      const response = await axios.post('/api/hacerLogin', JSON.stringify(params), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log("loginUsuario(): "+JSON.stringify(response.data))
      return response.data;
    } catch (error) {
      console.error('Error al obtener el usuario:', error);
      throw error;
    }
  };
  //function bufferToImagenSrc(buffer) {
  //  const base64String = Buffer.from(buffer).toString('base64');
  //  return `data:image/jpeg;base64,${base64String}`;
  //}
  return (
    <UserContext.Provider value={{ user, setUser,hacerLogin,
     altaUsuario, modificarUsuario,
     buscarUsuario ,buscarTodosLosUsuarios,traerUsuariosTienda,
     traerProductosDeLaTienda,buscarProductoTienda, buscarTodosLosProductos,
     altaProducto,modificarProducto, modificarStock,
     asignarProducto,desasignarProducto, buscarProducto,
     buscarTodasLasTiendas, buscarTienda,
     altaTienda,modificarTienda,
     }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
