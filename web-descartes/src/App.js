import React from 'react';
import { BrowserRouter} from 'react-router-dom';
import Routes from './Routes';

import { GlobalStyle } from "./styles/globalStyle";


function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes />
    </BrowserRouter>
  );
}

export default App;
