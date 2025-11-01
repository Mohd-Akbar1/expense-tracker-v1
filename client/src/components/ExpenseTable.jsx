// import { useSelector } from "react-redux";
import { SlidersHorizontal } from 'lucide-react';
import { Download } from 'lucide-react';


export default function ExpenseTable() {
//   const { data } = useSelector((state) => state.transactions);
 const data = [
    { id: 1, amount: 2100, category: "Shopping", Description: "Amazon", date: "2025-05-31", mode: "UPI" },
    { id: 2, amount: 299, category: "Movie", Description: "PVR", date: "2025-05-28", mode: "UPI" },
    { id: 3, amount: 1500, category: "Food & Grocery", Description: "Walmart", date: "2025-05-27", mode: "Card" },
    { id: 4, amount: 5000, category: "Investment", Description: "Stocks", date: "2025-05-25", mode: "Net Banking" },
    { id: 5, amount: 750, category: "Bill & Subscription", Description: "Netflix", date: "2025-05-24", mode: "Card" },

    { id: 6, amount: 1200, category: "Travelling", Description: "Uber", date: "2025-05-22", mode: "UPI" },
    { id: 7, amount: 3400, category: "Shopping", Description: "Flipkart", date: "2025-05-20", mode: "Card" },
    { id: 8, amount: 220, category: "Food & Grocery", Description: "Local Market", date: "2025-05-18", mode: "Cash" },
    { id: 9, amount: 1800, category: "Investment", Description: "Mutual Funds", date: "2025-05-15", mode: "Net Banking" },
    { id: 10, amount: 600, category: "Bill & Subscription", Description: "Spotify", date: "2025-05-12", mode: "Card" }
  ];

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md mt-6">
      <div className="flex justify-between mb-3">
        <h4 className=" text-gray-500 font-semibold">Recent Expenses</h4>
        <div className='flex justify-center  gap-2 items-center text-gray-500'>
          <button className="px-3 py-1 cursor-pointer  rounded text-sm flex justify-center items-center hover:bg-gray-100"><SlidersHorizontal className="mr-2 size-3" /> Filter</button>
        <button className="px-3 py-1 cursor-pointer  rounded text-sm flex justify-center items-center hover:bg-gray-100"> <Download className="mr-2 size-3" /> download</button>
        </div>
      </div>
      <table className="w-full border-separate border-spacing-2  border-gray-400 dark:border-gray-500">
        <thead>
          <tr className="text-left border border-b dark:border-gray-500">
            <th >S.N</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Description</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((t, i) => (
            <tr key={i} className="border-b hover:bg-gray-50 text-sm">
              <td>{i + 1}</td>
              <td>₹{t.amount}</td>
              <td>{t.category}</td>
              <td>{t.Description}</td>
              <td>{t.date}</td>
              <td>🗑️ / ✒️</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
