import React, { useState } from "react";
import { Link } from "react-router-dom";

const SOSAlert = () => {
  const [emergencyNumber, setEmergencyNumber] = useState("");

  const handleSOSClick = async () => {
    if (!emergencyNumber) {
      alert("Please enter an emergency contact number.");
      return;
    }

    // Function to get the current location
    const getLocation = () => {
      return new Promise((resolve) => {
        if (!navigator.geolocation) {
          return resolve("Location not available");
        }
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            resolve(`Latitude: ${latitude}, Longitude: ${longitude}`);
          },
          () => resolve("Unable to fetch location.") // Resolve with fallback message
        );
      });
    };

    try {
      const location = await getLocation(); // Wait for the location to be resolved
      const response = await fetch("http://localhost:5000/send-sos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          number: emergencyNumber,
          message: `SOS Alert! Help needed. ${location}`,
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert("SOS Alert sent successfully!");
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      alert("Failed to send SOS alert: " + error.message);
    }
  };

  return (
    <div className="relative">
      <Link to={'/safetyandsecurity/register'} className="p-3 bg-red-500 text-white font-bold font-sans absolute right-4 rounded-lg top-2">Add Emergency Number</Link>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
        <h1 className="text-4xl font-bold text-red-500 mb-6">SOS Alert</h1>
        {/* <label htmlFor="emergencyNumber" className="text-lg text-gray-600 mb-2">
          Emergency Contact:
        </label>
        <input
          type="hidden"
          id="emergencyNumber"
          placeholder="Enter phone number"
          value={emergencyNumber}
          onChange={(e) => setEmergencyNumber(e.target.value)}
          className="w-full max-w-xs p-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
        /> */}
        <button
          onClick={handleSOSClick}
          className="w-full max-w-xs mt-4 p-3 bg-red-500 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          SOS
        </button>
      </div>
    </div>
    
  );
};

export default SOSAlert;
