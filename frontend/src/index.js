import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Importa o CSS global (opcional)

// Cria o root para renderizar a aplicação
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderiza o componente App dentro do root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
