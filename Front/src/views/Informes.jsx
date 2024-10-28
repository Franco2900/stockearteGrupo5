import { Button, Container, Col, Row} from 'react-bootstrap';
import React, { useContext, useEffect ,useState} from "react"
import UserContext from "../context/Context.jsx"
import Informe from "../components/Informe";
import FiltroInforme from "../components/FiltroInforme.jsx" 

export default function Informes(){
    const { crearFiltro, traerFiltros, user} = useContext(UserContext)
    const[filtroList, setFiltroList] = useState([])
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState({
      nombre : "",
      producto_codigo : "",
      tienda_codigo: "",
      fecha_inicio: "",
      fecha_final: "",
      estado: "",
    });
    
      useEffect(() => {
        const fetchData = async () => {
          const list = await traerFiltros()
          setFiltroList(list);
          console.log('FILTROS OBTENIDOS: ' + JSON.stringify(list))
        };
        fetchData();
      }, [filtroList, traerFiltros]);
  

      const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
      };    
      
      return (
        <>
          <Row className="justify-content-center">
            <Col md={{ span: 7 }}>
              <Container className="Busqueda">
                {/*FILTRO DE BUSQUEDA*/}
                <FiltroInforme filter={filter} handleFilterChange={handleFilterChange}/>

                {/*CONTENIDO */}
                
              </Container>
            </Col>
            
            <Col md={{ span: 4 }} style={{ marginTop: ".3cm" }}>
               {/* VER INFORME*/}
               <h3>INFORME: </h3>
              <Informe item={filter}/>
            </Col>
          </Row>
        </>
      );
}