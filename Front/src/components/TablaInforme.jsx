import {Row ,Table, Button} from 'react-bootstrap';
export default function TablaInforme({list}){
    return (
      <>
        <Row >
          <Table striped bordered hover size="sm">
            
              <thead>
                <tr>
                  <th>Estado</th>
                  <th>Observaciones</th>
                  <th>Fecha de Solicitud</th>
                  <th>Fecha de Recepción</th>
                  <th>Tienda Código</th>
                  <th>Producto Código</th>
                  <th>Cantidad Solicitada</th>
                </tr>
              </thead>
              <tbody>
                {list.map((item, index) => (
                  <tr key={index}>
                    <td>{item.estado}</td>
                    <td>{item.observaciones}</td>
                    <td>
                      {new Date(item.fecha_de_solicitud).toLocaleDateString()}
                    </td>
                    <td>
                      {item.fecha_de_recepcion
                        ? new Date(item.fecha_de_recepcion).toLocaleDateString()
                        : "No definida"}
                    </td>
                    <td>{item.tienda_codigo}</td>
                    <td>{item.producto_codigo}</td>
                    <td>{item.cantidad_solicitada}</td>
                  </tr>
                ))}
              </tbody>
            
          </Table>
        </Row>
      </>
    );
};