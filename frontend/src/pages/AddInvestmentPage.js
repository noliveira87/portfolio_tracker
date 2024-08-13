import React, { useState } from 'react';
import axios from 'axios';

const AddInvestmentPage = () => {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [value, setValue] = useState('');
    const [date, setDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/investments', { name, type, value, date })
            .then(response => {
                alert('Investimento adicionado com sucesso!');
                // Clear form or redirect
            })
            .catch(error => console.error('Error adding investment:', error));
    };

    return (
        <div>
            <h1>Adicionar Investimento</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Nome:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </label>
                <label>
                    Tipo:
                    <input type="text" value={type} onChange={(e) => setType(e.target.value)} required />
                </label>
                <label>
                    Valor:
                    <input type="number" value={value} onChange={(e) => setValue(e.target.value)} required />
                </label>
                <label>
                    Data:
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                </label>
                <button type="submit">Adicionar Investimento</button>
            </form>
        </div>
    );
};

export default AddInvestmentPage;
