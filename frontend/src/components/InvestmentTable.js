// InvestmentTable.js
import React from 'react';
import './InvestmentTable.css'; // Importe o arquivo CSS

const InvestmentTable = ({ investments, showValues }) => {
    return (
        <div className="investment-table-container">
            <table className="investment-table">
                <thead>
                    <tr>
                        <th>Nome do Investimento</th>
                        <th>Tipo de Investimento</th>
                        <th>Valor Total</th>
                    </tr>
                </thead>
                <tbody>
                    {investments.map((investment, index) => {
                        const totalValue = Number(investment.totalvalue) || 0;
                        return (
                            <tr key={index}>
                                <td>{investment.name || 'N/A'}</td>
                                <td>{investment.type || 'N/A'}</td>
                                <td>
                                {showValues ? `${totalValue.toLocaleString('pt-PT', { minimumFractionDigits: 2, maximumFractionDigits: 20 })}€` : '****'}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default InvestmentTable;
