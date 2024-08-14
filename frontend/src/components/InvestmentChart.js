import React from 'react';
import './InvestmentChart.css'; // Certifique-se de importar o CSS
import { Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement, LineElement, PointElement, CategoryScale, LinearScale);

const InvestmentChart = ({ investments, showValues }) => {
    const generateColors = (numColors) => {
        const colors = [];
        const startHue = 30; // Começa a partir de 30°, que é uma cor laranja clara.
        const hueStep = (360 - startHue) / numColors; // Distribui as cores no restante do espectro HSL
    
        for (let i = 0; i < numColors; i++) {
            const hue = (startHue + i * hueStep) % 360; // Calcula o matiz atual e garante que esteja dentro do intervalo de 0 a 360°
            colors.push(`hsl(${hue}, 70%, 50%)`);
        }
    
        return colors;
    };

    // Dados para o gráfico de pizza
    const pieData = {
        labels: investments.map(inv => inv.type_details.type_name),
        datasets: [{
            data: investments.map(inv => {
                // Garantir que o valor é um número
                return Number(inv.yearly_evolution[0].value) || 0;
            }),
            backgroundColor: generateColors(investments.length),
        }],
    };

    // Dados para o gráfico de linha
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    // Verifica se monthly_evolution existe e é um array
    const getMonthlyData = (monthly_evolution) => {
        return monthly_evolution.map(evo => {
            // Verifica se evo.month é uma string e converte para Date se necessário
            const monthDate = typeof evo.month === 'string' ? new Date(evo.month) : evo.month;
            return {
                month: monthDate,
                value: evo.value
            };
        });
    };

    // Filtra e formata os dados para o gráfico de linha
    const monthlyData = investments.flatMap(inv =>
        getMonthlyData(inv.monthly_evolution)
            .filter(evo => evo.month.getFullYear() === currentYear && evo.month.getMonth() === currentMonth)
            .map(evo => ({
                label: inv.type_details.type_name,
                value: evo.value
            }))
    );

    // Agrupa os valores por tipo de investimento
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

    const options = {
        plugins: {
            legend: {
                display: false, // Remover a legenda
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
            <Pie data={pieData} options={options} />
            <h2>Evolução do Mês Atual</h2>
            <Line data={lineData} options={options} />
        </div>
    );
};

export default InvestmentChart;
