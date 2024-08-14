const mongoose = require('mongoose');

const investmentTypeSchema = new mongoose.Schema({
  type_name: { type: String, unique: true, required: true }
});

const investmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type_id: { type: mongoose.Schema.Types.ObjectId, ref: 'InvestmentType', required: true },
  created_at: { type: Date, default: Date.now },
  monthly_evolution: [{
    month: { type: Date, required: true },
    value: { type: Number, required: true }
  }],
  yearly_evolution: [{
    year: { type: Number, required: true },
    value: { type: Number, required: true }
  }]
});

const savingsSchema = new mongoose.Schema({
  type_id: { type: mongoose.Schema.Types.ObjectId, ref: 'investment_types', required: true },
  amount: { type: Number, required: true }
});

const Savings = mongoose.model('Savings', savingsSchema);
const InvestmentType = mongoose.model('investment_types', investmentTypeSchema); // Coleção 'investment_types'
const Investment = mongoose.model('Investment', investmentSchema);

module.exports = { InvestmentType, Investment, Savings };
