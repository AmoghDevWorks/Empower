import React, { useRef, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const FinanceStats = () => {
  const incomeRef = useRef(null);
  const expenseRef = useRef(null);
  const incomeDescRef = useRef(null);
  const expenseDescRef = useRef(null);

  const [error, setError] = useState(null);
  const user = useSelector((state) => state.user);
  const email = user?.email || "";
  const [financeData, setFinanceData] = useState(null);

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
      const response = await axios.post("http://localhost:5000/finance", data); // Adjust the URL for deployment
      setFinanceData(response.data.finance);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred");
    }
  };

  const calculateTotal = (items) =>
    items?.reduce((sum, item) => sum + item.amount, 0) || 0;

  return (
    <div className="text-slate-900 p-4 text-center mx-auto">
      <h1 className="text-6xl font-bold mb-4">Finance Statistics</h1>
      <h4 className="text-slate-600 my-5 text-xl">
        "Fueling Ambitions, Empowering Women – Financial Freedom Starts Here."
      </h4>
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
              <strong>Total Expenses:</strong> ${calculateTotal(financeData.expenses)}
            </p>
            <p className="text-lg">
              <strong>Total Income:</strong> ${calculateTotal(financeData.income)}
            </p>
          </div>

          
          <h2 className="text-4xl font-haverbrooke underline underline-offset-2 font-semibold mt-4 my-6 pt-5 border-t-2 border-black border-solid ">Details</h2>

          <div>
            <h3 className="text-2xl underline underline-offset-2 font-semibold mb-2">Expenses:</h3>
            {financeData.expenses.length > 0 ? (
              <table className="table-auto border-collapse border border-gray-300 w-full mb-6">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 px-4 py-2">Date</th>
                    <th className="border border-gray-300 px-4 py-2">Description</th>
                    <th className="border border-gray-300 px-4 py-2">Amount ($)</th>
                  </tr>
                </thead>
                <tbody>
                  {financeData.expenses.map((expense, index) => (
                    <tr key={index} className="text-center">
                      <td className="border border-gray-300 px-4 py-2">
                        {new Date(expense.date).toLocaleDateString()}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {expense.description}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {expense.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No expenses recorded.</p>
            )}

            <h3 className="text-2xl underline underline-offset-2 font-semibold mb-2 py-5 border-t-2 border-slate-400 border-solid">Income:</h3>
            {financeData.income.length > 0 ? (
              <table className="table-auto border-collapse border border-gray-300 w-full">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 px-4 py-2">Date</th>
                    <th className="border border-gray-300 px-4 py-2">Description</th>
                    <th className="border border-gray-300 px-4 py-2">Amount ($)</th>
                  </tr>
                </thead>
                <tbody>
                  {financeData.income.map((income, index) => (
                    <tr key={index} className="text-center">
                      <td className="border border-gray-300 px-4 py-2">
                        {new Date(income.date).toLocaleDateString()}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {income.description}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {income.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
