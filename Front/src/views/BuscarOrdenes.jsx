import React, { useState, useContext, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import UserContext from "../context/Context.jsx";
import OrdenAccord from '../components/OrdenAccord.jsx';
import Paginacion from '../components/Paginacion.jsx';
import FiltroOrden from '../components/FiltroOrden.jsx';
export default function BuscarOrdenes(){
    const { traerOrdenesDeCompraTienda, user} = useContext(UserContext)
    const [activePage, setActivePage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(15);
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState({
      estado : "",
      fechaDeSolicitud : "",
    });
  
    useEffect(() => {
      const fetchData = async () => {
        const ordenes = await traerOrdenesDeCompraTienda();
        setData(ordenes);
        console.log('ORDENES OBTENIDOS: ' + JSON.stringify(ordenes))
      };
      fetchData();
    }, [traerOrdenesDeCompraTienda ]);

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

    const filteredData = data.filter((o)=>{
      return(
        o.estado.toLowerCase().includes(filter.estado.toLowerCase()) &&
        o.fechaDeSolicitud.toLowerCase().includes(filter.fechaDeSolicitud.toLowerCase())
      );
    });
  
    const paginatedData = filteredData.slice(
      (activePage - 1) * itemsPerPage,
      activePage * itemsPerPage
    );
  
    return (
      <Container className='Busqueda'>
        {/*FILTRO DE BUSQUEDA*/}
        <FiltroOrden filter={filter} handleFilterChange={handleFilterChange}/>

        {/*CONTENIDO */}
          <Row className='flex-grow-1 overflow-auto'>
            {paginatedData.map((item, index) => (
              <OrdenAccord key={index} orden={item} />
             ))}
          </Row>

        {/*PAGINACION*/}
        <Paginacion handlePageChange={handlePageChange} handlePreviousPage={handlePreviousPage} handleNextPage={handleNextPage} data={data} activePage={activePage} itemsPerPage={itemsPerPage}/>
      </Container>
    );
}