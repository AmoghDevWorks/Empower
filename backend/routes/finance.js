const express = require('express');
const Finance = require('../models/finance');

const router = express.Router();

// Finance Route
router.post('/finance', async (req, res) => {
  try {
    const { email, expenses, income } = req.body;

    // Validate inputs
    if (!email) {
      return res.status(400).json({ error: 'Email address is required' });
    }

    if (!expenses && !income) {
      return res.status(400).json({ error: 'At least one of expenses or income is required' });
    }

    // Find finance document by email
    let finance = await Finance.findOne({ email });

    // If no finance document exists, create a new one
    if (!finance) {
      finance = new Finance({ email, expenses: [], income: [] });
    }

    // Add expenses if provided
    if (expenses) {
      finance.expenses.push({
        amount: expenses.amount,
        description: expenses.description || 'No description provided',
        date: expenses.date || Date.now(),
      });
    }

    // Add income if provided
    if (income) {
      finance.income.push({
        amount: income.amount,
        description: income.description || 'No description provided',
        date: income.date || Date.now(),
      });
    }

    // Save the updated finance document
    await finance.save();

    res.status(200).json({ message: 'Finance data updated successfully', finance });
  } catch (error) {
    console.error('Error updating finance data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
