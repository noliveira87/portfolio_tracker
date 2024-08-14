import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DashboardPage.css';
import InvestmentTable from '../components/InvestmentTable';
import InvestmentChart from '../components/InvestmentChart';
import AddInvestmentType from './AddInvestmentType';
import AddSavings from './AddSavings';

const DashboardPage = ({ showForm, showSavingsForm, showValues, handleCloseForm }) => {
    const [investments, setInvestments] = useState([]);

    useEffect(() => {
        fetchInvestments();
    }, []);

    const fetchInvestments = () => {
        axios.get('/api/investments')
            .then(response => setInvestments(response.data))
            .catch(error => {
                console.error('Error fetching investments:', error);
            });
    };

    return (
        <div className="dashboard-page">
            <div className="main-content">
                <h1>Portfolio Tracker</h1>
                <InvestmentTable investments={investments} showValues={showValues} />
                <InvestmentChart investments={investments} showValues={showValues} />
                {showForm && <AddInvestmentType onClose={handleCloseForm} />}
                {showSavingsForm && <AddSavings onClose={handleCloseForm} onSuccess={fetchInvestments} />}
            </div>
        </div>
    );
};

export default DashboardPage;
