import React, { useState, useEffect } from 'react';
import './DashboardPage.css';
import InvestmentTable from '../components/InvestmentTable';
import InvestmentChart from '../components/InvestmentChart';
import axios from 'axios';

const DashboardPage = () => {
    const [investments, setInvestments] = useState([]);
    const [showValues, setShowValues] = useState(true);  // Estado para o toggle

    useEffect(() => {
        // Fetch investments data
        axios.get('/api/investments')
            .then(response => setInvestments(response.data))
            .catch(error => {
                console.error('Error fetching investments:', error);
            });
    }, []);

    const handleToggleChange = () => {
        setShowValues(prev => !prev); // Alterna o estado de showValues
    };

    return (
        <div>
            <div className="toggle-switch">
                <input 
                    type="checkbox" 
                    id="toggle"
                    checked={showValues}
                    onChange={handleToggleChange}
                />
                <label htmlFor="toggle" className="slider"></label>
                <span className="toggle-label">
                    {showValues ? 'Mostrar Valores' : 'Ocultar Valores'}
                </span>
            </div>
            <InvestmentTable investments={investments} showValues={showValues} />
            <InvestmentChart investments={investments} showValues={showValues} />
        </div>
    );
};

export default DashboardPage;
