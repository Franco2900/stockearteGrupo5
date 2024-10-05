import { useLocation } from "react-router-dom";
import React, { useState, useContext, useEffect } from 'react';
import { Container, Pagination, Row ,Col,Form, Table, Button} from 'react-bootstrap';
import UserContext from "../context/Context.jsx";
import Paginacion from '../components/Paginacion.jsx';
import FiltroUser from '../components/FiltroUser.jsx'
import TablaUsuarios from "../components/TablaUsuarios.jsx";

export function AsigUser(){
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const codigoTienda = searchParams.get("codigo");
  const { buscarTodosLosUsuarios, modificarUsuario} = useContext(UserContext)
  const [activePage, setActivePage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const[usuarioList, setUsuarioList] = useState([])
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState({
    nombre : "",
    usuario : "",
    tiendaCodigo: "",
  });
  
    useEffect(() => {
      const fetchData = async () => {
        const users = await buscarTodosLosUsuarios()
        setData(users);
      };
      fetchData();
    }, [buscarTodosLosUsuarios, codigoTienda]);

    const asignar = async (list) => {
      console.log("Cod tienda: ", codigoTienda);
      if (list && list.length > 0) {
        try {
          await Promise.all( list.map(async (u) => {
              u = {...u, usuarioAModificar: u.usuario,tiendaCodigo : codigoTienda};
              console.log("USUARIO A MOD: ",JSON.stringify(u))
              await modificarUsuario(u);
              return u.usuario;
            })
          );
          const asignados = await list.map((u) => u.usuario);
          alert("Usuarios asignados a tienda: " + codigoTienda + "\n" + asignados.join("\n").toString() );
          window.location.reload();
        } catch (error) {
          console.error("Error al asignar usuarios:", error);
          alert("Error al asignar usuarios.");
        }
      } else {
        alert("La lista está vacía.");
      }
    };

    const desasignar = async (list) => {
      console.log("Cod tienda: ", codigoTienda);
      if (list && list.length > 0) {
        try {
          await Promise.all( list.map(async (u) => {
              if (u.tiendaCodigo === codigoTienda) { u.habilitado = false}
              u = {...u, usuarioAModificar: u.usuario};
              console.log("USUARIO A MOD: ",JSON.stringify(u))
              await modificarUsuario(u);
              return u.usuario;
            })
          );
          const asignados = await list.map((u) => u.usuario);
          alert("Usuarios desasignados a tienda: " + codigoTienda + "\n" + asignados.join("\n").toString() );
          window.location.reload();
        } catch (error) {
          console.error("Error al desasignar usuarios:", error);
          alert("Error al desasignar usuarios.");
        }
      } else {
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
      if (!usuarioList.some((usuario) => usuario.usuario === item.usuario)) {
        setUsuarioList((prevList) => [...prevList, item]);
      }
    };
  
    const handleDesasignar = (item) => {
      setUsuarioList((prevList) =>
        prevList.filter((usuario) => usuario.usuario !== item.usuario)
      );
    };

    const filteredData = data.filter((usuario)=>{
      return(
        usuario.nombre.toLowerCase().includes(filter.nombre.toLowerCase()) &&
        usuario.usuario.toLowerCase().includes(filter.usuario.toLowerCase()) &&
        usuario.tiendaCodigo.toLowerCase().includes(filter.tiendaCodigo.toLowerCase())
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
          <FiltroUser filter={filter} handleFilterChange={handleFilterChange} />
  
          {/*CONTENIDO */}
            <TablaUsuarios list={paginatedData} handleAsignar={handleAsignar}/>
  
          {/*PAGINACION*/}
          <Paginacion handlePageChange={handlePageChange} handlePreviousPage={handlePreviousPage} handleNextPage={handleNextPage} data={data} activePage={activePage} itemsPerPage={itemsPerPage}/>
  
        </Container>
        </Col>
        <Col md={{ span: 1 }} />
        <Col md={{ span: 5 }} style={{marginTop: '.3cm'}}>
        <h3>Tienda: {codigoTienda}</h3>
        <Button onClick={()=>asignar(usuarioList)}><h3>ASIGNAR</h3></Button>
        <Button variant="outline-danger"style={{marginLeft: '.5cm'}} onClick={()=>desasignar(usuarioList)}><h3>DESASIGNAR</h3></Button>
        {/* TABLA PARA ASIGNAR O DESASIGNAR*/}
            <TablaUsuarios list={usuarioList} handleDesasignar={handleDesasignar}/>
        </Col>
  
        </Row>
        </>
      );
}

export default AsigUser;