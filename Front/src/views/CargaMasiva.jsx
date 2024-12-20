import React, { useState, useContext } from 'react';
import UserContext from "../context/Context.jsx";
import { Container, Col, Row} from 'react-bootstrap';

const CargaMasiva = () => {
    const { cargaMasiva } = useContext(UserContext);
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (file) {
            console.log("Archivo cargado:", file.name);
            try {
                const mensaje = await cargaMasiva(file);
                alert(mensaje);
            } catch (error) {
                console.error("Error al cargar el archivo:", error);
            }
        } else {
            console.log("No se ha seleccionado ningún archivo.");
        }
    };

    return ((<>
            <Container>
                <h2>Carga Masiva de Usuarios</h2>
                <Row className="d-flex justify-content-center align-items-center"style={{overflowY: 'scroll', minHeight: 'calc(100vh -  158px)'}}>
                  <Col md={{ span: 6 }}>
                    <form onSubmit={handleSubmit}>
                        <input type="file" onChange={handleFileChange} />
                        <button type="submit">Cargar Archivo</button>
                    </form>
                  </Col>
                </Row>
          </Container>
          </>)
    );
};

export default CargaMasiva;
