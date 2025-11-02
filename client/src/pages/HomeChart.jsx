import React from "react";
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp } from "lucide-react";

// Sample data
const chartDataHome = [
  { month: "January", income: 4000, expense: 2400 },
  { month: "February", income: 3000, expense: 1398 },
  { month: "March", income: 2000, expense: 9800 },
  { month: "April", income: 2780, expense: 3908 },
  { month: "May", income: 1890, expense: 4800 },
  { month: "June", income: 2390, expense: 3800 },
];

const ExpenseChart = ({transactions}) => {

   const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  const monthlyData = transactions && transactions.reduce((acc, item) => {
    const date = new Date(item.date);
    const month = monthNames[date.getMonth()];
    if (!acc[month]) acc[month] = { month, income: 0, expense: 0 };

    if (item.type === "Income") acc[month].income += item.amount;
    else acc[month].expense += item.amount;

    return acc;
  }, {});

  const chartData = transactions && Object.values(monthlyData);
  return (
    <div className={`w-full ${transactions ? "p-0" : "p-1"} mx-auto bg-white rounded-2xl `}>
      {!transactions && <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between ">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Expense & Income Overview
          </h2>
          <p className="text-gray-500 text-sm">
            Your financial activity over the last 6 months
          </p>
        </div>
        <div className="flex items-center gap-2 text-green-600 font-semibold">
          <TrendingUp className="w-5 h-5" />
          +5.2% this month
        </div>
      </div>}

              {chartData?.length === 0 && transactions && <p className="text-center text-gray-500 flex justify-center items-center h-[150px]">No expense categories to display.</p>}


     {(chartData?.length > 0 || (!transactions && chartDataHome.length > 0)) && <ResponsiveContainer width="100%" height={transactions ? 200 : 320}>
        <AreaChart
          data={transactions ? chartData : chartDataHome}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fill: "#6b7280" }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{
              borderRadius: "12px",
              border: "1px solid #e5e7eb",
            }}
          />
          <Area
            type="monotone"
            dataKey="income"
            stroke="blue"
            fill="url(#colorIncome)"
            strokeWidth={3}
            name="Income"
          />
          <Area
            type="monotone"
            dataKey="expense"
            stroke="#ef4444"
            fill="url(#colorExpense)"
            strokeWidth={3}
            name="Expense"
          />
        </AreaChart>
      </ResponsiveContainer>}
    </div>
  );
};

export default ExpenseChart;
