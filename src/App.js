import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.scss';
import Burn from './components/pages/Burn';
import Home from './components/pages/Home';
import Claim from './components/pages/Claim/Claim';

function App() {
  return (
    <>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/burn'>
          <Burn />
        </Route>
        <Route exact path='/claim'>
          <Claim />
        </Route>
      </Switch>
    </>
  );
}

export default App;
