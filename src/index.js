import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import App from './App';
import registerServiceWorker, { unregister } from './registerServiceWorker';
import { BrowserRouter, HashRouter } from 'react-router-dom';

ReactDOM.render(
  (<HashRouter>
    <App />
  </HashRouter>
  ), document.getElementById('root')
);
unregister();
