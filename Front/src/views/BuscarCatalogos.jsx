import React, { useState, useContext, useEffect } from 'react';
import { Container, Row, Spinner } from 'react-bootstrap';
import UserContext from "../context/Context.jsx";
import CatalogoAccord from '../components/CatalogoAccord.jsx';
import Paginacion from '../components/Paginacion.jsx';

export function BuscarCatalogos() {
  const { traerCatalogos } = useContext(UserContext);

  const [activePage, setActivePage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);  // Activamos el estado de carga
      try {
        const catalogos = await traerCatalogos();
        if (Array.isArray(catalogos)) {
          setData(catalogos);
        } else {
          setError("No hay catálogos");
        }
      } catch (error) {
        setError("Error al obtener los catálogos");
        console.error(error);
      } finally {
        setLoading(false);  // Terminamos el estado de carga
      }
    };

    fetchData();
  }, [traerCatalogos]);  // Dependencia solo de traerCatalogos

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

  const paginatedData = Array.isArray(data) ? data.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage) : [];

  if (loading) {
    return (
      <Container className='Busqueda'>
        <Row className='justify-content-center'>
          <Spinner animation="border" variant="primary" />
        </Row>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className='Busqueda'>
        <Row className='justify-content-center'>
          <h4>{error}</h4>
        </Row>
      </Container>
    );
  }

  return (
    <Container className='Busqueda'>
      <Row className='flex-grow-1 overflow-auto'>
        {paginatedData.length > 0 ? (
          paginatedData.map((catalogo, index) => (
            <CatalogoAccord key={index} catalogo={catalogo} />
          ))
        ) : (
          <Row className='justify-content-center'>
            <h4>No se encontraron catálogos.</h4>
          </Row>
        )}
      </Row>

      {/*Paginación*/}
      {data.length > itemsPerPage && (
        <Paginacion
          handlePageChange={handlePageChange}
          handlePreviousPage={handlePreviousPage}
          handleNextPage={handleNextPage}
          data={data}
          activePage={activePage}
          itemsPerPage={itemsPerPage}
        />
      )}
    </Container>
  );
}

export default BuscarCatalogos;