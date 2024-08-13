import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EditInvestmentsPage from './pages/EditInvestmentsPage';
import './App.css'; // Importa o CSS específico para o App
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Portfolio Tracker</h1>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/edit" element={<EditInvestmentsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
