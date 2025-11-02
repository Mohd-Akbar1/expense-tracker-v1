import { useState } from "react";
import { SlidersHorizontal, Download, X, Trash2, UserRoundPen } from "lucide-react";
import axios from "axios";

export default function ExpenseTable({ transactions, onFilter, onClearFilter, user }) {
  const [showFilter, setShowFilter] = useState(false);
  const [filterType, setFilterType] = useState("category");
  const [category, setCategory] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [updateTransaction, setUpdateTransaction] = useState(false);
  const [isClearFilterVisible, setIsClearFilterVisible] = useState(false);


  // Update modal states
 
  const [editId, setEditId] = useState(null);
  const [amount, setAmount] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

    const handleEdit = (transaction, index) => {
    setEditId(transaction._id);
    setAmount(transaction.amount);
    setEditCategory(transaction.category);
    setDescription(transaction.description);
    setDate(transaction.date);
    setUpdateTransaction(true);
  };

  const data = transactions
    .filter((t) => t.type === "Expense")
    .map((t, i) => ({
      id: i + 1,
      _id: t._id,
      amount: t.amount,
      category: t.category,
      description: t.description,
      date: t.date.split("T")[0],
    }));

  const handleApplyFilter = () => {
    onFilter({ filterType, category, fromDate, toDate });
    setShowFilter(false);
    setIsClearFilterVisible(true);
  };

  const handleClearFilter = () => {
    setCategory("");
    setFromDate("");
    setToDate("");
    onClearFilter();
    setIsClearFilterVisible(false);
  };

  const handleOpenDownloadModal = () => {
    setShowDownloadModal(true);
  };

  const handleConfirmDownload = async () => {
    if (!fromDate || !toDate) {
      alert("Please select both From and To dates");
      return;
    }

    try {
      const res = await axios.get("http://localhost:8000/api/transactions/download", {
        params: {
          
          from: fromDate,
          to: toDate,
          
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        responseType: "blob", 
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "csv_report.csv"); 
      document.body.appendChild(link);
      link.click();
      link.remove();

      setShowDownloadModal(false);
    } catch (err) {
      console.error(err);
      alert("Error downloading file. Please try again.");
    }
  };


  // Delete transaction
  const handleDelete = async (id) => {
    console.log("Delete transaction with id:", id);
    try {
      await axios.delete(`http://localhost:8000/api/transactions/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      // alert("Transaction deleted successfully.");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Error deleting transaction. Please try again.");
    }
  };
 const handleConfirmUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:8000/api/transactions/${editId}`,
        {
          amount,
          category: editCategory,
          description,
          date,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
     
      setUpdateTransaction(false);
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Error updating transaction. Please try again.");
    }
  };
  return (
    <div className="bg-white p-4 rounded-2xl shadow-md mt-6">
      <div className="flex justify-between mb-3">
        <h4 className="text-gray-500 font-semibold">Recent Expenses</h4>
        <div className="flex justify-center gap-2 items-center text-gray-500">
          <button
            onClick={() => setShowFilter(true)}
            className="px-3 py-1 cursor-pointer rounded text-sm flex justify-center items-center hover:bg-gray-100"
          >
            <SlidersHorizontal className="mr-2 size-3" /> Filter
          </button>
        { isClearFilterVisible && <button
            onClick={handleClearFilter}
            className="px-3 py-1 cursor-pointer rounded text-sm flex justify-center items-center hover:bg-gray-100"
          >
            <X className="mr-2 size-3" /> Clear Filter
          </button>}
          <button
            onClick={handleOpenDownloadModal}
            className="px-3 py-1 cursor-pointer rounded text-sm flex justify-center items-center hover:bg-gray-100"
          >
            <Download className="mr-2 size-3" /> Download
          </button>
        </div>
      </div>

      {/*  DOWNLOAD MODAL */}
      {showDownloadModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-[350px]">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">
              Download CSV (Select Date Range)
            </h2>
            <div className="flex flex-col gap-3">
              <label className="flex flex-col text-sm text-gray-600">
                From Date:
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="border rounded px-2 py-1 mt-1"
                />
              </label>
              <label className="flex flex-col text-sm text-gray-600">
                To Date:
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="border rounded px-2 py-1 mt-1"
                />
              </label>
            </div>
            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => setShowDownloadModal(false)}
                className="px-4 py-1.5 bg-gray-200 rounded-md hover:bg-gray-300 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDownload}
                className="px-4 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
              >
                Download
              </button>
            </div>
          </div>
        </div>
      )}

       {/*  update transaction modal */}
      {updateTransaction && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-80">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">
              Update Transaction Details
            </h2>
            <div className="flex flex-col gap-3">
              <label className="flex flex-col text-sm text-gray-600">
                Amount:
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="border rounded px-2 py-1 mt-1"
                />
              </label>

              {/* dropdown category */}
              <label className="flex flex-col text-sm text-gray-600">
                Category:
                <select
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
                  className="border rounded px-2 py-1 mt-1"
                >
                  <option value="">Select Category</option>
                  <option value="food">Food</option>
                  <option value="transport">Transport</option>
                  <option value="entertainment">Entertainment</option>
                  <option value="utilities">Utilities</option>
                </select>
              </label>
              <label className="flex flex-col text-sm text-gray-600">
                Date:
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="border rounded px-2 py-1 mt-1"
                />
              </label>
              <label className="flex flex-col text-sm text-gray-600">
                Description:
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="border rounded px-2 py-1 mt-1"
                />
              </label>
            </div>
            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => setUpdateTransaction(false)}
                className="px-4 py-1.5 bg-gray-200 rounded-md hover:bg-gray-300 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmUpdate}
                className="px-4 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* filter modal */}
      {showFilter && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-80">
            <h3 className="text-lg font-semibold mb-3">Filter Transactions</h3>

            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Filter Type
              </label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full border rounded p-2 text-sm"
              >
                <option value="category">By Category</option>
                <option value="date">By Date Range</option>
              </select>
            </div>

            {filterType === "category" && (
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border rounded p-2 text-sm"
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
            )}

            {filterType === "date" && (
              <div className="mb-3 flex gap-2">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    From
                  </label>
                  <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="border rounded p-2 text-sm w-full"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    To
                  </label>
                  <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="border rounded p-2 text-sm w-full"
                  />
                </div>
              </div>
            )}

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowFilter(false)}
                className="px-3 py-1 text-sm rounded bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleApplyFilter}
                className="px-3 py-1 text-sm rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* table */}
      <div className="overflow-x-auto w-full">
      <table className="min-w-full border-separate border-spacing-2 border-gray-400 dark:border-gray-500 overflow-x-auto">
        <thead className="bg-gray-100">
          <tr className="text-left border-b dark:border-gray-500 r ">
            <th>S.N</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Description</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 && (
            <tr><td colSpan="6" className="text-center text-gray-500 py-4">No expenses found.</td></tr>
          )}
          {data.length > 0 && data.map((t, i) => (
            <tr key={i} className="border-b hover:bg-gray-50 text-sm">
              <td>{i + 1}</td>
              <td>₹{t.amount}</td>
              <td>{t.category}</td>
              <td>{t.description}</td>
              <td>{t.date}</td>
              <td className="flex gap-2">
                <Trash2 className="cursor-pointer text-red-600 text-sm" onClick={() => handleDelete(t._id)} size={(16)} /> <UserRoundPen className="cursor-pointer" onClick={() => handleEdit(t,i)}  size={(16)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}
