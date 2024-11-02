import React, { useState, useContext, useEffect } from 'react';
import UserContext from "../context/Context.jsx";
import { Accordion, ListGroup, Col, Button,Row} from 'react-bootstrap';
import { Link } from 'react-router-dom';



export default function CatalogoAccord({ catalogo }) {
  const { user, crearCatalogo } = useContext(UserContext);

  const descargarPDF = async(productos,titulo) => {
    try {
  
      const codigosProducto = productos.map(producto => producto.producto_codigo);
      
      const pdfBase64 = await crearCatalogo(codigosProducto, titulo);
      const link = document.createElement('a');
      link.href = `data:application/pdf;base64,${pdfBase64}`;
      link.download = `${titulo}.pdf`;
      link.click();
    } catch (error) {
      console.error("Error al crear el catalogo:", error);
      alert("Ocurrió un error al crear el catalogo.");
    }
  };

  return (
    <Accordion defaultActiveKey="0" flush className="CatalogoAccordion">
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          <Row className="w-100 d-flex align-items-center">
              <Col><h5>{catalogo.titulo}</h5></Col>
              <Col className="text-end">
                <Link to={`/modificarcatalogo?titulo=${catalogo.titulo}`}>
                  <Button variant="warning" size="sm" className="me-2">Modificar</Button>
                </Link>
                <Link to={`/eliminarcatalogo?titulo=${catalogo.titulo}`}>
                  <Button variant="danger" size="sm">Eliminar</Button>
                </Link>
                <Button variant="info" size="sm" onClick={() => descargarPDF(catalogo.productos,catalogo.titulo)}>
                  Descargar
                </Button>
              </Col>
            </Row>
        </Accordion.Header>

        <Accordion.Body>
          {/* Recorro y muestro los productos del catálogo */}
          {catalogo.productos.map((producto, index) => (
            <Accordion key={index} defaultActiveKey="1" flush className="ProductoAccordion">
              <Accordion.Item eventKey="1">
                <Accordion.Header>
                  <ListGroup as="ol" horizontal>
                    <ListGroup.Item as="li">Nombre: {producto.nombre}</ListGroup.Item>
                    <ListGroup.Item as="li">Codigo: {producto.producto_codigo}</ListGroup.Item>
                  </ListGroup>
                </Accordion.Header>
                
                <Accordion.Body>
                  <ListGroup as="ol" horizontal>
                    <Col>
                      <img src={`data:image/jpeg;base64,${producto.foto}`} className="fotoStyle" alt="Imagen del producto" />
                    </Col>
                    <Col>
                      <ListGroup.Item as="li">Nombre: {producto.nombre}</ListGroup.Item>
                      <ListGroup.Item as="li">Codigo: {producto.producto_codigo}</ListGroup.Item>
                    </Col>
                    <Col>
                      <ListGroup.Item as="li">Talle: {producto.talle}</ListGroup.Item>
                      <ListGroup.Item as="li">Color: {producto.color}</ListGroup.Item>
                    </Col>
                  </ListGroup>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          ))}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

