import {Row ,Table, Button} from 'react-bootstrap';
export default function TablaProductos({list, handleAsignar, handleDesasignar}){
    return (<>
    <Row style={{marginTop: '1cm'}}>
            <Table striped bordered hover size="sm">
              <thead >
                <tr>
                  <th>Nombre</th>
                  <th>Codigo</th>
                  <th>Talle</th>
                  <th>Color</th>
                  <th>Tienda</th>
                </tr>
              </thead>
              <tbody>
                {list.map((item, index) => (
                  <tr key={index} >
                    <td >{item.nombre}</td>
                    <td >{item.codigo}</td>
                    <td >{item.talle}</td>
                    <td >{item.color}</td>
                    <td >{item.tiendaCodigo}</td>
                    {!!handleAsignar ? 
                    <><td><Button onClick={()=>handleAsignar(item)}>+</Button></td> </>
                    :<><td><Button variant="outline-danger" onClick={()=>handleDesasignar(item)}>-</Button></td></>}
                   
                  </tr>
                     ))}
              </tbody>
            </Table>
          </Row>
        </>);
}