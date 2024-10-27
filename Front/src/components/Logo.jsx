import React from 'react';
import styled from 'styled-components';

const LogoContainer = styled.div`
  display: inline-block;
  width: 60px;
  height: 60px;
  border-radius: 12px;
  
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.2); /* Sombra blanca */
  transition: transform 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: scale(0.95);
    box-shadow: 0 5px 15px rgba(255, 255, 255, 0.3); /* Sombra más oscura en hover */
  }
     h1 {
    color: #333; /* Color de texto */
    font-size: 30vh; /* Tamaño de fuente */
    font-weight: bold; /* Negrita */
    text-align: center; /* Centrado */
  }
`;

const Logo = () => {
  return (
    <LogoContainer className="h-100 d-flex justify-content-center align-items-center">      
      <h1>STOCKEARTE</h1>
    </LogoContainer>
  );
};

export default Logo;