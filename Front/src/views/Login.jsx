import { Container, Col, Row} from 'react-bootstrap';
import FormLogin from "../components/FormLogin"

export default function Login(){

    return(
    <Container>
      <Row className="d-flex justify-content-center align-items-center vh-100">
        <Col md={{ span: 4 }}>
          <FormLogin></FormLogin>
        </Col>
      </Row>
    </Container>
     
    )
}