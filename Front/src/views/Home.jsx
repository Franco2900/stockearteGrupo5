import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import React, { useContext , useState, useEffect} from "react";
import UserContext from "../context/Context";
import ListCardProductos from "../components/ListCardProductos";


function Home() {
const { user, traerUsuarioPorId , buscarTodosLosProductos} = useContext(UserContext);
const [productos, setProductos] = useState(null);

//console.log("Pos peticion");
useEffect(() => {  
  buscarTodosLosProductos()
      .then((msg) => {
        console.log("Productos HOME:", msg);
        setProductos(msg.productoObject);
      })
      .catch((error) => {
        console.error("Error al cargar los productos:", error);
      });
}, [ buscarTodosLosProductos]);
if (!productos) {
  return <><Container className="Busqueda"><p>Cargando Productos...</p></Container></>;
}
  return (
    <>      
      <section>
        <Container>
          <Row xs={1}>
            <h1> </h1>
          </Row>
          <Row xs={1}>
            <Col md={{ span: 3 }}></Col>

            <Col className="d-flex">
              <ListCardProductos  key={Math.random()} productos={productos}></ListCardProductos>
            </Col>

            <Col md={{ span: 3 }}></Col>
          </Row>
          <Row xs={1}>
            <h1> </h1>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Home;
