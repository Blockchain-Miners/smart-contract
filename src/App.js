import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.scss';
import Claim from './components/pages/Claim/Claim';
import Home from './components/pages/Home';

function App() {
  return (
    <>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/claim'>
          <Claim />
        </Route>
      </Switch>
    </>
  );
}

export default App;
