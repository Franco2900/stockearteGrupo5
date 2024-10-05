import { Row, Col, Form } from "react-bootstrap";
export default function FiltroUser({filter, handleFilterChange}){
    return(<>
    {/*FILTRO DE BUSQUEDA */}
     <Row >
          <Col md={{ span: 3 }}>
            <Form.Group controlId="nombre" >
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
            <Form.Group controlId="usuario" >
              <Form.Label>Usuario</Form.Label>
                <Form.Control
                  type="text"
                  name="usuario"
                  value={filter.usuario}
                  onChange={handleFilterChange}
                />
            </Form.Group>
          </Col>
          <Col md={{ span: 3 }}>
            <Form.Group controlId="tiendaCodigo" >
              <Form.Label>Tienda</Form.Label>
                <Form.Control
                  type="text"
                  name="tiendaCodigo"
                  value={filter.tiendaCodigo}
                  onChange={handleFilterChange}
                />
            </Form.Group>
          </Col>
        </Row>    
    </>);
}