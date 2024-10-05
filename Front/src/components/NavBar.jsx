import { Button, Container, Col, Nav, NavDropdown, Navbar} from 'react-bootstrap';
import React, { useContext, useEffect ,useState} from "react"
import UserContext from "../context/Context.jsx"

function NavBar() {
  const { user } = useContext(UserContext);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isCentralUser, setIsCentralUser] = useState(false);
  
  //console.log("NAVBAR USER: "+JSON.stringify(user))
  useEffect(() => {
    
    setIsUserLoggedIn( user?.isUserLoggedIn);
    setIsCentralUser(user?.central);
  }, [user]);

  const handleLogout = () => {
    const userData = {
      usuario : '',
      tiendaCodigo :'',
      central: false ,
      isUserLoggedIn : false
    }
    localStorage.setItem("user", JSON.stringify(userData));
    window.location.href = '/';
  }


  //console.log("LOGGED USER ?: "+isUserLoggedIn)
  //console.log("CENTRRAL USER ?: "+isCentralUser)
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">Stockearte</Navbar.Brand>
          {isUserLoggedIn && (
            <>
              <Nav className="me-auto">
                {isCentralUser && (
                  <>
                    <NavDropdown title="Tiendas" id="basic-nav-dropdown">
                      <NavDropdown.Item href="/buscartiendas">Buscar</NavDropdown.Item>
                      <NavDropdown.Item href="/crearTienda">Crear</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Usuarios" id="basic-nav-dropdown">
                      <NavDropdown.Item href="/buscarusuarios">Buscar</NavDropdown.Item>
                      <NavDropdown.Item href="/crearUsuario">Crear</NavDropdown.Item>
                    </NavDropdown>
                  </>
                )}

                <NavDropdown title="Productos" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/buscarproductos">Buscar</NavDropdown.Item>
                  {isCentralUser && ( <NavDropdown.Item href="/crearproducto">Crear</NavDropdown.Item> )}
                </NavDropdown>

                {/*{!isCentralUser && ( */}
                {isCentralUser && ( 
                  <>
                    <NavDropdown title="Ordenes" id="basic-nav-dropdown">
                      <NavDropdown.Item href="/buscarordenes">Buscar</NavDropdown.Item>
                      <NavDropdown.Item href="/crearupdorden">Crear</NavDropdown.Item>
                    </NavDropdown>
                  </>
                )}
                
                {isCentralUser && ( <> <Nav.Link href="/novedades">Novedades</Nav.Link> </> )}
              </Nav>
            </>
          )}
          <Col></Col>
          {isUserLoggedIn ? (
            <Button className="btn border-light" variant="secondary" onClick={handleLogout}>
              Salir
            </Button>
          ) : (
            <Button variant="primary" href="/login">
              Ingresar
            </Button>
          )}
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;