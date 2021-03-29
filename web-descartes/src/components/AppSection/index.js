import React from 'react';
import App from "../../assets/banner/banner-app.png";



import { Container } from './styles';

function AppSection() {
  return (
    <Container id="app"> 
      <img src={App} alt="Aquira o aplicativo Descartes" />
    </Container>
  );
}

export default AppSection;
