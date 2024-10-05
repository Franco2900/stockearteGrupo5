
import React, { useContext , useEffect, useState} from 'react';
import UserContext from '../context/Context';
import { Accordion, ListGroup, Button, Col} from 'react-bootstrap';
import { Link } from "react-router-dom";

export default function ProductoAccord ( {producto} ) {
 const { user } = useContext(UserContext)
 
  return (
    <Accordion defaultActiveKey="0" flush className='Accordion'>
      <Accordion.Item eventKey="1">
        <Accordion.Header>
          <ListGroup as="ol" horizontal>
            <ListGroup.Item as="li">Nombre: {producto.nombre}</ListGroup.Item>
            <ListGroup.Item as="li">Codigo: {producto.codigo}</ListGroup.Item>
          </ListGroup></Accordion.Header>
        <Accordion.Body>
          <ListGroup as="ol" horizontal>
            <Col>
             <>
               { <img src={`data:image/jpeg;base64,${producto.foto}`} className="fotoStyle" alt="Imagen del producto" />}              
             </>
            </Col>
            <Col>
            <ListGroup.Item as="li">Nombre: {producto.nombre}</ListGroup.Item>
            <ListGroup.Item as="li">Codigo: {producto.codigo}</ListGroup.Item>            
            </Col>
            <Col>
            <ListGroup.Item as="li">Talle: {producto.talle}</ListGroup.Item>
            <ListGroup.Item as="li">Color: {producto.color}</ListGroup.Item>
            </Col>
            <Col>
            <ListGroup.Item as="li">Tienda: {producto.tiendaCodigo}</ListGroup.Item>
            <ListGroup.Item as="li">Stock: {producto.stock}</ListGroup.Item>
            </Col>
          </ListGroup>
          {user.central ? 
          (<Link to={`/crearproducto?codigo=${producto.codigo}`}>
                <Button className='BotonABM' variant="primary">Editar / Eliminar</Button>
          </Link>) 
          :
          (<Link to={`/modstock?codigo=${producto.codigo}`}>
            <Button className='BotonABM' variant="primary">Modificar Stock</Button>
           </Link>)
          }
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};