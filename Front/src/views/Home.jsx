import Container from "react-bootstrap/Container";
import React from "react";
import Logo from "../components/Logo.jsx";

function Home() {
  return (
    <>      
      <section>
        <Container className="h-100 d-flex justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 112px)' }}>
          <Logo />
        </Container>
      </section>
    </>
  );
}

export default Home;
