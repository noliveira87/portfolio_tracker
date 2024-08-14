import React from 'react';
import './InvestmentTable.css'; // Importe o arquivo CSS

const InvestmentTable = ({ investments, showValues }) => {
    return (
        <div className="investment-table-container container">
            <table className="investment-table">
                <thead>
                    <tr>
                        <th>Tipo de Investimento</th>
                        <th>Valor Total</th>
                    </tr>
                </thead>
                <tbody>
                    {investments.map((investment, index) => {
                        // Assumindo que o valor total seja derivado de `yearly_evolution`
                        const totalValue = (investment.yearly_evolution && investment.yearly_evolution[0]?.value) || 0;

                        return (
                            <tr key={index}>
                                <td>{investment.type_details?.type_name || 'N/A'}</td>
                                <td>
                                    {showValues ? `${totalValue.toLocaleString('pt-PT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}€` : '****'}
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
