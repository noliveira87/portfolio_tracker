import React, { useState, useEffect } from 'react';
import './DashboardPage.css';
import InvestmentTable from '../components/InvestmentTable';
import InvestmentChart from '../components/InvestmentChart';
import AddInvestmentType from './AddInvestmentType';
import axios from 'axios';

const DashboardPage = ({ showForm, showValues, handleCloseForm }) => {
    const [investments, setInvestments] = useState([]);
    const [formVisible, setFormVisible] = useState(showForm);

    useEffect(() => {
        axios.get('/api/investments')
            .then(response => setInvestments(response.data))
            .catch(error => {
                console.error('Error fetching investments:', error);
            });
    }, []);

    useEffect(() => {
        setFormVisible(showForm);
    }, [showForm]);

    return (
        <div className="dashboard-page">
            <div className="main-content">
                <h1>Portfolio Tracker</h1>
                <InvestmentTable investments={investments} showValues={showValues} />
                <InvestmentChart investments={investments} showValues={showValues} />
                {formVisible && <AddInvestmentType onClose={handleCloseForm} />}
            </div>
        </div>
    );
};

export default DashboardPage;
