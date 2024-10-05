
import React, { useState, useContext, useEffect } from 'react';
import { Container,Row } from 'react-bootstrap';
import UserContext from "../context/Context.jsx";
import TiendaAccord from '../components/TiendaAccord.jsx';
import Paginacion from '../components/Paginacion.jsx';
import FiltroTienda from '../components/FiltroTienda.jsx';

export default function BuscarTiendas() {
    const { buscarTodasLasTiendas } = useContext(UserContext)
    const [activePage, setActivePage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(15);
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState({
      codigo : "",
      habilitado : true,
    });  
    useEffect(() => {
      const fetchData = async () => {
        const tiendas = await buscarTodasLasTiendas();
        setData(tiendas);
        //console.log('Las TIENDAS: ' + JSON.stringify(tiendas))
      };
      fetchData();
    }, [buscarTodasLasTiendas]);

    const handleFilterChange = (event) => {
      const { name, value, type, checked } = event.target;
      if (type === 'checkbox') {
        setFilter((prevFilter) => ({ ...prevFilter, [name]: checked }));
      } else {
        setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
      }
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

    const filteredData = data.filter((tienda)=>{
      return(
        tienda.codigo.toLowerCase().includes(filter.codigo.toLowerCase()) &&
        tienda.habilitado === filter.habilitado
      );
    });
  
    const paginatedData = filteredData.slice(
      (activePage - 1) * itemsPerPage,
      activePage * itemsPerPage
    );
  
    return (
      <Container className='Busqueda'>
        {/*FILTRO DE BUSQUEDA */}
        <FiltroTienda filter={filter} handleFilterChange={handleFilterChange}/>

        {/*CONTENIDO */}
          <Row className='flex-grow-1 overflow-auto'>
            {paginatedData.map((item, index) => (
              <TiendaAccord key={index} tienda={item} />
             ))}
          </Row>
          
        {/*PAGINACION */}
        <Paginacion handlePageChange={handlePageChange} handlePreviousPage={handlePreviousPage} handleNextPage={handleNextPage} data={data} activePage={activePage} itemsPerPage={itemsPerPage}/>

      </Container>
    );
  };