import { Row, Col, Form } from "react-bootstrap";
export default function FiltroProd({filter, handleFilterChange}) {
  return (
    <>
      {/*FILTRO DE BUSQUEDA */}
      <Row>
        <Col md={{ span: 3 }}>
          <Form.Group controlId="nombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={filter.nombre}
              onChange={handleFilterChange}
            />
          </Form.Group>
        </Col>
        <Col md={{ span: 3 }}>
          <Form.Group controlId="producto_codigo">
            <Form.Label>Codigo Producto</Form.Label>
            <Form.Control
              type="text"
              name="producto_codigo"
              value={filter.producto_codigo}
              onChange={handleFilterChange}
            />
          </Form.Group>
        </Col>
        {true && <>
        <Col md={{ span: 3 }}>
          <Form.Group controlId="tienda_codigo">
            <Form.Label>Tienda</Form.Label>
            <Form.Control
              type="text"
              name="tienda_codigo"
              value={filter.tienda_codigo}
              onChange={handleFilterChange}
            />
          </Form.Group>
        </Col>
        </>}
        <Col md={{ span: 3 }}>
          <Form.Group controlId="fecha_inicio">
            <Form.Label>Desde</Form.Label>
            <Form.Control
              type="date"
              name="fecha_inicio"
              value={filter.fecha_inicio}
              onChange={handleFilterChange}
            />
          </Form.Group>
        </Col>
        <Col md={{ span: 3 }}>
          <Form.Group controlId="fecha_final">
            <Form.Label>Hasta</Form.Label>
            <Form.Control
              type="date"
              name="fecha_final"
              value={filter.fecha_final}
              onChange={handleFilterChange}
            />
          </Form.Group>
        </Col>
        <Col md={{ span: 3 }}>
          <Form.Group controlId="estado">
            <Form.Label>Estado</Form.Label>
            <Form.Control
              type="text"
              name="estado"
              value={filter.estado}
              onChange={handleFilterChange}
            />
          </Form.Group>
        </Col>
      </Row>
    </>
  );
};