require('dotenv').config();
const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
router.post('/generate', async (req, res) => {
    const prompt = req.body.prompt ;  // Default prompt if none is provided
  
    try {
      const result = await model.generateContent(prompt);
      res.json({ text: result.response.text() });  // Send the generated text to the client
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to generate content' });
    }
  });

module.exports=router;
