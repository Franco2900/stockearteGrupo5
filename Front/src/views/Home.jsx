import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import React, { useContext , useState, useEffect} from "react";
import UserContext from "../context/Context";
import ListCardProductos from "../components/ListCardProductos";
import Logo from "../components/Logo.jsx";


function Home() {
  return (
    <>      
      <section>
        <Container fluid className="h-100 d-flex justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 112px)' }}>
          <Logo />
        </Container>
      </section>
    </>
  );
}

export default Home;
