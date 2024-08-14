import React from 'react';
import './InvestmentChart.css'; // Certifique-se de importar o CSS
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const InvestmentChart = ({ investments, showValues }) => {
    const generateColors = (numColors) => {
        const colors = [];
        for (let i = 0; i < numColors; i++) {
            colors.push(`hsl(${(i * 360 / numColors)}, 70%, 50%)`);
        }
        return colors;
    };

    const data = {
        labels: investments.map(inv => inv.type_details.type_name), 
        datasets: [{
            data: investments.map(inv => Number(inv.yearly_evolution[0].value) || 0),
            backgroundColor: generateColors(investments.length),
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
        <div className="investment-chart-container container">
            <h2>Distribuição do Portfólio</h2>
            <Pie data={data} options={options} />
        </div>
    );
};

export default InvestmentChart;
