import { Row, Col, Form, Button,Modal} from "react-bootstrap";
import React, { useCallback, useEffect ,useState} from "react"

export default function FiltroProd({f, crear, verInforme}) {
  const [filter, setFilter] = useState({
    nombre : f.nombre,
    producto_codigo : f.producto_codigo,
    tienda_codigo: f.tienda_codigo,
    fecha_inicio: f.fecha_inicio,
    fecha_final: f.fecha_final,
    estado: f.estado,
  });
  const [opcMod, setOpcMod] = useState(true);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    setFilter({
      nombre: f.nombre,
      producto_codigo: f.producto_codigo,
      tienda_codigo: f.tienda_codigo,
      fecha_inicio: f.fecha_inicio,
      fecha_final: f.fecha_final,
      estado: f.estado,
    });
  }, [f]);
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilter((prevFilter) => {
      const updatedFilter = { ...prevFilter, [name]: value };
      console.log("Filtro actualizado:", JSON.stringify(updatedFilter)); // Imprime el filtro actualizado en cada cambio
      return updatedFilter;
    });
  };
  const handleOpcMod = useCallback((c) => {
    setOpcMod(c);
    if (c) {setFilter(f)}
  }, [f]);
  const handleModificar = useCallback(() => {
    console.log("Aplicando modificaciones...",JSON.stringify(filter));
  }, [filter]);

  const handleCrear = () => {
    if (!filter.nombre.trim()) {
      alert("Asigne un NOMBRE al filtro."); // Muestra una alerta si no hay nombre
      return;
    }
    crear(filter);
  };
  
  const handleEliminar = useCallback((filtro) => {
    console.log("Aplicando modificaciones...", filtro);
  }, []);

  return (
    <>
      {/*FILTRO DE BUSQUEDA */}
      <Row>
        <Col >
          <Form.Group controlId="nombre">
            {crear && <>
            <Form.Label>Nombre</Form.Label>
            <Form.Control 
              type="text"
              name="nombre"
              value={filter.nombre}
              required
              onChange={handleFilterChange}
            /></>}            
          </Form.Group>
          {!crear && <><Button className="Fijar" onClick={() => verInforme(f)}>{f.nombre}</Button> </>}
        </Col>
        <Col >
          <Form.Group controlId="producto_codigo" >
          {crear &&<Form.Label>Código</Form.Label>}
            <Form.Control
              type="text"
              name="producto_codigo"
              value={filter.producto_codigo}
              onChange={handleFilterChange}
              disabled={!crear && opcMod}
            />
          </Form.Group>
        </Col>
        {true && <>
        <Col >
          <Form.Group controlId="tienda_codigo" >
          {crear &&<Form.Label>Tienda</Form.Label>}
            <Form.Control
              type="text"
              name="tienda_codigo"
              value={filter.tienda_codigo}
              onChange={handleFilterChange}
              disabled={!crear && opcMod}
            />
          </Form.Group>
        </Col>
        </>}
        <Col>
          <Form.Group controlId="estado" >
          {crear &&<Form.Label>Estado</Form.Label>}
          <Form.Select
             name="estado"
             value={filter.estado}
             onChange={handleFilterChange}
             required 
             disabled={!crear && opcMod}>
             <option value="RECIBIDA">RECIBIDA</option>
             <option value="RECHAZADA">RECHAZADA</option>
             <option value="SOLICITADA">SOLICITADA</option>
             <option value="ACEPTADA">ACEPTADA</option>
           </Form.Select>
          </Form.Group>
        </Col>
        <Col >
          <Form.Group controlId="fecha_inicio">
          {crear &&<Form.Label>Desde</Form.Label>}
            <Form.Control
              type="date"
              name="fecha_inicio"
              value={filter.fecha_inicio}
              onChange={handleFilterChange}
              disabled={!crear && opcMod}
            />
          </Form.Group>
        </Col>
        <Col >
          <Form.Group controlId="fecha_final" >
          {crear &&<Form.Label>Hasta</Form.Label>}
            <Form.Control
              type="date"
              name="fecha_final"
              value={filter.fecha_final}
              onChange={handleFilterChange}
              disabled={!crear && opcMod}
            />
          </Form.Group>
        </Col>
        
        <Col className="d-flex justify-content-center align-items-center">
        {crear && <><Button variant="outline-success" onClick={handleCrear}><i className="bi bi-plus-square-fill"></i></Button> </>}
        {!crear && <> <Col>
                    {opcMod ? <>
                      <Button onClick={() => handleOpcMod(false)}><i className="bi bi-pencil-square"></i></Button></>
                        :<>
                        <i className="bi bi-pencil-square"></i>
                        <Button variant="success" onClick={ handleModificar}><i className="bi bi-check-square"></i></Button>
                        <Button variant="danger"onClick={() => handleOpcMod(true)}><i className="bi bi-arrow-left-square"></i></Button></>}
                    <Button variant="outline-danger" onClick={handleShow}><i className="bi bi-trash"></i></Button>
                     
                </Col>
                
                <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Eliminar Filtro</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}><i className="bi bi-arrow-left-square"></i></Button>
                  <Button variant="danger" onClick={handleEliminar}><i className="bi bi-trash"></i>{" "}Eiminar</Button>
                </Modal.Footer>
                </Modal>

               </> }
            </Col>
      </Row>
    </>
  );
};