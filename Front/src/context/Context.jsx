import React, { createContext, useState, useEffect} from 'react';
import axios from 'axios';
import { Buffer } from 'buffer';
import {productos, tiendas, usuarios, ordenes, filtros} from '../context/Datos'
const UserContext = createContext();

export const UserProvider = ({ children }) => {

  const [user, setUser] = useState(()=>{
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : {};
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

  async function traerProductosDeLaTienda2 (tienda_codigo) {
    try {    
          const params =  {
           tienda_codigo: tienda_codigo,
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
  async function traerProductosNoTienda (tienda_codigo) {
    try {    
          const params =  {
           tienda_codigo: tienda_codigo,
         };
         const response = await axios.post(`/api/traerProductosNoTienda`,JSON.stringify(params), {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          //console.log("PRODUCTOS: " +JSON.stringify(response.data.arregloProductoDeLaTienda))
          const productosList = response.data.arregloProductos4.map((producto) => ({
            codigo: producto.codigo,
            nombre: producto.nombre,
            talle: producto.talle,
            color: producto.color
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

    async function traerProductos() {
      try {
           const response = await axios.post(`/api/traerProductos`,{
              headers: {
                'Content-Type': 'application/json',
              },
            });
            //console.log("PRODUCTOS: " +JSON.stringify(response.data.arregloProductoDeLaTienda))
            const productosList = response.data.arregloProductos4.map((producto) => ({
              codigo: producto.codigo,
              nombre: producto.nombre,
              talle: producto.talle,
              color: producto.color
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
/*
  async function traerNovedades  () {
    try {           
     
    const response = await axios.get(`/api/traerNovedades`,JSON.stringify(), {
       headers: {
         'Content-Type': 'application/json',
       },
     });
     //console.log("PRODUCTOS: " +JSON.stringify(response.data.arregloProductos3))
     const novedadesList = response.data.arregloNovedades.map((novedad) => ({
      codigo: novedad.codigo,
      nombre: novedad.nombre,
      talle: novedad.talle,
      foto: novedad.foto,
      color: novedad.color
    }));
     return novedadesList;       
    } catch (error) {
      console.error('Error al obtener las novedades:', error);
      throw error;
    }
  };*/

  async function traerNovedades() {
    try {
      const response = await axios.post(`/api/traerNovedades`, {}, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const novedadesList = response.data.arregloNovedades.map((novedad) => ({
        codigo: novedad.codigo,
        nombre: novedad.nombre,
        talle: novedad.talle,
        foto: novedad.foto,
        color: novedad.color,
      }));
      
      return novedadesList;
    } catch (error) {
      console.error('Error al obtener las novedades:', error);
      throw error;
    }
  }
  

  const altaNovedades = async (list) => {
    try {
      const respuestas = await Promise.all(
        list.map(async (p) => {
          const params = {
            codigo: p.codigo,
            nombre: p.nombre,
            talle: p.talle,
            foto: p.foto,
            color: p.color
          };          
          //console.log("PARAMS MODIFICAR Stock: " + JSON.stringify(params));     
          
          const response = await axios.post('/api/altaNovedades', JSON.stringify(params), {
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
      console.error('Error al asignar novedades:', error);
      throw error;
    }
  };

  const altaOrdenDeCompraRequest = async (codigoTienda, listaProductos) => {
    try {
      const params = {
        tienda_codigo: codigoTienda,
        items: listaProductos.map((producto) => ({
          id_orden_de_compra: producto.id_orden_de_compra || null, // Si existe, si no se puede omitir
          //id_orden_de_compra: 999,
          producto_codigo: producto.codigo,
          color: producto.color,
          talle: producto.talle,
          cantidad_solicitada: producto.stock // O cualquier propiedad que represente la cantidad
        })),
      };
  
      const response = await axios.post('/api/altaOrdenDeCompra', params, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      return response.data.mensaje;
    } catch (error) {
      console.error('Error al realizar la orden de compra:', error);
      throw error;
    }
  };
  ////////  ORDENES   //////////////////////////////////////////////////////
  async function traerOrdenesDeCompraTienda() {
    try {    
         const params =  {
          codigo: user.tiendaCodigo ,
         };
         const response = await axios.post(`/api/traerOrdenesDeCompraTienda2`,JSON.stringify(params), {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const ordenes = response.data.arregloOrdenCompra.map((o) => ({
            tiendaCodigo: o.tiendaCodigo,
            idOrdenDeCompra: o.idOrdenDeCompra,
            estado: o.estado,
            observaciones: o.observaciones,
            fechaDeSolicitud: o.fechaDeSolicitud,
            fechaDeRecepcion: o.fechaDeRecepcion,
            fechaDeEnvio: o.fechaDeEnvio,
          }));
          //console.log(JSON.stringify(response.data.arregloOrdenCompra))
    return ordenes;
     
    } catch (error) {
      console.error('Error al obtener los productos:', error);
      throw error;
    }
  };
  async function traerItems(idOrden){
    try {    
       const params =  {
        id_orden_de_compra: idOrden ,
      };
      const response = await axios.post(`/api/traerItems`,JSON.stringify(params), {
         headers: {
           'Content-Type': 'application/json',
         },
       });
       console.log('ITEMS: '+JSON.stringify(response))
      return response.data.arregloItems;
  
 } catch (error) {
   console.error('Error al obtener los items:', error);
   throw error;
 }; }

 async function aceptarDespacho(idOrden){
  try {    
     const params =  {
      id_orden_de_compra: idOrden ,
    };
    const response = await axios.post(`/api/aceptarDespacho`,JSON.stringify(params), {
       headers: {
         'Content-Type': 'application/json',
       },
     });
     console.log('ITEMS: '+JSON.stringify(response))
    return response.data.arregloItems;

} catch (error) {
 console.error('Error al aceptar Despacho:', error);
 throw error;
};
 }
 ////////  FILTROS   //////////////////////////////////////////////////////
 async function crearFiltro(f) {
   try {
     const params = {
      id_usuario: user.id,
      nombre: f.nombre,
      producto_codigo: f.producto_codigo,
      tienda_codigo: f.tienda_codigo ,
      fecha_inicio: f.fecha_inicio,
      fecha_final: f.fecha_final,
      estado: f.estado,
     };
     const response = await axios.post('http://localhost:7000/filtro',JSON.stringify(params),
       {
         headers: {
           "Content-Type": "application/json",
         },
       }
     );
     console.log("Filtro MSG: " + JSON.stringify(response));
     return response.data.mensaje;
   } catch (error) {
     console.error("Error al crear el filtro:", error);
     throw error;
   }
 };

 const traerFiltros = async () => {
  try {
    const url = `http://localhost:7000/filtro?id_usuario=${user.id}`;
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data.filtros; 
  } catch (error) {
    console.error("Error al obtener los filtros:", error);
    throw error;
  }
};
async function modificarFiltro(f) {
  try {
    const params = {
      id_usuario: user.id,
      nombre: f.nombre,
      producto_codigo: f.producto_codigo,
      tienda_codigo: f.tienda_codigo,
      fecha_inicio: f.fecha_inicio,
      fecha_final: f.fecha_final,
      estado: f.estado,
    };

    const response = await axios.put('http://localhost:7000/filtro', params, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Filtro MODIFICADO: " + JSON.stringify(response.data));
    return response.data.mensaje;
  } catch (error) {
    console.error("Error al modificar el filtro:", error); // Corrige mensaje de error
    throw error;
  }
};
async function eliminarFiltro(f) {{/***/}
  try {
    const params = {
     id_usuario: user.id,
     nombre: f.nombre,
    };
    const response = await axios.delete('http://localhost:7000/filtro', {
      data: params, // Utiliza data en lugar de JSON.stringify
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Filtro ELIMINADO: " + JSON.stringify(response));
    return response.data.mensaje;
  } catch (error) {
    console.error("Error al crear el filtro:", error);
    throw error;
  }
};
 
const ordenes = async (f) => {
  try {
   
    const nuevoF = Object.fromEntries(
      Object.entries(f).filter(([key]) => key !== 'usuario' && key !== 'nombre')
    );
    const params = Object.keys(nuevoF)
      .filter((key) => nuevoF[key] !== undefined && nuevoF[key] !== null && nuevoF[key] !== ''&& nuevoF[key] !== '0000-00-00')
      .map((key) => `${key}=${encodeURIComponent(nuevoF[key])}`)
      .join('&');
      
    const url = `http://localhost:7000/orden?${params}`;
    console.log("PARAMS ORDENES,",url)
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    //console.log("ORDENES OBTENIDAS:", JSON.stringify(response.data.ordenes))
    return response.data.ordenes;
  } catch (error) {
    console.error("Error al obtener los filtros:", error);
    throw error;
  }
};


const cargaMasiva = async (archivo) => {
  try {
    const formData = new FormData();
    formData.append('archivoCSV', archivo);

    const response = await axios.post('http://localhost:7000/usuario', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data.mensaje;
  } catch (error) {
    console.error('Error al realizar carga:', error);
    throw error;
  };
};

const crearCatalogo = async (arregloCodigos, tit) => {
  try {

    const params =  {
      codigos: arregloCodigos,
      titulo: tit,
      tienda_codigo : user.tiendaCodigo
    };

    const response = await axios.post('http://localhost:7000/catalogo', JSON.stringify(params), {
       headers: {
         'Content-Type': 'application/json',
       },
     });
     
    return response.data.archivoPDF;
  } catch (error) {
    console.error('Error al exportar:', error);
    throw error;
  };
};

const traerCatalogos = async () => {
  try {
    const response = await axios.get('http://localhost:7000/catalogo', {
      params: { tienda_codigo : user.tiendaCodigo },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data.catalogos;
  } catch (error) {
    console.error('Error al traerCatalogos:', error);
    throw error;
  }
};

const borrarCatalogo = async (titulo) => {
  try {
    const respuesta = await axios.delete('http://localhost:7000/catalogo', {
      data: { titulo },
    });
    alert(respuesta.data); // Muestra el mensaje de éxito
    window.location.reload();
    // Aquí puedes agregar lógica para actualizar el estado o la UI
  } catch (error) {
    console.error("Error al eliminar el catálogo:", error);
    alert("Ocurrió un error al eliminar el catálogo.");
  }
};

const traerProductosCatalogo = async (titulo) =>  {
  try {
    const response = await axios.get('http://localhost:7000/catalogo/productos', {
      params: { titulo : titulo },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data.productos;
  } catch (error) {
    console.error('Error al traerProductos:', error);
    throw error;
  }
};

const traerProductosNoCatalogo = async (titulo) =>  {
  try {
    const response = await axios.get('http://localhost:7000/catalogo/noProductos', {
      params: { titulo : titulo },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data.productos;
  } catch (error) {
    console.error('Error al traerProductos:', error);
    throw error;
  }
};

const asignarProductosCatalogo = async (codigos, titulo) => {
  try {
    const params = {
      codigos: codigos,
      titulo: titulo
    };
    const response = await axios.post('http://localhost:7000/catalogo/productos', params, {
      headers: {
        "Content-Type": "application/json",
        },
      });

      return response.data.mensaje; 
  } catch (error) {
    console.error('Error al asignar productos:', error);
    throw error;
  }
};

const desasignarProductosCatalogo = async (codigos, titulo) => {
  try {
    const params = {
      codigos: codigos,
      titulo: titulo
    };
    const response = await axios.delete('http://localhost:7000/catalogo/productos', {
      data: params, // Utiliza data en lugar de JSON.stringify
      headers: {
        "Content-Type": "application/json",
      },
    });

      return response.data.mensaje; 
  } catch (error) {
    console.error('Error al asignar productos:', error);
    throw error;
  }
};

  return (
    <UserContext.Provider value={{ user, setUser,hacerLogin,
     altaUsuario, modificarUsuario,
     buscarUsuario ,buscarTodosLosUsuarios,traerUsuariosTienda,
     traerProductosDeLaTienda,buscarProductoTienda, buscarTodosLosProductos, traerProductos, traerProductosDeLaTienda2, traerProductosNoTienda,
     altaProducto,modificarProducto, modificarStock,
     asignarProducto,desasignarProducto, buscarProducto,
     buscarTodasLasTiendas, buscarTienda,
     altaTienda,modificarTienda, traerNovedades, altaNovedades, altaOrdenDeCompraRequest,
     traerOrdenesDeCompraTienda,traerItems,aceptarDespacho,cargaMasiva, crearCatalogo,
     ordenes,
     crearFiltro,modificarFiltro, eliminarFiltro,traerFiltros,traerCatalogos, borrarCatalogo, traerProductosCatalogo, traerProductosNoCatalogo,
     asignarProductosCatalogo, desasignarProductosCatalogo
     }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
