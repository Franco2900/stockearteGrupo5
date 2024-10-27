import Container from "react-bootstrap/Container";
import React from "react";

function Home() {
  return (
    <>      
      <section>
        <Container className="h-100 d-flex justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 112px)' }}>
          <div className="logo-container h-100 d-flex justify-content-center align-items-center">      
             <h1>STOCKEARTE</h1>
          </div>
        </Container>
      </section>
    </>
  );
}

export default Home;
