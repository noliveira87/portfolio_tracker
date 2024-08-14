// src/pages/AddSavings.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddSavings.css';

const AddSavings = ({ onClose, onSuccess }) => {
    const [investmentTypes, setInvestmentTypes] = useState([]);
    const [selectedType, setSelectedType] = useState('');
    const [amount, setAmount] = useState('');

    useEffect(() => {
        axios.get('/api/investment_types')
            .then(response => setInvestmentTypes(response.data))
            .catch(error => {
                console.error('Error fetching investment types:', error);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/savings', { type_id: selectedType, amount })
            .then(() => {
                if (onSuccess) onSuccess();  // Notifica o sucesso
                onClose();
            })
            .catch(error => {
                console.error('Error adding savings:', error);
                alert('Erro ao adicionar saving');
            });
    };

    return (
        <div className="add-savings-container">
            <button className="close-button" onClick={onClose}>X</button>
            <h2>Adicionar Savings</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Tipo de Investimento:
                    <select 
                        value={selectedType} 
                        onChange={(e) => setSelectedType(e.target.value)} 
                        required
                    >
                        <option value="">Selecione um tipo</option>
                        {investmentTypes.map(type => (
                            <option key={type._id} value={type._id}>
                                {type.type_name}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Valor:
                    <input 
                        type="number" 
                        value={amount} 
                        onChange={(e) => setAmount(e.target.value)} 
                        required 
                    />
                </label>
                <button type="submit">Adicionar</button>
            </form>
        </div>
    );
};

export default AddSavings;
