import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import ExpenseChart from "../pages/HomeChart.jsx";
import { Tag } from 'lucide-react';
import { Calendar } from 'lucide-react';
import { fetchTransactions } from "../reduxStore/slices/transactions.js";
import { useSelector } from "react-redux";
import { useEffect } from "react";


const COLORS = ["#6366F1", "#10B981", "#F43F5E", "#F59E0B", "#3B82F6", "#8B5CF6"];

export default function ChartsSection() {

    useEffect(() => {
      
      fetchTransactions();
    }, []);
  
  
     const { transactions, loading: txLoading, error: txError } = useSelector((state) => state.transactions);



 const expenseTransactions = transactions.filter(t => t.type === "Expense");

const categoryTotals = expenseTransactions.reduce((acc, curr) => {
  const category = curr.category || "Other";
  if (!acc[category]) {
    acc[category] = 0;
  }
  acc[category] += Number(curr.amount);
  return acc;
}, {});

const pieData = Object.entries(categoryTotals).map(([name, value]) => ({
  name,
  value,
}));


  
  return (
    <div className="grid md:grid-cols-2 gap-1 mt-6 m-1">
      <div className="bg-white p-2 rounded-md m-1">
        <div className="flex justify-between mb-3">
          <h4 className="font-medium flex items-center gap-1">  <Calendar className="border-red-300 border text-red-400 p-1 rounded-md" size={(25)} />Monthly Transactions</h4>
         
        </div>
     
       <ExpenseChart transactions={transactions} />
      </div>

      <div className="bg-white p-2 rounded-md m-1 ">
        <div className="flex justify-between mb-3">
          <h4 className="font-medium flex items-center gap-1"><Tag className="border-red-300 border text-red-400 p-1 rounded-md" size={(25)} />Top Categories</h4>
        </div>
        
        {pieData.length === 0 && <p className="text-center text-gray-500 flex justify-center items-center h-[150px]">No expense categories to display.</p>}
       {pieData.length > 0 && <div className="flex md:flex-row flex-col justify-around items-center gap-4">  
          <ResponsiveContainer width="80%" height={200}>
            <PieChart className="drop-shadow-lg">
              <Pie data={pieData} innerRadius={60} outerRadius={100} dataKey="value" className=" shadow-md">
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

           <ul className="text-sm space-y-1">
        {pieData.map((d, i) => (
          <li key={i} className="flex justify-between items-center gap-3">
            <div className="flex items-center gap-2">
              {/* Color indicator */}
              <span
                className="inline-block w-3 h-3 rounded-sm"
                style={{ backgroundColor: COLORS[i % COLORS.length] }}
              ></span>
              <span>{d.name}</span>
            </div>
            <span className="font-medium">₹{d.value.toFixed(2)}</span>
          </li>
        ))}
      </ul>
        </div>}
      </div>
    </div>
  );
}
