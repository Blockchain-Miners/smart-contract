import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.scss';
import Burn from './components/pages/Burn';
import Home from './components/pages/Home';

function App() {
  return (
    <>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/burn'>
          <Burn />
        </Route>
      </Switch>
    </>
  );
}

export default App;
