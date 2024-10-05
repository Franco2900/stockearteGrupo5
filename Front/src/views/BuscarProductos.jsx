import React, { useState, useContext, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import UserContext from "../context/Context.jsx";
import ProductoAccord from '../components/ProductoAccord.jsx';
import Paginacion from '../components/Paginacion.jsx';
import FiltroProd from '../components/FiltroProd.jsx';

export function BuscarProductos(){
    
    const { buscarTodosLosProductos, traerProductosDeLaTienda, user} = useContext(UserContext)
    const [activePage, setActivePage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(15);
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState({
      nombre : "",
      codigo : "",
      talle: "",
      color: "",
    });
  
    useEffect(() => {
      const fetchData = async () => {
        const productos = await (user.central ? 
          buscarTodosLosProductos() : 
          traerProductosDeLaTienda()
        );
        setData(productos);
        console.log('PRODUCTOS OBTENIDOS: ' + JSON.stringify(productos))
      };
      fetchData();
    }, [buscarTodosLosProductos, traerProductosDeLaTienda, ]);

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
  
    return (
      <Container className='Busqueda'>
        {/*FILTRO DE BUSQUEDA*/}
        <FiltroProd filter={filter} handleFilterChange={handleFilterChange}/>

        {/*CONTENIDO */}
          <Row className='flex-grow-1 overflow-auto'>
            {paginatedData.map((item, index) => (
              <ProductoAccord key={index} producto={item} />
             ))}
          </Row>

        {/*PAGINACION*/}
        <Paginacion handlePageChange={handlePageChange} handlePreviousPage={handlePreviousPage} handleNextPage={handleNextPage} data={data} activePage={activePage} itemsPerPage={itemsPerPage}/>
      </Container>
    );
}

export default BuscarProductos;