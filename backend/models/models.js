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

const InvestmentType = mongoose.model('investment_types', investmentTypeSchema);
const Investment = mongoose.model('Investment', investmentSchema);

module.exports = { InvestmentType, Investment };
