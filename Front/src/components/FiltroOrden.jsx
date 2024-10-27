import { Row, Col, Form } from "react-bootstrap";
export default function FiltroOrden({filter, handleFilterChange}) {
  return (
    <>
      {/*FILTRO DE BUSQUEDA */}
      <Row>
        <Col md={{ span: 3 }}>
          <Form.Group controlId="fecha_de_solicitud">
            <Form.Label>Fecha de Solicitud</Form.Label>
            <Form.Control
              type="text"
              name="fecha_de_solicitud"
              value={filter.fecha_de_solicitud}
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
}
