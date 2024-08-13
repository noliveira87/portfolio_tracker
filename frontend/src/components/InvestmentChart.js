import React from 'react';
import './InvestmentChart.css'; // Certifique-se de importar o CSS
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const InvestmentChart = ({ investments, showValues }) => {
    const data = {
        labels: investments.map(inv => inv.type_details.type_name), 
        datasets: [{
            data: investments.map(inv => Number(inv.yearly_evolution[0].value) || 0),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        }],
    };

    const options = {
        plugins: {
            legend: {
                position: 'right',
                align: 'center',
            },
            tooltip: {
                enabled: showValues,
                callbacks: {
                    label: function (tooltipItem) {
                        const value = tooltipItem.raw.toLocaleString('pt-PT', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                        return showValues ? `${tooltipItem.label}: ${value}€` : '';
                    }
                }
            }
        },
        layout: {
            padding: {
                right: 20,
            }
        }
    };

    return (
        <div className="investment-chart-container">
            <h2>Distribuição do Portfólio</h2>
            <Pie data={data} options={options} />
        </div>
    );
};

export default InvestmentChart;
