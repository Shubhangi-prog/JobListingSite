import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { LoaderProvider } from './contexts/LoaderContext.jsx'
import './App.css';
import 'flowbite';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LoaderProvider>
      <App />
    </LoaderProvider>
  </React.StrictMode>,
)