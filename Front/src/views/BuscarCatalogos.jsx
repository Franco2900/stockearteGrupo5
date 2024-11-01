import React, { useState, useContext, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import UserContext from "../context/Context.jsx";
import CatalogoAccord from '../components/CatalogoAccord.jsx';
import Paginacion from '../components/Paginacion.jsx';

export function BuscarCatalogos() {

//Falta ver como implementar funcion de buscarTodosLosCatalogos para casa central
    
    const { buscarTodosLosProductos, traerCatalogos, user } = useContext(UserContext);
    const [activePage, setActivePage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(15);
    const [data, setData] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        const catalogos = await (user.central ? 
          buscarTodosLosProductos() : 
          traerCatalogos()
        );
        setData(catalogos);
        console.log('CATALOGOS OBTENIDOS: ' + JSON.stringify(catalogos));
      };
      fetchData();
    }, [buscarTodosLosProductos, traerCatalogos]);

    const handlePageChange = (page) => {
      setActivePage(page);
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

    
    const paginatedData = data.slice(
      (activePage - 1) * itemsPerPage,
      activePage * itemsPerPage
    );
    

    return (
      <Container className='Busqueda'>
        {/*CONTENIDO */}

        <Row className='flex-grow-1 overflow-auto'>
            {paginatedData.map((catalogo, index) => (
            <CatalogoAccord key={index} catalogo={catalogo} />
            ))}
        </Row>

        {/*PAGINACION*/}
        <Paginacion handlePageChange={handlePageChange} handlePreviousPage={handlePreviousPage} handleNextPage={handleNextPage} data={data} activePage={activePage} itemsPerPage={itemsPerPage} />
      </Container>
    );
}

export default BuscarCatalogos;