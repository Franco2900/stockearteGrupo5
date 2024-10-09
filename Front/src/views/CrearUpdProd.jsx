import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { Form, Button, Container, Col, Row} from 'react-bootstrap';
import UserContext from "../context/Context.jsx";

export function CrearUpdProd() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const codigo = searchParams.get("codigo");
  const { buscarProducto, altaProducto, modificarProducto, buscarTodasLasTiendas } = useContext(UserContext);
  const [filePreview, setFilePreview] = useState("");
  const [tiendas, setTiendas] = useState([]);
  const [formData, setFormData] = useState({
    nombre: "",
    talle: "",
    color: "",
    foto: "",
    tiendaList: [],
  });
  
  useEffect(() => {
    
    buscarTodasLasTiendas().then((msg) => {
      const tiendasHabilitadas = msg.filter((tienda) => tienda.habilitado);
      setTiendas(tiendasHabilitadas);
    });
    
    if (codigo) {
      buscarProducto(codigo)
        .then((msg) => {
          setFormData({
            codigoOld: msg.codigo,
            codigo: msg.codigo,
            nombre: msg.nombre,
            talle: msg.talle,
            color: msg.color,
            foto: msg.foto,
            tiendaList: msg.tiendas || [], 
          });
          setFilePreview(`data:image/jpeg;base64,${msg.foto}`);
        })
        .catch((error) => {
          console.error("Error al cargar producto:", error);
        });
    }
  }, [codigo, buscarProducto, buscarTodasLasTiendas]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.codigoOld) {
      modificarProducto(formData).then((msj) => {
        alert(msj);
        navigate('/buscarproductos');
      });
    } else {
      altaProducto(formData).then((msj) => {
        alert(msj);
        navigate('/buscarproductos');
      });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, foto: reader.result }); // Actualiza el estado con la imagen en base64
        setFilePreview(reader.result); // Actualiza la vista previa con la imagen en base64
      };
      reader.readAsDataURL(file); // Convierte el archivo a base64
      //console.log("CONVERSION BASE64: ",file)
    }
  };
  
  const handleTiendaChange = (e, tienda) => {
    const { checked } = e.target;
    let tiendasSeleccionadas;
    
    if (checked) {
      tiendasSeleccionadas = [...formData.tiendaList, tienda];
    } else {
      tiendasSeleccionadas = formData.tiendaList.filter((t) => t.codigo !== tienda.codigo);
    }
    
    setFormData({ ...formData, tiendaList: tiendasSeleccionadas });
  };

  return (
    <Container>
      <Row className="FormABM">
         {/* Columna izquierda con la foto */}
         <Col md={3}>
         {filePreview ? (
            <img src={filePreview} alt="Imagen del producto" className="fotoStyle" />
          ) : (
            <p>No se ha cargado ninguna imagen</p>
          )}
        </Col>
        <Col md={1} />
        {/* Columna centra con los campos */}
        <Col md={4} >
          <h1>{codigo ? "Actualizar Producto" : "Crear Producto"}</h1>
          <Form onSubmit={handleSubmit} encType="multipart/form-data">
            <Form.Group className="mb-3" controlId="codigo">
              <Form.Label>Código</Form.Label>
              <Form.Control
                type="text"
                placeholder="Código Autogenerado"
                name="codigo"
                value={formData.codigo}
                disabled
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
            <Form.Group className="mb-3" controlId="talle">
              <Form.Label>Talle</Form.Label>
              <Form.Control
                type="text"
                placeholder="Talle"
                name="talle"
                value={formData.talle}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="color">
              <Form.Label>Color</Form.Label>
              <Form.Control
                type="text"
                placeholder="Color"
                name="color"
                value={formData.color}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="foto">
              <Form.Label>Foto</Form.Label>
              <Form.Control
                type="file"
                name="foto"
                onChange={handleFileChange}
                
              />
            </Form.Group>
            <Button className="BotonABM" variant="primary" type="submit">
              {codigo ? "Actualizar" : "Crear"}
            </Button>
          </Form>
        </Col>
        <Col md={1} />
        {codigo ? <> </>:<>{/* Columna derecha con el listado de tiendas */}
        <Col md={3}  >
          <h4>Selecciona las Tiendas</h4>
          {tiendas.map((tienda) => (
            <Form.Group className="mb-3" controlId={`tienda-${tienda.codigo}`} key={tienda.codigo}>
              <Form.Check
                type="checkbox"
                label={tienda.codigo}
                checked={formData.tiendaList.some((t) => t.codigo === tienda.codigo)}
                onChange={(e) => handleTiendaChange(e, tienda)}
              />
            </Form.Group>
          ))}
        </Col> </>}
      </Row>
    </Container>
  );
}

export default CrearUpdProd;