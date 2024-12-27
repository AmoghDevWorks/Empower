
const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const path=require('path');
app.use(express.static(path.join(__dirname, 'public')));
const router = express.Router();

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
  