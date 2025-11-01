import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const barData = [
  { month: "Dec", amount: 10000 },
  { month: "Jan", amount: 18000 },
  { month: "Feb", amount: 15000 },
  { month: "Mar", amount: 28000 },
  { month: "Apr", amount: 22000 },
];

const pieData = [
  { name: "Food & Grocery", value: 6156 },
  { name: "Investment", value: 5000 },
  { name: "Shopping", value: 4356 },
  { name: "Travelling", value: 3670 },
  { name: "Miscellaneous", value: 2749 },
  { name: "Bill & Subscription", value: 2162 },
];

const COLORS = ["#6366F1", "#10B981", "#F43F5E", "#F59E0B", "#3B82F6", "#8B5CF6"];

export default function ChartsSection() {
  return (
    <div className="grid grid-cols-2 gap-6 mt-6">
      <div className="bg-white p-4 rounded-2xl shadow-md">
        <div className="flex justify-between mb-3">
          <h4 className="font-medium">Monthly Expenses</h4>
         
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={barData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#6366F1" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-md">
        <div className="flex justify-between mb-3">
          <h4 className="font-medium">Top Categories</h4>
        </div>
        <div className="flex">
          <ResponsiveContainer width="60%" height={200}>
            <PieChart>
              <Pie data={pieData} innerRadius={60} outerRadius={100} dataKey="value">
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <ul className="text-sm space-y-1">
            {pieData.map((d, i) => (
              <li key={i} className="flex justify-between gap-2">
                <span>{d.name}</span>
                <span className="font-medium">₹{d.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
