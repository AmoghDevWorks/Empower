const express = require('express');
const Pregnancy = require('../models/pregnancy');
const router = express.Router();

// Route for creating/updating pregnancy data
router.post('/pregnancy', async (req, res) => {
    try {
        const { email, bloodgroup, height, weight, pregnancyWeek } = req.body;

        // Validate inputs
        if (!email || !bloodgroup || !height || !weight || !pregnancyWeek) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Check if pregnancy data for the email already exists
        let pregnancy = await Pregnancy.findOne({ email });

        if (!pregnancy) {
            // If no pregnancy data exists for the email, create a new one
            pregnancy = new Pregnancy({
                email,
                bloodgroup,
                hnw: [{
                    height,
                    weight,
                    pregnancyWeek
                }],
                
            });
        } else {
            // If pregnancy data exists, we push a new height and weight record into the hnw array
            pregnancy.hnw.push({ height, weight,pregnancyWeek });
        }

        // Update pregnancy data (if needed)
        pregnancy.bloodgroup = bloodgroup;
        pregnancy.pregnancyWeek = pregnancyWeek;

        // Save the updated or new pregnancy data
        await pregnancy.save();

        res.status(200).json({
            message: 'Pregnancy data updated successfully',
            pregnancy
        });
    } catch (error) {
        console.error('Error updating pregnancy data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to fetch pregnancy data by email
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
