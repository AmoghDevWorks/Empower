import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FinancialAssist = () => {
  const [donorData, setDonorData] = useState([]);

  // Function to fetch data from the backend
  async function fetchData() {
    try {
      const response = await axios.get('http://localhost:5000/getdonar');
      setDonorData(response.data.donar);
    } catch (error) {
      console.error('Error fetching donor data:', error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h1 className="text-4xl py-5 font-bold font-haverbrooke underline underline-offset-2 text-center text-indigo-600 ">
        Donor Information
      </h1>
      <div className="bg-gray-50 min-h-screen flex justify-center items-start py-10 px-4">
        <div className="w-full max-w-6xl">

          {/* Grid layout for donor cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {donorData.map((donor, index) => (
              <div
                key={index}
                className="bg-white shadow-xl rounded-lg overflow-hidden transform hover:scale-105 transition duration-300"
              >
                {/* Donor card content */}
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-3">{donor.name}</h2>
                  <p className="text-gray-600 mb-2">
                    <span className="font-semibold text-gray-700">Email:</span> {donor.email}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold text-gray-700">Contact:</span> {donor.contact}
                  </p>
                </div>

                {/* Card footer */}
                <div className="bg-indigo-600 text-white py-3 text-center">
                  <button className="bg-white text-indigo-600 font-semibold py-2 px-4 rounded-full transition-colors duration-300 hover:bg-indigo-500 hover:text-white">
                    Contact Donor
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
    
  );
};

export default FinancialAssist;
