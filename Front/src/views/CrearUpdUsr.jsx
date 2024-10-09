import { useLocation, useNavigate } from "react-router-dom";
import {useContext, useState, useEffect} from "react";
import { Form, Button, Container, Col, Row} from 'react-bootstrap';
import UserContext from "../context/Context.jsx";

export function CrearUpdUsr(){
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const usrName = searchParams.get("usuario");
    const { buscarUsuario , altaUsuario, modificarUsuario, buscarTodasLasTiendas} = useContext(UserContext);
    const [usuario, setUsuario] = useState(null);
    const[tiendas,setTiendas] = useState([]);
    
  const [formData, setFormData] = useState({
    usuario: "",
    password: "",
    nombre: "",
    apellido: "",
    habilitado: false,
    tiendaCodigo : "",
  });
    console.log("usrName: " + JSON.stringify(usrName));
  
    useEffect(() => {
      buscarTodasLasTiendas().then((msg) => {
        const tiendasHabilitadas = msg.filter((tienda) => tienda.habilitado);
        setTiendas(tiendasHabilitadas);
      });
      if (usrName) {
        buscarUsuario(usrName)
          .then((msg) => {
            console.log("Usuario actualizado:", msg);
            //setUsuario(JSON.stringify(msg));
            setUsuario(msg);
            setFormData({
              usuarioAModificar : msg.usuario,
              usuario: msg.usuario,
              password: msg.password,
              nombre: msg.nombre,
              apellido: msg.apellido,
              habilitado: msg.habilitado,
              tiendaCodigo : msg.tiendaCodigo,
            });
          })
          .catch((error) => {
            console.error("Error al cargar el usuario:", error);
          });
      };

    }, [usrName, buscarUsuario, buscarTodasLasTiendas]);

    const handleSubmit = (e) => {
      e.preventDefault();
      if (formData.usuarioAModificar) {
        modificarUsuario(formData).then((msj) => {
        alert(msj);
        navigate('/buscarusuarios');
      });
      } else {
        altaUsuario(formData).then((msj) => {
          alert(msj);
          navigate('/buscarusuarios');
        });
      }
    };
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
      console.log(formData)
    };

    
   return (<>
    <Container >
  <Row className="FormABM">
    <Col md={{ span: 4 }}>     

  <h1>{usrName ? "Actualizar Usuario" : "Crear Usuario"}</h1>
  <Form onSubmit={handleSubmit}>
    <Form.Group className="mb-3" controlId="usuario">
      <Form.Label>Usuario</Form.Label>
      <Form.Control
        type="text"
        placeholder="Usuario"
        name="usuario"
        value={formData.usuario}
        onChange={handleChange}
        required
      />
    </Form.Group>
    <Form.Group className="mb-3" controlId="password">
      <Form.Label>Password</Form.Label>
      <Form.Control
        type="text"
        placeholder="Password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
      />
    </Form.Group>
    <Form.Group className="mb-3" controlId="nombre">
      <Form.Label>Nombre</Form.Label>
      <Form.Control
        type="text"
        placeholder="Nombre"
        name="nombre"
        value={formData.nombre}
        onChange={handleChange}
        required
      />
    </Form.Group>
    <Form.Group className="mb-3" controlId="apellido">
      <Form.Label>Apellido</Form.Label>
      <Form.Control
        type="text"
        placeholder="Apellido"
        name="apellido"
        value={formData.apellido}
        onChange={handleChange}
        required
      />
    </Form.Group>

    <Form.Group className="mb-3" controlId="tiendaCodigo">
      <Form.Label>Tienda {usuario && usuario.tiendaCodigo}</Form.Label>
      <Form.Select
        name="tiendaCodigo"
        value={formData.tiendaCodigo}
        onChange={handleChange}
        required
      >
        <option value="">Seleccione una tienda</option>
        {tiendas.map((tienda) => (
          <option key={tienda.codigo} value={tienda.codigo}>
            {tienda.codigo}
          </option>
        ))}
      </Form.Select>
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
      {usrName ? "Actualizar" : "Crear"}
    </Button>
  </Form> 
  </Col>
  </Row>
      </Container>
</>
   )
}

export default CrearUpdUsr;