const express = require('express');
const Finance = require('../models/finance');

const router = express.Router();

// Finance Route
router.post('/finance', async (req, res) => {
  try {
    const { email, expenses, income } = req.body;
    console.log(req.body)

    // Validate inputs
    if (!email) {
      return res.status(400).json({ error: 'Email address is required' });
    }

    if ((!expenses || !Array.isArray(expenses)) && (!income || !Array.isArray(income))) {
      return res
        .status(400)
        .json({ error: 'At least one of expenses or income must be provided, and they must be arrays' });
    }

    // Find finance document by email
    let finance = await Finance.findOne({ email });

    // If no finance document exists, create a new one
    if (!finance) {
      finance = new Finance({ email, expenses: [], income: [] });
    }

    // Add multiple expenses if provided
    if (expenses && Array.isArray(expenses)) {
      expenses.forEach((expense) => {
        finance.expenses.push({
          amount: expense.amount || 0,
          description: expense.description || 'No description provided',
          date: expense.date || new Date(),
        });
      });
    }

    // Add multiple income entries if provided
    if (income && Array.isArray(income)) {
      income.forEach((inc) => {
        finance.income.push({
          amount: inc.amount || 0,
          description: inc.description || 'No description provided',
          date: inc.date || new Date(),
        });
      });
    }

    // Save the updated finance document
    await finance.save();

    res.status(200).json({
      message: 'Finance data updated successfully',
      finance,
    });
  } catch (error) {
    console.error('Error updating finance data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.get('/getfinance', async (req, res) => {
  const { email } = req.query; // Extract email from query parameter
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    let finance = await Finance.findOne({ email });
    if (!finance) {
      return res.status(404).json({ error: 'Finance data not found for this email' });
    }

    res.json({ finance });
  } catch (error) {
    console.error('Error fetching finance data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



module.exports = router;
