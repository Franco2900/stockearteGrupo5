import {Row ,Table, Button} from 'react-bootstrap';
export default function TablaOrdenItems({list}){
    return (<>
    <Row style={{marginTop: '1cm'}}>
            <Table striped bordered hover size="sm">
              <thead >
                <tr>
                  <th>Codigo</th>
                  <th>Talle</th>
                  <th>Color</th>
                  <th>Cantidad</th>
                </tr>
              </thead>
              <tbody>
                {list.map((item, index) => (
                  <tr key={index} >
                    <td >{item.productoCodigo}</td>
                    <td >{item.talle}</td>
                    <td >{item.color}</td>
                    <td >{item.cantidadSolicitada}</td>                   
                  </tr>
                     ))}
              </tbody>
            </Table>
          </Row>
        </>);
}