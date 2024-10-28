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
          <Form.Group controlId="codigo">
            <Form.Label>Codigo</Form.Label>
            <Form.Control
              type="text"
              name="codigo"
              value={filter.codigo}
              onChange={handleFilterChange}
            />
          </Form.Group>
        </Col>
        <Col md={{ span: 3 }}>
          <Form.Group controlId="talle">
            <Form.Label>Talle</Form.Label>
            <Form.Control
              type="text"
              name="talle"
              value={filter.talle}
              onChange={handleFilterChange}
            />
          </Form.Group>
        </Col>
        <Col md={{ span: 3 }}>
          <Form.Group controlId="color">
            <Form.Label>Color</Form.Label>
            <Form.Control
              type="text"
              name="color"
              value={filter.color}
              onChange={handleFilterChange}
            />
          </Form.Group>
        </Col>
      </Row>
    </>
  );
};
