import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SavePregnancyData = () => {
  const heightRef = useRef(null);
  const weightRef = useRef(null);
  const pregWeekRef = useRef(null);
  const email = useSelector((state) => state.user.email);
  const navigate = useNavigate();

  // State to manage loading, success, and error messages
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');  // State for AI-generated content

  // Handle form submission
  const handleClick = async () => {
    const height = heightRef.current.value;
    const weight = weightRef.current.value;
    const pregWeek = pregWeekRef.current.value;

    // Validate inputs
    if (!height || !weight || !pregWeek) {
      alert('Please fill in all fields.');
      return;
    }

    // Prepare the data to be sent to the backend
    const data = {
      email,
      height,
      weight,
      pregnancyWeek: pregWeek,
    };

    try {
      setLoading(true);  // Start loading
      setMessage('');    // Reset the message

      // Step 1: Save pregnancy data to the backend
      const response = await axios.post('http://localhost:5000/updatepregnancy', data);

      // Handle success response for saving pregnancy data
      setLoading(false);
      setMessage(response.data.message || 'Pregnancy data added successfully');
      setMessageType('success');

      // Step 2: Create health advice prompt dynamically
      const prompt = `Generate health advice for a pregnant woman with the following details: 
        Height: ${height} cm,
        Weight: ${weight} kg,
        Pregnancy Week: ${pregWeek} weeks.`;

      // Step 3: Generate health advice using AI with the pregnancy data
      const aiResponse = await axios.post('http://localhost:5000/generate', { prompt });

      // Set the generated content from the AI response
      setGeneratedContent(aiResponse.data.text || 'No content generated');

      navigate('/healthcare/pregnancy');  // Optionally redirect after saving
    } catch (error) {
      // Handle error response
      setLoading(false);
      setMessage(error.response?.data?.error || 'Failed to save pregnancy data');
      setMessageType('error');
    }
  };

  return (
    <div className='text-indigo-600 min-h-screen w-[99vw] flex pt-24 items-start justify-center bg-slate-100'>
      <div className='h-fit w-1/3 bg-gradient-to-br from-gray-100 to-gray-300 p-8 flex items-center justify-center flex-col gap-6 rounded-lg'>
        <h1 className='text-center text-5xl font-bold font-serif text-blue-700 mb-4'>Add Details</h1>

        {/* Height input field */}
        <div className='w-full flex items-start justify-center gap-3 flex-col my-2'>
          <label htmlFor='height' className='text-xl font-semibold'>Height:</label>
          <input
            ref={heightRef}
            name='height'
            type='number'
            className='text-black bg-slate-50 p-2 w-11/12 border-2 border-slate-600 border-solid rounded-md'
            placeholder='Enter your Height'
          />
        </div>

        {/* Weight input field */}
        <div className='w-full flex items-start justify-center gap-3 flex-col my-2'>
          <label htmlFor='weight' className='text-xl font-semibold'>Weight:</label>
          <input
            ref={weightRef}
            name='weight'
            type='number'
            className='text-black bg-slate-50 p-2 w-11/12 border-2 border-slate-600 border-solid rounded-md'
            placeholder='Enter your Weight'
          />
        </div>

        {/* Pregnancy Week input field */}
        <div className='w-full flex items-start justify-center gap-3 flex-col my-2'>
          <label htmlFor='pregnancyWeek' className='text-xl font-semibold'>Pregnancy Week:</label>
          <input
            ref={pregWeekRef}
            name='pregnancyWeek'
            type='number'
            className='text-black bg-slate-50 p-2 w-11/12 border-2 border-slate-600 border-solid rounded-md'
            placeholder='Enter your Pregnancy Week'
          />
        </div>

        {/* Message Display */}
        {message && (
          <div className={`mt-4 text-xl font-semibold ${messageType === 'error' ? 'text-red-500' : 'text-green-500'}`}>
            {message}
          </div>
        )}

        {/* AI-generated content */}
        {generatedContent && (
          <div className='mt-6'>
            <h2 className='text-xl font-semibold'>Doctor's Advice:</h2>
            <p className='text-lg'>{generatedContent}</p>
          </div>
        )}

        {/* Submit Button */}
        <button
          onClick={handleClick}
          className='py-2 px-6 font-semibold text-lg border-2 border-solid border-black rounded-xl hover:bg-black hover:text-slate-200'
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Add Data'}
        </button>
      </div>
    </div>
  );
};

export default SavePregnancyData;
