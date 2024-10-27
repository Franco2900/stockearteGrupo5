
import React, { useContext , useEffect, useState} from 'react';
import UserContext from '../context/Context';
import { Accordion, ListGroup, Button, Col} from 'react-bootstrap';
import { Link } from "react-router-dom";

export default function OrdenAccord({orden}){
    const { user } = useContext(UserContext)
    const HandleClick = async (e) => {
      e.preventDefault();    
      try {        
       localStorage.setItem("orden",JSON.stringify(orden));   
       window.location.href = '/orden';        
      } catch (error) {
        console.error("Error al guardar la orden", error);
      }
     };
    return (
      <Accordion defaultActiveKey="0" flush className='Accordion'>
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            <ListGroup as="ol" horizontal>
              <ListGroup.Item as="li">Fecha de solicitud: {orden.fechaDeSolicitud}</ListGroup.Item>
              <ListGroup.Item as="li">Estado: {orden.estado}</ListGroup.Item>
            </ListGroup></Accordion.Header>
          <Accordion.Body>
            <ListGroup as="ol" horizontal>             
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
                <Button className='BotonABM' variant="primary" onClick={HandleClick}>Ver Orden</Button>    
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    );
}