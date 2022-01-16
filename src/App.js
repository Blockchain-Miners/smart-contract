import React from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';

import './App.scss';

import Home from './components/pages/Home';
import Burn from './components/pages/Burn';
import Navigation from './components/blockComponent/Navigation';

function App() {
	return (
		<>
			<Switch>
				<Route exact path="/">
					<Home />
				</Route>
				<Route path="/burn">
					<Burn />
				</Route>
			</Switch>
		</>
	);
}

export default App;
