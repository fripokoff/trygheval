import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HashRouter } from 'react-router-dom';
import App from './App';
import './globals.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <HashRouter>
    <App />
  </HashRouter>
);