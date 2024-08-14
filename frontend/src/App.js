import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import DashboardPage from './pages/DashboardPage';
import Menu from './components/Menu';

function App() {
  const [showValues, setShowValues] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showSavingsForm, setShowSavingsForm] = useState(false);

  const handleToggleChange = () => {
    setShowValues(prev => !prev);
  };

  const handleAddInvestmentType = () => {
    setShowForm(true);
    setShowSavingsForm(false);
  };

  const handleAddSavings = () => {
    setShowSavingsForm(true);
    setShowForm(false);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setShowSavingsForm(false);
  };

  return (
    <Router>
      <div className="App">
        <div className="header">
          <div className="menu-toggle-container">
            <div className="toggle-switch">
              <label className="switch">
                <input 
                  type="checkbox" 
                  id="toggle"
                  checked={showValues}
                  onChange={handleToggleChange}
                />
                <span className="slider"></span>
              </label>
              <span className="toggle-label">
                {showValues ? 'Mostrar Valores' : 'Ocultar Valores'}
              </span>
            </div>
            <Menu 
              onAddInvestmentType={handleAddInvestmentType} 
              onAddSavings={handleAddSavings} 
            />
          </div>
        </div>
        <Routes>
          <Route 
            path="/" 
            element={<DashboardPage 
              showForm={showForm} 
              showSavingsForm={showSavingsForm} 
              showValues={showValues} 
              handleCloseForm={handleCloseForm} 
            />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
