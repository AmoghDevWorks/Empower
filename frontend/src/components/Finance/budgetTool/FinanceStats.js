import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

// Register the necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement // For pie chart
);

const FinanceStats = () => {
  const incomeRef = useRef(null);
  const expenseRef = useRef(null);
  const incomeDescRef = useRef(null);
  const expenseDescRef = useRef(null);

  const [chatdata, setchatdata] = useState('');
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.user);
  const email = user?.email || "";
  const [financeData, setFinanceData] = useState(null);

  // Add finance data to backend
  const addFinanceData = async () => {
    const data = {
      email,
      income: [
        {
          amount: parseFloat(incomeRef.current?.value || 0),
          description: incomeDescRef.current?.value || "No description provided",
          date: new Date().toISOString(),
        },
      ],
      expenses: [
        {
          amount: parseFloat(expenseRef.current?.value || 0),
          description: expenseDescRef.current?.value || "No description provided",
          date: new Date().toISOString(),
        },
      ],
    };

    try {
      const response = await axios.post("http://localhost:5000/finance", data);
      setFinanceData(response.data.finance);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred");
    }
  };

  // Calculate total income or expenses
  const calculateTotal = (items) =>
    items?.reduce((sum, item) => sum + item.amount, 0) || 0;

  // Calculate savings
  const calculateSavings = () => {
    const totalIncome = calculateTotal(financeData?.income);
    const totalExpenses = calculateTotal(financeData?.expenses);
    return totalIncome - totalExpenses;
  };

  // Calculate profit or loss
  const calculateProfitLoss = () => {
    const totalIncome = calculateTotal(financeData?.income);
    const totalExpenses = calculateTotal(financeData?.expenses);
    const profitOrLoss = totalIncome - totalExpenses;
    return profitOrLoss;
  };

  // Prepare chart data for income/expenses/savings
  const chartData = financeData ? {
    labels: ['Income', 'Expenses', 'Savings'],
    datasets: [
      {
        label: 'Amount (₹)',
        data: [
          calculateTotal(financeData.income),
          calculateTotal(financeData.expenses),
          calculateSavings(),
        ],
        backgroundColor: ['#4CAF50', '#F44336', '#2196F3'],
      },
    ],
  } : {};

  // Prepare chart data for profit and loss
  const profitLossData = financeData ? {
    labels: ['Profit', 'Loss'],
    datasets: [
      {
        data: [
          calculateProfitLoss() > 0 ? calculateProfitLoss() : 0,
          calculateProfitLoss() < 0 ? -calculateProfitLoss() : 0,
        ],
        backgroundColor: ['#4CAF50', '#F44336'],
      },
    ],
  } : {};

  // Chart options for both bar and pie chart
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  const getFinanceData = async () => {
    if (!email) {
      alert('Login required');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/getfinance?email=${email}`);
      setFinanceData(response.data.finance);
    } catch (error) {
      setError(error.response?.data?.error || 'An error occurred');
    }
  };

  async function getchatbotdata() {
    if (!financeData) {
      console.error('No finance data available.');
      return;
    }

    try {
      // Create a summary of the finance data to send to the chatbot for advice
      const financeSummary = `
        Total Income: ₹${calculateTotal(financeData.income)}
        Total Expenses: ₹${calculateTotal(financeData.expenses)}
        Savings: ₹${calculateSavings()}
        Profit/Loss: ₹${calculateProfitLoss()}
      `;

      // Pass the finance summary to the chatbot backend for generating advice
      const response = await axios.post('http://localhost:5000/generate', {
        prompt: `Give me financial advice based on the following data: ${financeSummary}`,
      });

      // Set the response text (financial advice) from the chatbot
      setchatdata(response.data.text);
    } catch (e) {
      console.error("Error fetching financial advice:", e);
      setchatdata('Error getting financial advice.');
    }
  };

  // Fetch finance data and get chatbot advice after financeData is set
  useEffect(() => {
    getFinanceData();
  }, [email]); // Only run when email is available

  // Trigger chatbot data fetch after financeData is available
  useEffect(() => {
    if (financeData) {
      // Wait for financeData to be set, then trigger chatbot data fetching
      // setTimeout(() => {
        getchatbotdata();
      // }, 10000); // Delay of 10 seconds
    }
  }, [financeData]); // Only run when financeData changes

  return (
    <div className="text-slate-900 p-4 text-center mx-auto">
      <h1 className="text-6xl font-bold mb-4">Finance Statistics</h1>
      <h4 className="text-slate-600 my-5 text-xl">
        "Fueling Ambitions, Empowering Women – Financial Freedom Starts Here."
      </h4>

      {/* Inputs for finance data */}
      <div className="flex justify-center items-center w-full my-10">
        <div className="mb-4 w-2/3">
          <label htmlFor="income" className="block text-lg font-medium mb-2">
            Enter Income Amount:
          </label>
          <input
            type="number"
            id="income"
            ref={incomeRef}
            placeholder="Add Income"
            className="border p-2 w-1/3 rounded"
          />
        </div>
        <div className="mb-4 w-2/3">
          <label htmlFor="incomeDesc" className="block text-lg font-medium mb-2">
            Enter Income Description:
          </label>
          <input
            type="text"
            id="incomeDesc"
            ref={incomeDescRef}
            placeholder="Add Income Description"
            className="border p-2 w-1/3 rounded"
          />
        </div>
      </div>

      <div className="flex justify-center items-center w-full">
        <div className="mb-4 w-2/3">
          <label htmlFor="expenseAmount" className="block text-lg font-medium mb-2">
            Enter Expense Amount:
          </label>
          <input
            type="number"
            id="expenseAmount"
            ref={expenseRef}
            placeholder="Add Expense"
            className="border p-2 w-1/3 rounded"
          />
        </div>
        <div className="mb-4 w-2/3">
          <label htmlFor="expenseDesc" className="block text-lg font-medium mb-2">
            Enter Expense Description:
          </label>
          <input
            type="text"
            id="expenseDesc"
            ref={expenseDescRef}
            placeholder="Add Expense Description"
            className="border p-2 w-1/3 rounded"
          />
        </div>
      </div>

      <button
        onClick={addFinanceData}
        className="bg-indigo-600 font-semibold text-white py-2 px-4 rounded mb-4"
      >
        Add Data
      </button>

      {error && <p className="text-red-500">{error}</p>}

      {financeData && (
        <div className="mt-4">
          <h2 className="text-4xl underline underline-offset-4 py-4 font-semibold mb-2">Summary</h2>
          <div className="bg-slate-50 p-4 rounded">
            <p className="text-lg">
              <strong>Total Expenses:</strong> ₹{calculateTotal(financeData.expenses)}
            </p>
            <p className="text-lg">
              <strong>Total Income:</strong> ₹{calculateTotal(financeData.income)}
            </p>
            <p className="text-lg">
              <strong>Savings:</strong> ₹{calculateSavings()}
            </p>
          </div>


          {/* Bar Chart (Smaller) */}
          <div className="w-1/2 h-64 mx-auto mt-8 border-t-2 border-slate-400 border-solid">
            <h2 className='text-4xl font-semibold underline underline-offset-1 my-5'>Graph Analysis</h2>
            <Bar className='mx-28' data={chartData} options={chartOptions} />
          </div>

          {/* Profit or Loss Pie Chart (Smaller) */}
          <div className="w-1/2 h-64 mx-auto mt-20 border-t-2 border-slate-400 border-solid">
            <h2 className='text-4xl font-semibold underline underline-offset-1 my-5'>Profit vs loss</h2>
            <Pie className='mx-60' data={profitLossData} options={chartOptions} />
          </div>

          {/* Chatbot advice */}
          {financeData && <div className="mt-24 border-t-2 border-slate-400 border-solid">
            <h3 className="text-4xl font-semibold underline underline-offset-1 my-5">Financial Advice:</h3>
            <p className="text-lg font-serif text-justify px-10">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{chatdata}</p>
          </div>}

          {/* Separate Income Table */}
          <div className="my-8 border-t-2 border-slate-400 border-solid pt-5">
            <h3 className="text-3xl font-semibold underline underline-offset-2">Income Details</h3>
            <table className="table-auto border-collapse w-full mt-4">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Description</th>
                  <th className="border px-4 py-2">Amount (₹)</th>
                  <th className="border px-4 py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {financeData?.income.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="border px-4 py-2">{item.description}</td>
                    <td className="border px-4 py-2">{item.amount}</td>
                    <td className="border px-4 py-2">{new Date(item.date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Separate Expense Table */}
          <div className="my-8 border-t-2 border-slate-400 border-solid pt-5">
            <h3 className="text-3xl font-semibold underline underline-offset-2">Expense Details</h3>
            <table className="table-auto border-collapse w-full mt-4">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Description</th>
                  <th className="border px-4 py-2">Amount (₹)</th>
                  <th className="border px-4 py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {financeData?.expenses.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="border px-4 py-2">{item.description}</td>
                    <td className="border px-4 py-2">{item.amount}</td>
                    <td className="border px-4 py-2">{new Date(item.date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinanceStats;
