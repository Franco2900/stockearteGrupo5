import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { Form, Button, Container, Col, Row} from 'react-bootstrap';
import UserContext from "../context/Context.jsx";

export function CrearUpdTienda() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const codigo = searchParams.get("codigo");
  const { buscarTienda, altaTienda, modificarTienda } = useContext(UserContext);

  const [tienda, setTienda] = useState(null);
  const [formData, setFormData] = useState({
    codigo: "",
    direccion: "",
    ciudad: "",
    provincia: "",
    habilitado: false,
  });
  
  useEffect(() => {
    if (codigo) {
      buscarTienda(codigo)
        .then((msg) => {
          setTienda(msg);
          setFormData({
            codigoTiendaAModificar: msg.codigo,
            codigo: msg.codigo,
            direccion: msg.direccion,
            ciudad: msg.ciudad,
            provincia: msg.provincia,
            habilitado: msg.habilitado,
          });
        })
        .catch((error) => {
          console.error("Error al cargar tienda:", error);
        });
    }
  }, [codigo, buscarTienda]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.codigoTiendaAModificar) {
      modificarTienda(formData).then((msj) => {
      alert(msj);
      navigate('/buscartiendas');
    });
    } else {
      altaTienda(formData).then((msj) => {
        alert(msj);
        navigate('/buscartiendas');
      });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
        <Container >
      <Row className="FormABM">
        <Col md={{ span: 4 }}>     

      <h1>{codigo ? "Actualizar Tienda" : "Crear Tienda"}</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="codigo">
          <Form.Label>Código</Form.Label>
          <Form.Control
            type="text"
            placeholder="Código"
            name="codigo"
            value={formData.codigo}
            onChange={handleChange}
            required
            pattern="[a-zA-Z0-9]+"
            title="Solo se permiten letras y números"
            onInvalid={(e) => e.target.setCustomValidity("Código inválido. Solo letras y números")}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="direccion">
          <Form.Label>Dirección</Form.Label>
          <Form.Control
            type="text"
            placeholder="Dirección"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="ciudad">
          <Form.Label>Ciudad</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ciudad"
            name="ciudad"
            value={formData.ciudad}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="provincia">
          <Form.Label>Provincia</Form.Label>
          <Form.Control
            type="text"
            placeholder="Provincia"
            name="provincia"
            value={formData.provincia}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="d-flex justify-content-center align-items-center" controlId="habilitado">
          <Form.Check
            type="switch"
            name="habilitado"
            id="custom-switch"
            checked={formData.habilitado}
            onChange={(e) =>
              setFormData({ ...formData, habilitado: e.target.checked })
            }
            label="Activo"
          />
        </Form.Group>
        <Button className="BotonABM" variant="primary" type="submit">
          {codigo ? "Actualizar" : "Crear"}
        </Button>
      </Form> 
      </Col>
      </Row>
          </Container>
    </>
  );
}

export default CrearUpdTienda;