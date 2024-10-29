import { Button, Container, Col, Row} from 'react-bootstrap';
import React, { useContext, useEffect ,useState} from "react"
import UserContext from "../context/Context.jsx"
import Informe from "../components/Informe";
import FiltroInforme from "../components/FiltroInforme.jsx" 

export default function Informes(){
    const { crearFiltro, traerFiltros,ordenes, eliminarFiltro, modificarFiltro,user} = useContext(UserContext)
    const[filtroList, setFiltroList] = useState([]);
    const [informe, setInforme] = useState()
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
      }, [informe, traerFiltros]);
  const verInforme = (f) =>{
    const fetchData = async () => {
      const i = await ordenes(f)
      setInforme(i);
      console.log('INFORME OBTENIDOS: ' + JSON.stringify(i))
    };
    fetchData();
  };
  const crear = async (f) =>{
    const msj = await crearFiltro(f);
    alert(msj);
    window.location.reload();
  }
  const eliminar = async (f) =>{
    const msj = await eliminarFiltro(f);
    alert(msj);
    window.location.reload();
  }
  const modificar = async (f) =>{
    const msj = await modificarFiltro(f);
    alert(msj);
    window.location.reload();
  }
      
      return (
        <>
          <Container className="Busqueda justify-content-center h-100">
           <Container style={{ height: '10vh', overflowY: 'auto', borderBottom: '1px solid #000'}}>
             <Row className="justify-content-center h-100">
               <Col>
                 <FiltroInforme f={filter} crear={crear} central={user.central}/>
               </Col>
             </Row>
           </Container>

           <Container style={{ height: '35vh', overflowY: 'scroll', marginTop: '.3cm' }}>
            
             <Row className="justify-content-center h-100">
              {filtroList.map((filtro,index) => (
                 <FiltroInforme f={filtro} key={index} verInforme={verInforme} modificar={modificar} eliminar={eliminar} central={user.central}/>
              ))}
               
             </Row>
           </Container>

           <Container style={{ height: '35vh', overflowY: 'auto', marginTop: '.3cm' }}>
             <Row className="justify-content-center h-100">
               <Col>
                 <Informe items={informe} />
               </Col>
             </Row>
           </Container>

          </Container>

        </>
      );
}