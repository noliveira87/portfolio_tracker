import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditInvestmentsPage = () => {
  const [investimentos, setInvestimentos] = useState([]);
  const [editado, setEditado] = useState(null);

  useEffect(() => {
    fetchInvestimentos();
  }, []);

  const fetchInvestimentos = async () => {
    const response = await axios.get('/api/investimentos');
    setInvestimentos(response.data);
  };

  const handleEdit = (id) => {
    const investimento = investimentos.find((inv) => inv.id === id);
    setEditado(investimento);
  };

  const handleSave = async () => {
    await axios.put(`/api/investimentos/${editado.id}`, editado);
    setEditado(null);
    fetchInvestimentos();
  };

  return (
    <div>
      <h1>Editar Investimentos</h1>
      <table>
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Nome</th>
            <th>Quantidade</th>
            <th>Valor Investido</th>
            <th>Data</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {investimentos.map((inv) => (
            <tr key={inv.id}>
              <td>{inv.tipo}</td>
              <td>{inv.nome}</td>
              <td>{inv.quantidade}</td>
              <td>{inv.valor_investido}</td>
              <td>{new Date(inv.data).toLocaleDateString()}</td>
              <td>
                <button onClick={() => handleEdit(inv.id)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editado && (
        <div>
          <h2>Editar Investimento</h2>
          <form>
            <input
              type="text"
              value={editado.nome}
              onChange={(e) =>
                setEditado({ ...editado, nome: e.target.value })
              }
            />
            <input
              type="number"
              value={editado.quantidade}
              onChange={(e) =>
                setEditado({ ...editado, quantidade: e.target.value })
              }
            />
            <input
              type="number"
              value={editado.valor_investido}
              onChange={(e) =>
                setEditado({ ...editado, valor_investido: e.target.value })
              }
            />
            <button type="button" onClick={handleSave}>
              Guardar
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditInvestmentsPage;
