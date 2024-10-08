import { useLocation } from "react-router-dom";
import React, { useState, useContext, useEffect } from 'react';
import { Container, Row ,Col, Button} from 'react-bootstrap';
import UserContext from "../context/Context.jsx";
import Paginacion from '../components/Paginacion.jsx';
import FiltroProd from '../components/FiltroProd.jsx';
import TablaNovedades from "../components/TablaNovedades.jsx";
import { useNavigate } from 'react-router-dom';

//import { traerNovedades, altaNovedades } from "../../../Servidor/Logica/tiendaService.js";

export default function CrearUpdOrden(){
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  //const codigoTienda = searchParams.get("codigo");
  const { traerNovedades, altaNovedades} = useContext(UserContext)
  const [activePage, setActivePage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const[novedadesList, setNovedadList] = useState([])
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState({
    nombre : "",
    codigo : "",
    talle: "",
    color: "",
  });
  
    useEffect(() => {
      const fetchData = async () => {
        const novedades = await traerNovedades()
        setData(novedades);
      };
      fetchData();
    }, [traerNovedades]);

    const asignar = (list) => {
      //console.log("Cod tienda: ",codigoTienda)
     if(list && list.length > 0){ 
        altaNovedades(list)
      .then((mensajes) => {
        alert(mensajes.join('\n').toString());
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error asignando novedades:", error);
      });
      }else{
        alert("La lista está vacía.");
      }
    };
    /*
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
    */
    const navigate = useNavigate();

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
      if (!novedadesList.some((novedad) => novedad.codigo === item.codigo)) {
        setNovedadList((prevList) => [...prevList, item]);
      }
    };
  
    const handleDesasignar = (item) => {
        setNovedadList((prevList) =>
        prevList.filter((novedad) => novedad.codigo !== item.codigo)
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
  
    return (<>
    <Row className='justify-content-center'>
    <Col md={{ span: 5 }}>
      <Container className='Busqueda'>

        {/*FILTRO DE BUSQUEDA*/}
        <FiltroProd filter={filter} handleFilterChange={handleFilterChange}/>

        {/*CONTENIDO */}
          <TablaNovedades list={paginatedData} handleAsignar={handleAsignar}/>

        {/*PAGINACION*/}
        <Paginacion handlePageChange={handlePageChange} handlePreviousPage={handlePreviousPage} handleNextPage={handleNextPage} data={data} activePage={activePage} itemsPerPage={itemsPerPage}/>

      </Container>
      </Col>
      <Col md={{ span: 1 }} />
      <Col md={{ span: 5 }} style={{marginTop: '.3cm'}}>
      <Button onClick={()=>asignar(novedadesList)}><h3>SOLICITAR</h3></Button>
      <Button variant="outline-danger"style={{marginLeft: '.5cm'}}  onClick={()=> navigate("/")}><h3>VOLVER</h3></Button>
      {/* TABLA PARA ASIGNAR O DESASIGNAR*/}
          <TablaNovedades list={novedadesList} handleDesasignar={handleDesasignar}/>
      </Col>

      </Row>
      </>
    );
}
