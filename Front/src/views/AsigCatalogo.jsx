import { useLocation } from "react-router-dom";
import React, { useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import UserContext from "../context/Context.jsx";
import Paginacion from '../components/Paginacion.jsx';
import FiltroProd from '../components/FiltroProd.jsx';
import TablaNovedades from "../components/TablaNovedades.jsx";

export function AsigProd() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const codigoTienda = searchParams.get("codigo");
  const tituloCatalogo = searchParams.get("titulo");
  const { asignarProducto, desasignarProducto, traerProductosCatalogo, traerProductosNoCatalogo, asignarProductosCatalogo, desasignarProductosCatalogo } = useContext(UserContext);

  const [activePage, setActivePage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const [productoList, setProductoList] = useState([]);
  const [data, setData] = useState([]);
  const [noData, setNoData] = useState([]);
  const [filterAsignados, setFilterAsignados] = useState({
    nombre: "",
    codigo: "",
    talle: "",
    color: "",
  });
  const [filterNoAsignados, setFilterNoAsignados] = useState({
    nombre: "",
    codigo: "",
    talle: "",
    color: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productos = await traerProductosCatalogo(tituloCatalogo);
        setData(Array.isArray(productos) ? productos : []);
      } catch (error) {
        console.error("Error al traer productos asignados:", error);
        setData([]);
      }
    };

    const fetchNoData = async () => {
      try {
        const productos = await traerProductosNoCatalogo(tituloCatalogo);
        setNoData(Array.isArray(productos) ? productos : []);
      } catch (error) {
        console.error("Error al traer productos no asignados:", error);
        setNoData([]);
      }
    };

    fetchData();
    fetchNoData();
  }, [tituloCatalogo, traerProductosCatalogo, traerProductosNoCatalogo]);

  const handleFilterChangeAsignados = (event) => {
    const { name, value } = event.target;
    setFilterAsignados((prevFilter) => ({ ...prevFilter, [name]: value }));
    setActivePage(1); // Resetear la paginación al cambiar el filtro
  };

  const handleFilterChangeNoAsignados = (event) => {
    const { name, value } = event.target;
    setFilterNoAsignados((prevFilter) => ({ ...prevFilter, [name]: value }));
    setActivePage(1); // Resetear la paginación al cambiar el filtro
  };

  const filteredData = Array.isArray(data) ? data.filter((prod) =>
    prod.nombre.toLowerCase().includes(filterAsignados.nombre.toLowerCase()) &&
    prod.codigo.toLowerCase().includes(filterAsignados.codigo.toLowerCase()) &&
    prod.talle.toLowerCase().includes(filterAsignados.talle.toLowerCase()) &&
    prod.color.toLowerCase().includes(filterAsignados.color.toLowerCase())
  ) : [];

  const filteredNoData = Array.isArray(noData) ? noData.filter((prod) =>
    prod.nombre.toLowerCase().includes(filterNoAsignados.nombre.toLowerCase()) &&
    prod.codigo.toLowerCase().includes(filterNoAsignados.codigo.toLowerCase()) &&
    prod.talle.toLowerCase().includes(filterNoAsignados.talle.toLowerCase()) &&
    prod.color.toLowerCase().includes(filterNoAsignados.color.toLowerCase())
  ) : [];

  const paginatedData = filteredData.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage);
  const paginatedNoData = filteredNoData.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage);

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  const handlePreviousPage = () => {
    if (activePage > 1) {
      setActivePage(activePage - 1);
    }
  };

  const handleNextPage = () => {
    if (activePage < Math.ceil(filteredData.length / itemsPerPage)) {
      setActivePage(activePage + 1);
    }
  };

  const asignar = () => {
    if (productoList.length > 0) {
      const codigos = productoList.map(producto => producto.codigo);
      asignarProductosCatalogo(codigos, tituloCatalogo)
        .then((mensaje) => {
          alert(mensaje);
          window.location.reload();
        })
        .catch((error) => console.error("Error agregando productos:", error));
    } else {
      alert("La lista está vacía.");
    }
  };

  const desasignar = () => {
    if (productoList.length > 0) {
      const codigos = productoList.map(producto => producto.codigo);
      desasignarProductosCatalogo(codigos, tituloCatalogo)
        .then((mensaje) => {
          alert(mensaje);
          window.location.reload();
        })
        .catch((error) => console.error("Error quitando productos:", error));
    } else {
      alert("La lista está vacía.");
    }
  };

  return (
    <Row className='justify-content-center'>

      <Col md={{ span: 4 }}>
        <Container className='Busqueda'>
          <h4>Productos Agregados</h4>
          <FiltroProd filter={filterAsignados} handleFilterChange={handleFilterChangeAsignados} />
          <TablaNovedades list={paginatedData} handleAsignar={(item) => setProductoList((prev) => [...prev, item])} />
          <Paginacion handlePageChange={handlePageChange} handlePreviousPage={handlePreviousPage} handleNextPage={handleNextPage} data={data} activePage={activePage} itemsPerPage={itemsPerPage} />
        </Container>
      </Col>

      <Col md={{ span: 4 }}>
        <Container className='Busqueda'>
          <h4>Productos No Agregados</h4>
          <FiltroProd filter={filterNoAsignados} handleFilterChange={handleFilterChangeNoAsignados} />
          <TablaNovedades list={paginatedNoData} handleAsignar={(item) => setProductoList((prev) => [...prev, item])} />
          <Paginacion handlePageChange={handlePageChange} handlePreviousPage={handlePreviousPage} handleNextPage={handleNextPage} data={noData} activePage={activePage} itemsPerPage={itemsPerPage} />
        </Container>
      </Col>

      <Col md={{ span: 4 }} style={{ marginTop: '.3cm' }}>
        <h3>Catalogo: {tituloCatalogo}</h3>
        <Button onClick={asignar}><h3>AGREGAR</h3></Button>
        <Button variant="outline-danger" style={{ marginLeft: '.5cm' }} onClick={desasignar}><h3>QUITAR</h3></Button>
        <TablaNovedades list={productoList} handleDesasignar={(item) => setProductoList((prev) => prev.filter(prod => prod.codigo !== item.codigo))} />
      </Col>

    </Row>
  );
}

export default AsigProd;
