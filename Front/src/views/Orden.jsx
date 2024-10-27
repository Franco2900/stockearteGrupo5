import React, { useState, useContext, useEffect } from 'react';
import UserContext from "../context/Context.jsx";
import { Container, Col,Button, Row,ListGroup} from 'react-bootstrap';
import TablaOrdenItems from '../components/TablaOrdenItems';

export default function Orden() {
    const { traerItems , aceptarDespacho} = useContext(UserContext);
    const [orden, setOrden] = useState(() => {
      const savedOrden = localStorage.getItem('orden');
      return savedOrden !== null ? JSON.parse(savedOrden) : null;
    });
  
    const [items, setItems] = useState([]);
  
    useEffect(() => {
      console.log('Orden LocalStorage:', orden);
  
      const fetchData = async () => {
        try {
          const list = await traerItems(orden?.idOrdenDeCompra);
          console.log('ITEMS LIST'+list)
          setItems(list);
        } catch (error) {
          console.error('Error al obtener items:', error);
        }
      };
  
      if (orden && orden.idOrdenDeCompra) {
        fetchData();
      }
    }, [orden, traerItems]);
    const HandleClick= async (e) => {
      e.preventDefault();
      aceptarDespacho(orden?.idOrdenDeCompra);
      window.location.href = '/buscarordenes';
    };

    return(
    <Container>
      <Row style={{marginTop: '1cm'}}><ListGroup as="ol" horizontal>             
              <Col>
              <ListGroup.Item as="li">Fecha de solicitud: {orden.fechaDeSolicitud}</ListGroup.Item>
              <ListGroup.Item as="li">Estado: {orden.estado}</ListGroup.Item>            
              </Col>
              <Col>
              <ListGroup.Item as="li">Fecha de Envio: {orden.fechaDeEnvio}</ListGroup.Item>
              <ListGroup.Item as="li">Fecha de recepción: {orden.fechaDeRecepcion}</ListGroup.Item>
              
              </Col>
              <Col>
              <ListGroup.Item as="li">Observaciones: {orden.observaciones}</ListGroup.Item>
              </Col>
            </ListGroup>
               </Row>
      <Row className="d-flex justify-content-center  "style={{overflowY: 'scroll', minHeight: 'calc(100vh -  233px)'}}>            
        <Col md={{ span: 4 }} >
         <TablaOrdenItems list={items}/>
         {(orden.estado==="ACEPTADA" && orden.fechaDeEnvio !=="No disponible") && (<><Button className='BotonABM' variant="primary" onClick={HandleClick}>Recibir</Button> </>)}
        </Col>
      </Row>
    </Container>
     
    )
}