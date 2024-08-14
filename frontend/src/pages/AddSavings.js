import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddSavings.css';

const AddSavings = () => {
  const [amount, setAmount] = useState('');
  const [investmentTypeId, setInvestmentTypeId] = useState('');
  const [investmentTypes, setInvestmentTypes] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    axios.get('/api/investment_types')
      .then(response => setInvestmentTypes(response.data))
      .catch(error => console.error('Error fetching investment types:', error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || isNaN(amount) || amount <= 0) {
      setError('Por favor, insira um valor válido.');
      return;
    }

    if (!investmentTypeId) {
      setError('Por favor, selecione um tipo de investimento.');
      return;
    }

    try {
      const response = await axios.post('/api/investments', { amount, type_id: investmentTypeId });
      setAmount('');
      setInvestmentTypeId('');
      setError('');
      setSuccess(response.data);
    } catch (error) {
      console.error('Erro ao adicionar valor:', error);
      setError('Erro ao adicionar valor. Verifique o console para mais detalhes.');
    }
  };

  return (
    <div className="add-savings-container">
      <h2>Adicionar Valor a Aforro</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Valor:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </label>
        <label>
          Tipo de Investimento:
          <select
            value={investmentTypeId}
            onChange={(e) => setInvestmentTypeId(e.target.value)}
            required
          >
            <option value="">Selecione um tipo de investimento</option>
            {investmentTypes.map(type => (
              <option key={type._id} value={type._id}>
                {type.type_name}
              </option>
            ))}
          </select>
        </label>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <button type="submit">Adicionar</button>
      </form>
    </div>
  );
};

export default AddSavings;
