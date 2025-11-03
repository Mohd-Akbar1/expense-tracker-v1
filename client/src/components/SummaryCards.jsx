import { CirclePlus } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import React from 'react';
// redux
import { useDispatch } from 'react-redux';


export default function SummaryCards({ income, expense ,onTransactionAdded  }) {
  const [transactions, setTransactions] = useState(false);
  const [formData, setFormData] = useState({
    type: "",
    amount: "",
    category: "",
    description: "",
    date: "",
  });

  const dispatch = useDispatch();

  const toggleForm = (e) => {
    if (e?.target?.id === "modal-overlay") {
      setTransactions(false);
    } else {
      setTransactions((prev) => !prev);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.type === "Expense" &&formData.description.length < 5) {
      return alert("Description should be at least 5 characters long");
    }
    
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      return;
    }

    //  payload for Income type
    const payload = {
      type: formData.type,  
      amount: formData.amount,
      category: formData.type === "Income" ? "N/A" : formData.category,
      description: formData.type === "Income" ? "N/A" : formData.description,
      date: formData.date,
    };

    try {
      const res = await fetch("https://expense-tracker-v1-zthq.onrender.com/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        
        toast.success("Transaction added successfully!");
        console.log(data);
    onTransactionAdded();



       
        setFormData({
          type: "",
          amount: "",
          category: "",
          description: "",
          date: "",
        });
        setTransactions(false);
      } else {
        alert(data.message || "Error adding transaction");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const Openform = () => {
    setTransactions(!transactions);
  };

  return (
    <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 mt-6 mx-2">
    {/* Account Balance */}
<div className="relative bg-white border border-gray-200 rounded-sm m-1 p-5 shadow-sm">
  {/* Blinking red dot only when balance is negative */}
  {(income - expense) < 0 && (
    <span className="absolute -top-1 -right-1 flex">
      <span className="absolute inline-flex h-3 w-3 animate-ping rounded-full bg-red-500 opacity-75"></span>
      <span className="relative inline-flex h-3 w-3 rounded-full bg-red-600"></span>
    </span>
  )}

  <p className="text-gray-500 text-[12px] font-semibold">
    Account Balance
  </p>
  <p
    className={`text-xl font-semibold mt-2 ${
      (income - expense) < 0 ? "text-red-600" : "text-blue-600"
    }`}
  >
    ₹{(income - expense).toFixed(2)}
  </p>
</div>


      {/* Monthly Income */}
      <div className="bg-linear-to-b from-white-500 border border-gray-200 to-gray-100 rounded-sm m-1 bg-white p-5">
        <p className="text-gray-500 text-[12px] font-semibold">
          Monthly Income
        </p>
        <p className="text-xl text-green-600 font-semibold mt-2">₹{(income.toFixed(2))}</p>
      </div>

      {/* Total Expenses */}
      <div className="bg-linear-to-b from-white-500 border border-gray-200 to-gray-100 rounded-sm m-1 bg-white p-5">
        <p className="text-gray-500 text-[12px] font-semibold">
          Total Expenses
        </p>
        <p className="text-xl font-semibold mt-2">₹{( expense.toFixed(2))}</p>
      </div>

      {/* Add Transactions */}
      <div
        className="bg-linear-to-b from-white-500 border border-gray-200 to-gray-100 rounded-sm m-1 cursor-pointer bg-white p-5"
        onClick={Openform}
      >
        <p className="text-gray-500 text-[12px] font-semibold">
          Add Transactions
        </p>
        <p className="text-xl font-semibold mt-2 flex justify-center">
          <CirclePlus />
        </p>
      </div>

      {/* Modal */}
      {transactions && (
        <div
          id="modal-overlay"
          className="fixed top-0 left-0 w-full h-full bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={toggleForm}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-xl w-96 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Add Transaction
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Type */}
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Type of transaction
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                >
                  <option value="">Select Type</option>
                  <option value="Expense">Expense</option>
                  <option value="Income">Income</option>
                </select>
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Amount
                </label>
                <input
                  type="number"
                  name="amount"
                  min={1}
                  value={formData.amount}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                  
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  disabled={formData.type === "Income"}
                  required={formData.type === "Expense"}
                  className={`w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none ${
                    formData.type === "Income" ? "bg-gray-100 cursor-not-allowed" : ""
                  }`}
                >
                  <option value="">Select Category</option>
                  <option value="Food">Food & Grocery</option>
                  <option value="Bills">Bills & Subscriptions</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Travel">Travelling</option>
                  <option value="Other">Miscellaneous</option>
                  <option value="Investment">Investment</option>
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  disabled={formData.type === "Income"}
                  required={formData.type === "Expense"}
                  
                  className={`w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none ${
                    formData.type === "Income" ? "bg-gray-100 cursor-not-allowed" : ""
                  }`}
                  placeholder="e.g. Grocery shopping"
                />
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  max={new Date().toISOString().split("T")[0]}
                  min={"2025-01-01"}
                  className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setTransactions(false)}
                  className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
