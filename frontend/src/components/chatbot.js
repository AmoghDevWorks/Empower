import React, { useState } from 'react';

function Chatbot() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [generatedStory, setGeneratedStory] = useState('');
  const [prompt, setPrompt] = useState('');

  // Toggle the visibility of the chatbot
  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  // Close the chatbot
  const closeChatbot = () => {
    setIsChatbotOpen(false);
  };

  // Handle form submission (Generate Story)
  const generateStory = async () => {
    const inputPrompt = prompt || 'Write a story about a magic backpack.';
    setGeneratedStory('Generating...'); // Display loading text

    try {
      const response = await fetch('http://localhost:3000/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: inputPrompt }),
      });

      const data = await response.json();

      if (data.text) {
        setGeneratedStory(data.text);
      } else {
        setGeneratedStory('No text returned from AI.');
      }
    } catch (error) {
      console.error('Error generating story:', error);
      setGeneratedStory('Failed to generate story.');
    }
  };

  return (
    <div>
      {/* Floating Chatbot Icon */}
      <div
        className="fixed bottom-8 right-8 w-16 h-16 bg-blue-600 text-white rounded-full flex justify-center items-center text-2xl cursor-pointer shadow-lg transition-all duration-300 ease-in-out hover:bg-blue-800 hover:scale-110"
        onClick={toggleChatbot}
      >
        💬
      </div>

      {/* Chatbot Container */}
      {isChatbotOpen && (
        <div
          className="fixed bottom-8 right-8 w-1/2 h-96 bg-white shadow-lg rounded-lg flex flex-col overflow-hidden transition-all duration-300 ease-in-out"
        >
          <div
            className="bg-blue-600 text-white p-4 text-xl flex justify-between items-center cursor-pointer"
            onClick={closeChatbot}
          >
            <span>Chatbot</span>
            <span className="cursor-pointer">✖</span>
          </div>

          {/* Chatbot Body */}
          <div
            className="flex-grow p-4 overflow-y-auto font-mono text-base whitespace-pre-wrap break-words"
          >
            <pre className="opacity-0 animate-fadeIn">{generatedStory}</pre>
          </div>

          {/* Chat Input */}
          <textarea
            className="w-full p-4 mb-4 text-base border-2 border-gray-300 rounded-lg resize-none"
            placeholder="Enter your prompt here..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          ></textarea>
          <button
            className="bg-blue-600 text-white py-2 px-8 text-lg rounded-lg cursor-pointer transition-all duration-300 ease-in-out hover:bg-blue-800 hover:scale-105"
            onClick={generateStory}
          >
            Generate Story
          </button>
        </div>
      )}
    </div>
  );
}

export default Chatbot;
