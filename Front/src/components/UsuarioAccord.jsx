import React from 'react';
import {ListGroup, Col,Button, Accordion} from 'react-bootstrap';
import { Link } from "react-router-dom";

export default function UsuarioAccord ({ usuario }) {

  return (
    <Accordion defaultActiveKey="0" flush className='Accordion'>
      <Accordion.Item eventKey="1">
        <Accordion.Header>
          <ListGroup as="ol" horizontal>
            <ListGroup.Item as="li">Usuario: {usuario.usuario}</ListGroup.Item>
            <ListGroup.Item as="li">Tienda: {usuario.tiendaCodigo}</ListGroup.Item>
            <ListGroup.Item as="li">Habilitado: {(usuario.habilitado) ? "SI":"NO"}</ListGroup.Item>
          </ListGroup></Accordion.Header>
        <Accordion.Body>
          <ListGroup as="ol" horizontal>
            <Col>
            <ListGroup.Item as="li">Usuario: {usuario.usuario}</ListGroup.Item>
            <ListGroup.Item as="li">Password: {usuario.password}</ListGroup.Item>
            
            </Col>
            <Col>
            <ListGroup.Item as="li">Nombre: {usuario.nombre}</ListGroup.Item>
            <ListGroup.Item as="li">Apellido: {usuario.apellido}</ListGroup.Item>
            </Col>
            <Col>            
            <ListGroup.Item as="li">Tienda: {usuario.tiendaCodigo}</ListGroup.Item>
            <ListGroup.Item as="li">Habilitado: {(usuario.habilitado) ? "SI":"NO"}</ListGroup.Item>
            </Col>           
          </ListGroup>
          <Link to={`/crearusuario?usuario=${usuario.usuario}`}>
                <Button className='BotonABM' variant="primary">Editar / Eliminar</Button>
          </Link>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};