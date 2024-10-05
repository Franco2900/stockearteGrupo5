
import React, { useState, useContext, useEffect } from 'react';
import { Container, Row ,Col, Form} from 'react-bootstrap';
import UsuarioAccord from '../components/UsuarioAccord.jsx'
import UserContext from "../context/Context.jsx";
import Paginacion from '../components/Paginacion.jsx';
import FiltroUser from '../components/FiltroUser.jsx';

export default function BuscarUsuarios() {
    const { buscarTodosLosUsuarios } = useContext(UserContext)
    const [activePage, setActivePage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(15);
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState({
      nombre : "",
      usuario : "",
      tiendaCodigo: "",
    });
  
    useEffect(() => {
      const fetchData = async () => {
        const usuarios = await buscarTodosLosUsuarios();
        setData(usuarios);
        console.log('Los USUARIOS: ' + JSON.stringify(usuarios))
      };
      fetchData();
    }, [buscarTodosLosUsuarios]);

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
  
    return (
      <Container className='Busqueda'>
        
      {/*FILTRO DE BUSQUEDA */}
        <FiltroUser filter={filter} handleFilterChange={handleFilterChange} />

        {/*CONTENIDO */}
          <Row className='flex-grow-1 overflow-auto'>
            {paginatedData.map((item, index) => (
              <UsuarioAccord key={index} usuario={item} />
             ))}
          </Row>

        {/*PAGINACION */}
        <Paginacion handlePageChange={handlePageChange} handlePreviousPage={handlePreviousPage} handleNextPage={handleNextPage} data={data} activePage={activePage} itemsPerPage={itemsPerPage}/>

      </Container>
    );
  };