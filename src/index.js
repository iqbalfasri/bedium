import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import App from './App';
import registerServiceWorker, { unregister } from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  (<BrowserRouter>
    <App />
  </BrowserRouter>
  ), document.getElementById('root')
);
unregister();
