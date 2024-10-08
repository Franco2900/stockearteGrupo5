import { useLocation } from "react-router-dom";
import React, { useState, useContext, useEffect } from 'react';
import { Container, Row ,Col, Button} from 'react-bootstrap';
import UserContext from "../context/Context.jsx";
import Paginacion from '../components/Paginacion.jsx';
import FiltroProd from '../components/FiltroProd.jsx';
import TablaOrdenCompra from "../components/TablaOrdenCompra.jsx";
import TablaProductos from "../components/TablaProductos.jsx";
import { useNavigate } from 'react-router-dom';


export default function CrearUpdOrden(){
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const codigoTienda = searchParams.get("codigo");
  const { buscarTodosLosProductos, asignarProducto, desasignarProducto} = useContext(UserContext)
  const [activePage, setActivePage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const[productoList, setProductoList] = useState([])
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState({
    nombre : "",
    codigo : "",
    talle: "",
    color: "",
  });
  
    useEffect(() => {
      const fetchData = async () => {
        const productos = await buscarTodosLosProductos()
        //productos.filter((prod) => prod.codigo !== codigoTienda);
        // Agrupar por código usando un objeto
        //const groupedByCodigo = Object.values(
        //  productos.reduce((acc, item) => {
        //    acc[item.codigo] = item; // Almacena solo el último elemento con el mismo código
        //    return acc;
        //  }, {})
        //);
        setData(productos);
        //console.log('PRODUCTOS OBTENIDOS: ' + JSON.stringify(productos))
      };
      fetchData();
    }, [buscarTodosLosProductos, codigoTienda]);

    const navigate = useNavigate();

    const asignar = (list) => {
      console.log("Cod tienda: ",codigoTienda)
     if(list && list.length > 0){ 
      asignarProducto(list, codigoTienda)
      .then((mensajes) => {
        alert(mensajes.join('\n').toString());
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error asignando productos:", error);
      });
      }else{
        alert("La lista está vacía.");
      }
    };

    const desasignar = (list) => {
      console.log("Cod tienda: ",codigoTienda)
     if(list && list.length > 0){ 
      desasignarProducto(list, codigoTienda)
      .then((mensajes) => {
        alert(mensajes.join('\n').toString());
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error desasignando productos:", error);
      });
      }else{
        alert("La lista está vacía.");
      }
    };

    const handleFilterChange = (event) => {
      const { name, value } = event.target;
      setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
    };
  
    const handlePageChange = (page) => {
      setActivePage(page);
      setData(filteredData);
    };
  
    const handlePreviousPage = () => {
      if (activePage > 1) {
        setActivePage(activePage - 1);
      }
    };
  
    const handleNextPage = () => {
      if (activePage < Math.ceil(data.length / itemsPerPage)) {
        setActivePage(activePage + 1);
      }
    };

    const handleAsignar = (item) => {
      if (!productoList.some((producto) => producto.codigo === item.codigo)) {
        setProductoList((prevList) => [...prevList, item]);
      }
    };
  
    const handleDesasignar = (item) => {
      setProductoList((prevList) =>
        prevList.filter((producto) => producto.codigo !== item.codigo)
      );
    };

    const filteredData = data.filter((prod)=>{
      return(
        prod.nombre.toLowerCase().includes(filter.nombre.toLowerCase()) &&
        prod.codigo.toLowerCase().includes(filter.codigo.toLowerCase()) &&
        prod.talle.toLowerCase().includes(filter.talle.toLowerCase()) &&
        prod.color.toLowerCase().includes(filter.color.toLowerCase())
      );
    });
  
    const paginatedData = filteredData.slice(
      (activePage - 1) * itemsPerPage,
      activePage * itemsPerPage
    );
    
    const handleStockChange = (event) => {
      const { name, value } = event.target;
      setProductoList((prevFilter) => ({ ...prevFilter, [name]: value }));
    };

    return (<>
    <Row className='justify-content-center'>
    <Col md={{ span: 5 }}>
      <Container className='Busqueda'>

        {/*FILTRO DE BUSQUEDA*/}
        <FiltroProd filter={filter} handleFilterChange={handleFilterChange}/>

        {/*CONTENIDO */}
          <TablaOrdenCompra list={paginatedData} handleAsignar={handleAsignar} />

        {/*PAGINACION*/}
        <Paginacion handlePageChange={handlePageChange} handlePreviousPage={handlePreviousPage} handleNextPage={handleNextPage} data={data} activePage={activePage} itemsPerPage={itemsPerPage}/>

      </Container>
      </Col>
      <Col md={{ span: 1 }} />
      <Col md={{ span: 5 }} style={{marginTop: '.3cm'}}>
      <h3>Tienda: {codigoTienda}</h3>
      <Button onClick={()=>asignar(productoList)}><h3>SOLICITAR</h3></Button>
      <Button variant="outline-danger"style={{marginLeft: '.5cm'}} onClick={()=> navigate("/")}><h3>VOLVER</h3></Button>
      {/* TABLA PARA ASIGNAR O DESASIGNAR*/}
          <TablaOrdenCompra list={productoList} handleDesasignar={handleDesasignar} handleStockChange={handleStockChange} stock={1}/>
      </Col>

      </Row>
      </>
    );
}
