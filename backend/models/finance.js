const mongoose = require('mongoose');

const financeSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  expenses: [
    {
      amount: { type: Number, required: true },
      description: { type: String, default: 'No description provided' },
      date: { type: Date, default: Date.now },
    },
  ],
  income: [
    {
      amount: { type: Number, required: true },
      description: { type: String, default: 'No description provided' },
      date: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model('Finance', financeSchema);
