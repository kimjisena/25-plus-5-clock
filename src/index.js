import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const state = {
  counter: 1500,
  session: 1500,
  break: 300,
  active: 'Session',
  disabled: false,
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App initState={state} />
  </React.StrictMode>
);