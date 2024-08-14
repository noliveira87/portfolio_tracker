import React, { useState } from 'react';
import axios from 'axios';
import './AddInvestmentType.css';

const AddInvestmentType = ({ onClose }) => {
    const [typeName, setTypeName] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!typeName) {
            setError('O nome do tipo de investimento é obrigatório.');
            return;
        }

        try {
            const response = await axios.post('/api/investment_types', { type_name: typeName });
            setTypeName('');
            setError('');
            setSuccess(response.data); // Mensagem de sucesso recebida do backend
        } catch (error) {
            console.error('Error adding investment type:', error);
            if (error.response && error.response.status === 400) {
                setError(error.response.data); // Mensagem de erro recebida do backend
            } else {
                setError('Erro ao adicionar o tipo de investimento. Verifique o console para mais detalhes.');
            }
        }
    };

    return (
        <div className="add-investment-type-container">
            <button className="close-button" onClick={onClose}>X</button>
            <h2>Tipo de Investimento</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="typeName">Nome do Tipo:</label>
                    <input
                        type="text"
                        id="typeName"
                        value={typeName}
                        onChange={(e) => setTypeName(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
                <button type="submit">Adicionar Tipo</button>
            </form>
        </div>
    );
};

export default AddInvestmentType;
