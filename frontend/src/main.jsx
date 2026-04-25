/**
 * File: frontend/src/main.jsx
 * Purpose: Boots the React public website into the browser.
 * Features: React StrictMode, BrowserRouter, App mount, and global CSS import.
 * Used by: frontend/index.html.
 * Future edits: Add analytics providers, theme providers, or app-wide context here.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
