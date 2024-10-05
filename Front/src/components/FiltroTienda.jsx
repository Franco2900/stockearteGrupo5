import { Row, Col, Form } from "react-bootstrap";
export default function FiltroTienda({ filter, handleFilterChange }) {
  return (
    <>
      {/*FILTRO DE BUSQUEDA */}
      <Row>
        <Col md={{ span: 3 }}>
          <Form.Group controlId="codigo">
            <Form.Label>Código</Form.Label>
            <Form.Control
              type="text"
              name="codigo"
              value={filter.codigo}
              onChange={handleFilterChange}
            />
          </Form.Group>
        </Col>
        <Col md={{ span: 1 }} className="FiltroSwitch">
          <Form.Group controlId="habilitado">
            <Form.Check
              type="switch"
              name="habilitado"
              id="custom-switch"
              checked={filter.habilitado}
              onChange={handleFilterChange}
              label="Activo"
            />
          </Form.Group>
        </Col>
      </Row>
    </>
  );
}
