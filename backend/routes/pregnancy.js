const express = require('express');
const Pregnancy = require('../models/pregnancy');
const router = express.Router();

// pregnancy Route for creating/updating data
router.post('/pregnancy', async (req, res) => {
    try {
        const { email, bloodgroup, height, weight, pregnancyWeek } = req.body;

        // Validate inputs
        if (!email || !bloodgroup || !height || !weight || !pregnancyWeek) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Create pregnancy document
        const pregnancy = await Pregnancy.create({
            email,
            bloodgroup,
            height,
            weight,
            pregnancyWeek
        });

        if (!pregnancy) {
            return res.status(500).json({ error: 'Error creating pregnancy data' });
        }

        res.status(200).json({
            message: 'Pregnancy data updated successfully',
            pregnancy,
        });
    } catch (error) {
        console.error('Error updating pregnancy data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to fetch pregnancy data by email (GET request with query parameters)
router.get('/getpregnancy', async (req, res) => {
    const { email } = req.query;  // Use req.query to get query parameters

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    try {
        const pregnancy = await Pregnancy.findOne({ email });

        if (!pregnancy) {
            return res.status(404).json({ error: 'Pregnancy data not found' });
        }

        res.status(200).json({
            pregnancy
        });
    } catch (error) {
        console.error('Error fetching pregnancy data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
