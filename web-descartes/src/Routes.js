import React from 'react';
import { Route } from 'react-router-dom';
import Index from './pages/index';

function Routes() {
  return (
    <>
     <Route exact path="/" component={Index} />
    </>
  )
}
export default Routes;