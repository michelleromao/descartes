import React from 'react';
import { Link } from 'react-router-dom';

import LogoDescartes from "../../assets/logo-descartes.png";
import About from "../../assets/about-icon.svg";
import App from "../../assets/app-icon.svg";
import Partner from "../../assets/partners-icon.svg";


import { Container, Content } from './styles';

function Header() {
  return (
    <Container>
      <Content>
        <div>
        <Link to="/" >
          <img src={LogoDescartes} alt="Logo Descartes" />
        </Link>

        </div>
        <div>
          <Link to="/#about" onClick={() => document.getElementById('about').scrollIntoView()}>
            <img src={About} alt="Sobre o Descartes" />
            <p>Sobre</p>
          </Link>
          <Link to="/#app" onClick={() => document.getElementById('app').scrollIntoView()}>
            <img src={App} alt="Aplicativo Descartes" />
            <p>Aplicativo</p>
          </Link>
          <Link to="/#partners" onClick={() => document.getElementById('partners').scrollIntoView()}>
            <img src={Partner} alt="Parceiros Descartes" />
            <p>Parceiros</p>
          </Link>
        </div>
      </Content>
    </Container>
  );
}

export default Header;
