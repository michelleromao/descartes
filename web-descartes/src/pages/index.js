import React from 'react';
import AboutSection from '../components/AboutSection';
import PartnersSection from '../components/PartnersSection';
import Header from '../components/Header';
import MapSection from '../components/MapSection';
import AppSection from '../components/AppSection';
import {FooterContainer} from '../components/Footer/index';

import { Container } from "./styles";


function App() {
  return (
    <Container>
      <Header />
      <MapSection />
      <AboutSection />
      <AppSection />
      <PartnersSection />
      <FooterContainer />
    </Container>
  );
}

export default App;
