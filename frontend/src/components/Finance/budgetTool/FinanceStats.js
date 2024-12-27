import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const FinanceStats = () => {
  const incomeRef = useRef(null);
  const expenseRef = useRef(null);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.user);
  const email = user?.email || ""; // Fallback in case user is undefined
  const [financeData, setFinanceData] = useState(null);

  // Fetch finance data
  const fetchFinanceData = async () => {
    const dataToSend = {
      email,
      income: incomeRef.current?.value || "",
      expense: expenseRef.current?.value || "",
    };

    try {
      const response = await axios.post('/finance', dataToSend);
      setFinanceData(response.data.finance);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
      setFinanceData(null);
    }
  };

  useEffect(() => {
    if (email) {
      fetchFinanceData();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  // Calculate totals
  const calculateTotal = (items) =>
    items?.reduce((sum, item) => sum + item.amount, 0) || 0;

  return (
    <div className="text-slate-900 p-4 text-center mx-auto">
      <h1 className="text-6xl font-bold mb-4">Finance Statistics</h1>
      <h4 className='text-slate-600 my-5 text-xl'>"Fueling Ambitions, Empowering Women – Financial Freedom Starts Here."</h4>
      <div className="mb-4">
        <label htmlFor="email" className="block text-lg font-medium mb-2">
          Enter Income:
        </label>
        <input
          type="number"
          id="income"
          ref={incomeRef}
          placeholder="Add Income"
          className="border p-2 w-1/3 rounded"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="expense" className="block text-lg font-medium mb-2">
          Enter Expense:
        </label>
        <input
          type="number"
          id="expense"
          ref={expenseRef}
          placeholder="Add Expenses"
          className="border p-2 w-1/3 rounded"
        />
      </div>

      <button
        onClick={fetchFinanceData}
        className="bg-indigo-600 text-white py-2 px-4 rounded mb-4"
      >
        Fetch Finance Data
      </button>

      {error && <p className="text-red-500">{error}</p>}

      {financeData && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Summary</h2>
          <div className="bg-gray-100 p-4 rounded">
            <p className="text-lg">
              <strong>Total Expenses:</strong> ${calculateTotal(financeData.expenses)}
            </p>
            <p className="text-lg">
              <strong>Total Income:</strong> ${calculateTotal(financeData.income)}
            </p>
          </div>

          <h2 className="text-xl font-semibold mt-4 mb-2">Details</h2>
          <div>
            <h3 className="text-lg font-bold mb-2">Expenses:</h3>
            {financeData.expenses.length > 0 ? (
              <ul className="list-disc ml-6">
                {financeData.expenses.map((expense, index) => (
                  <li key={index}>
                    ${expense.amount} - {expense.description} ({new Date(expense.date).toLocaleDateString()})
                  </li>
                ))}
              </ul>
            ) : (
              <p>No expenses recorded.</p>
            )}

            <h3 className="text-lg font-bold mt-4 mb-2">Income:</h3>
            {financeData.income.length > 0 ? (
              <ul className="list-disc ml-6">
                {financeData.income.map((income, index) => (
                  <li key={index}>
                    ${income.amount} - {income.description} ({new Date(income.date).toLocaleDateString()})
                  </li>
                ))}
              </ul>
            ) : (
              <p>No income recorded.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FinanceStats;
