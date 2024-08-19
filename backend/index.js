const express = require('express');
const mongoose = require('mongoose');
const { InvestmentType, Investment, Savings } = require('./models/models');

const app = express();
const port = 3000;

mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Conectado ao MongoDB com sucesso'))
.catch(err => console.error('Erro ao conectar ao MongoDB', err));

app.use(express.json());

// Rota para obter todos os investimentos, com detalhes dos tipos de investimento
app.get('/api/investments', async (req, res) => {
  try {
    const investments = await Investment.aggregate([
      {
        $lookup: {
          from: 'investment_types',
          localField: 'type_id',
          foreignField: '_id',
          as: 'type_details'
        }
      },
      {
        $unwind: '$type_details'
      },
      {
        $project: {
          name: 1,
          type_id: 1,
          monthly_evolution: 1,
          yearly_evolution: 1,
          type_details: { type_name: 1 }
        }
      }
    ]);

    res.json(investments);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Rota para adicionar um novo investimento
app.post('/api/investments', async (req, res) => {
  const { name, type_id, monthly_evolution, yearly_evolution } = req.body;
  try {
    const type = await InvestmentType.findById(type_id);
    if (!type) {
      return res.status(400).send('Tipo de investimento não encontrado.');
    }
    const newInvestment = new Investment({ name, type_id, monthly_evolution, yearly_evolution });
    await newInvestment.save();
    res.status(201).send('Investimento adicionado com sucesso!');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Rota para obter todos os tipos de investimento
app.get('/api/investment_types', async (req, res) => {
  try {
    const types = await InvestmentType.find(); // Consulta à coleção 'investment_types'
    res.json(types);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Adiciona um novo tipo de investimento
app.post('/api/investment_types', async (req, res) => {
  const { type_name } = req.body;

  if (!type_name) {
    return res.status(400).send('O nome do tipo de investimento é obrigatório.');
  }

  try {
    // Verifica se o tipo de investimento já existe
    const existingType = await InvestmentType.findOne({ type_name });
    if (existingType) {
      return res.status(400).send('Tipo de investimento já existe.');
    }

    // Cria um novo tipo de investimento
    const newType = new InvestmentType({ type_name });
    await newType.save();
    res.status(201).send('Tipo de investimento adicionado com sucesso!');
  } catch (error) {
    console.error('Error adding investment type:', error);
    res.status(500).send('Erro ao adicionar o tipo de investimento.');
  }
});

// Rota para adicionar um novo saving
app.post('/api/savings', async (req, res) => {
  const { type_id, amount } = req.body;

  try {
    // Verificar se o investment já existe para o tipo de investimento
    let investment = await Investment.findOne({ type_id });

    if (!investment) {
      // Se não existir, criar um novo investment com o tipo de investimento
      investment = new Investment({
        name: `Investment for ${type_id}`,
        type_id,
        monthly_evolution: [],
        yearly_evolution: []
      });
      await investment.save();
    }

    // Data exata do dia
    const today = new Date();
    const month = today.getMonth() + 1; // Mês atual
    const year = today.getFullYear(); // Ano atual

    // Atualizar a evolução mensal
    investment.monthly_evolution.push({
      month: today, // Usa a data exata do dia
      value: parseFloat(amount)
    });

    // Atualizar a evolução anual
    const yearlyIndex = investment.yearly_evolution.findIndex(ye => ye.year === year);
    if (yearlyIndex > -1) {
      investment.yearly_evolution[yearlyIndex].value += parseFloat(amount);
    } else {
      investment.yearly_evolution.push({
        year,
        value: parseFloat(amount)
      });
    }

    await investment.save();

    res.status(201).send('Saving adicionado com sucesso!');
  } catch (error) {
    console.error('Error adding savings:', error);
    res.status(500).send('Erro ao adicionar saving.');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
