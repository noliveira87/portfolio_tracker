import React, { useState, useEffect } from 'react';
import './DashboardPage.css';
import InvestmentTable from '../components/InvestmentTable';
import InvestmentChart from '../components/InvestmentChart';
import AddInvestmentType from './AddInvestmentType'; // Importe o formulário
import axios from 'axios'; // Adicione esta linha para importar axios

const DashboardPage = ({ showForm, showValues }) => {
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
            <div className="main-content">
                <h1>Portfolio Tracker</h1>
                <InvestmentTable investments={investments} showValues={showValues} />
                <InvestmentChart investments={investments} showValues={showValues} />
                {showForm && <AddInvestmentType />}
            </div>
        </div>
    );
};

export default DashboardPage;
