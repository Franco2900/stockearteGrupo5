import {Row ,Table, Button} from 'react-bootstrap';

export default function TablaOrdenCompra({list, handleAsignar, handleDesasignar, handleStockChange, stock}){

  

    return (<>
    <Row style={{marginTop: '1cm'}}>
            <Table striped bordered hover size="sm">
              <thead >
                <tr>
                  <th>Nombre</th>
                  <th>Codigo</th>
                  <th>Talle</th>
                  <th>Color</th>
                  <th>Stock</th>
                </tr>
              </thead>
              <tbody>
                {list.map((item, index) => (
                  <tr key={index} >
                    <td >{item.nombre}</td>
                    <td >{item.codigo}</td>
                    <td >{item.talle}</td>
                    <td >{item.color}</td>
                    {!!stock ?
                      <><td>
                      <input
                          type="number"
                          name="stock"
                          value={item.stock || 0}
                          onChange={(e) => handleStockChange(item.codigo, parseInt(e.target.value) || 0)}
                          style={{ width: '60px' }}
                      />
                    </td></>
                    :<><td>{item.stock}</td></>
                    }
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