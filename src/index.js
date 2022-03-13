import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import App from './App';
import { CoinContextProvider } from './contexts/CoinContext';
import history from './history';
import store from './redux/store';
import reportWebVitals from './reportWebVitals';

// import "./styles/reset.css";

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <CoinContextProvider>
        <App />
      </CoinContextProvider>
    </Router>
  </Provider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
