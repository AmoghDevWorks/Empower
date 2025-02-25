import React, { useState } from "react";
import axios from "axios";

const PeriodTracker = () => {
  const [formData, setFormData] = useState({
    lmp: "",
    cycleLength: "",
    periodDuration: "",
    cycles: [],
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCycleChange = (e) => {
    const value = e.target.value.split(",").map((cycle) => parseInt(cycle.trim())).filter((cycle) => !isNaN(cycle));
    setFormData({ ...formData, cycles: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      console.log('formdata is:',formData)
      const response = await axios.post("http://localhost:5000/track", formData);
      console.log('response:',response)
      setResult(response.data);
    } catch (err) {
      setError("Error calculating period tracking. Please check your inputs.");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-center text-gray-800">Menstrual Cycle Tracker</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="lmp" className="text-sm font-medium text-gray-700">
            Last Menstrual Period (YYYY-MM-DD):
          </label>
          <input
            type="date"
            name="lmp"
            value={formData.lmp}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="cycleLength" className="text-sm font-medium text-gray-700">
            Cycle Length (in days):
          </label>
          <input
            type="number"
            name="cycleLength"
            value={formData.cycleLength}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="periodDuration" className="text-sm font-medium text-gray-700">
            Period Duration (in days):
          </label>
          <input
            type="number"
            name="periodDuration"
            value={formData.periodDuration}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="cycles" className="text-sm font-medium text-gray-700">
            Past Cycle Lengths (comma-separated, in days):
          </label>
          <input
            type="text"
            name="cycles"
            value={formData.cycles.join(", ")}
            onChange={handleCycleChange}
            placeholder="e.g., 28, 29, 30"
            className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        >
          Track Cycle
        </button>
      </form>

      {error && <p className="text-sm text-red-500 mt-4">{error}</p>}

      {result && (
        <div className="mt-6 bg-gray-100 p-4 rounded-md shadow-md">
          <h3 className="text-lg font-bold text-gray-800">Tracking Results</h3>
          <p className="mt-2 text-gray-700">
            <strong>Next Period Date:</strong> {result.nextPeriod}
          </p>
          <p className="mt-2 text-gray-700">
            <strong>Period Duration:</strong> {result.periodDuration} days
          </p>
          <p className="mt-2 text-gray-700">
            <strong>Cycle Regularity:</strong> {result.cycleRegularity}
          </p>
        </div>
      )}
    </div>
  );
};

export default PeriodTracker;
