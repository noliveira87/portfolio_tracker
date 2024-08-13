const express = require('express');
const mongoose = require('mongoose');
const { InvestmentType, Investment } = require('./models/models');

const app = express();
const port = 3000;

// Conectar ao MongoDB
mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Conectado ao MongoDB com sucesso'))
.catch(err => console.error('Erro ao conectar ao MongoDB', err));

app.use(express.json());

app.get('/api/investments', async (req, res) => {
  try {
    const investments = await Investment.aggregate([
      {
        $lookup: {
          from: 'investment_types',       // Nome da coleção relacionada
          localField: 'type_id',          // Campo em `investments` que referencia o `investment_types`
          foreignField: '_id',            // Campo em `investment_types` para fazer a junção
          as: 'type_details'              // Nome do campo onde os dados relacionados serão armazenados
        }
      },
      {
        $unwind: '$type_details'          // Garante que o campo `type_details` não seja um array, mas um objeto único
      }
    ]);

    res.json(investments);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post('/api/investments', async (req, res) => {
  const { name, type_name, monthly_evolution, yearly_evolution } = req.body;
  try {
    const type = await InvestmentType.findOne({ type_name });
    const newInvestment = new Investment({ name, type_id: type._id, monthly_evolution, yearly_evolution });
    await newInvestment.save();
    res.status(201).send('Investimento adicionado com sucesso!');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
