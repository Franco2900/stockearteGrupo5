import React from 'react';
import {ListGroup, Col,Button, Accordion} from 'react-bootstrap';
import { Link } from "react-router-dom";

export default function TiendaAccord ({ tienda }) {

  return (
    <Accordion defaultActiveKey="0" flush className='Accordion'>
      <Accordion.Item eventKey="1">
        <Accordion.Header>
          <ListGroup as="ol" horizontal>
           
            <ListGroup.Item as="li" >Tienda: {tienda.codigo}</ListGroup.Item>
            <ListGroup.Item as="li">Habilitado: {(tienda.habilitado) ? "SI":"NO"}</ListGroup.Item>
          </ListGroup></Accordion.Header>
        <Accordion.Body>
          <ListGroup as="ol" horizontal>
            <Col>
            <ListGroup.Item as="li">Tienda: {tienda.codigo}</ListGroup.Item>
            <ListGroup.Item as="li">Direccion: {tienda.direccion}</ListGroup.Item>
            </Col>
            <Col>
            <ListGroup.Item as="li">Ciudad: {tienda.ciudad}</ListGroup.Item>
            <ListGroup.Item as="li">Provincia: {tienda.provincia}</ListGroup.Item>
            </Col>
            <Col>            
            <ListGroup.Item as="li">Casa Central: {(tienda.central) ? "SI":"NO"}</ListGroup.Item>
            <ListGroup.Item as="li">Habilitado: {(tienda.habilitado) ? "SI":"NO"}</ListGroup.Item>
            </Col>           
          </ListGroup>
          <Link to={`/creartienda?codigo=${tienda.codigo}`} >
                <Button className='BotonABM' variant="primary">Editar</Button>
          </Link>
          <Link to={`/asigprod?codigo=${tienda.codigo}`} >
                <Button className='BotonABM' variant="primary">Asignar Productos</Button>
          </Link>
          <Link to={`/asiguser?codigo=${tienda.codigo}`} >
                <Button className='BotonABM' variant="primary">Asignar Usuarios</Button>
          </Link>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};