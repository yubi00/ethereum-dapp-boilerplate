import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Web3Provider from './providers/Web3Provider';

ReactDOM.render(
  <Web3Provider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Web3Provider>,
  document.getElementById('root')
);
