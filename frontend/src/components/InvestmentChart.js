import React from 'react';
import './InvestmentChart.css';
import { Pie, Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, LineElement, PointElement, CategoryScale, LinearScale, BarElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement, LineElement, PointElement, CategoryScale, LinearScale, BarElement);

const InvestmentChart = ({ investments, showValues }) => {
    const generateColors = (numColors) => {
        const colors = [];
        const startHue = 30;
        const hueStep = (360 - startHue) / numColors;
    
        for (let i = 0; i < numColors; i++) {
            const hue = (startHue + i * hueStep) % 360;
            colors.push(`hsl(${hue}, 70%, 50%)`);
        }
    
        return colors;
    };

    const pieData = {
        labels: investments.map(inv => inv.type_details.type_name),
        datasets: [{
            data: investments.map(inv => Number(inv.yearly_evolution[0].value) || 0),
            backgroundColor: generateColors(investments.length),
        }],
    };

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const getMonthlyData = (monthly_evolution) => {
        return monthly_evolution.map(evo => ({
            month: new Date(evo.month),
            value: evo.value
        }));
    };

    const monthlyData = investments.flatMap(inv =>
        getMonthlyData(inv.monthly_evolution)
            .filter(evo => evo.month.getFullYear() === currentYear && evo.month.getMonth() === currentMonth)
            .map(evo => ({
                label: inv.type_details.type_name,
                value: evo.value
            }))
    );

    const groupedData = monthlyData.reduce((acc, item) => {
        if (!acc[item.label]) {
            acc[item.label] = 0;
        }
        acc[item.label] += item.value;
        return acc;
    }, {});

    const lineData = {
        labels: Object.keys(groupedData),
        datasets: [{
            label: 'Evolução do Mês Atual',
            data: Object.values(groupedData),
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
        }],
    };

    // Agregando os valores anuais dos investimentos
    const annualData = investments.flatMap(inv =>
        inv.yearly_evolution.map(evo => ({
            year: evo.year,
            value: evo.value
        }))
    );

    const aggregatedAnnualData = annualData.reduce((acc, item) => {
        if (!acc[item.year]) {
            acc[item.year] = 0;
        }
        acc[item.year] += item.value;
        return acc;
    }, {});

    const barData = {
        labels: Object.keys(aggregatedAnnualData),
        datasets: [{
            label: 'Património Total por Ano',
            data: Object.values(aggregatedAnnualData),
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1,
        }],
    };

    const options = {
        plugins: {
            legend: {
                display: false,
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
        <div className="investment-charts-container">
            <h2>Distribuição do Portfólio</h2>
            <div className="charts-container">
                <div className="chart">
                    <h3>Distribuição do Portfólio</h3>
                    <Pie data={pieData} options={options} />
                </div>
                <div className="chart">
                    <h3>Evolução do Mês Atual</h3>
                    <Line data={lineData} options={options} />
                </div>
                <div className="chart">
                    <h3>Total por Ano</h3>
                    <Bar data={barData} options={options} />
                </div>
            </div>
        </div>
    );
};

export default InvestmentChart;
