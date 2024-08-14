// DashboardPage.js
import React, { useState, useEffect } from 'react';
import './DashboardPage.css';
import InvestmentTable from '../components/InvestmentTable';
import InvestmentChart from '../components/InvestmentChart';
import AddInvestmentType from './AddInvestmentType';
import axios from 'axios';

const DashboardPage = ({ showForm }) => {
  const [investments, setInvestments] = useState([]);

  useEffect(() => {
    // Fetch investments data
    axios.get('/api/investments')
      .then(response => setInvestments(response.data))
      .catch(error => {
        console.error('Error fetching investments:', error);
      });
  }, []);

  return (
    <div className="dashboard-page">
      <h1>Portfolio Tracker</h1>
      <div className="main-content">
        <InvestmentTable investments={investments} />
        <InvestmentChart investments={investments} />
        {showForm && <AddInvestmentType />}
      </div>
    </div>
  );
};

export default DashboardPage;
