import React, { useState } from 'react';

function Chatbot() {
  const [prompt, setPrompt] = useState('');
  const [generatedText, setGeneratedText] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setGeneratedText('');

    try {
      const response = await fetch('http://localhost:5000/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (response.ok) {
        setGeneratedText(data.text);
      } else {
        setError(data.error || 'Something went wrong.');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to connect to the server.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">AI Content Generator</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt here..."
            className="w-full p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="5"
          />
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Generate
          </button>
        </form>
        {error && (
          <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
            <strong>Error:</strong> {error}
          </div>
        )}
        {generatedText && (
          <div className="mt-6 p-4 bg-green-100 text-green-800 rounded-lg">
            <h3 className="font-semibold mb-2">Generated Text:</h3>
            <p>{generatedText}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chatbot;
