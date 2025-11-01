export default function SummaryCards() {
  const cards = [
    { title: "Account Balance", amount: "₹8,98,450.00", color: "from-emerald-500 to-emerald-400" },
    { title: "Monthly Expenses", amount: "₹24,093.00", color: "from-rose-100 to-rose-50" },
    { title: "Monthly Income", amount: "₹1,20,000.00", color: "from-emerald-100 to-emerald-50" },
    { title: "Total Expenses", amount: "₹3,45,600.00", color: "from-red-400 to-red-300" },
  ];

  return (
    <div className="grid grid-cols-4  mt-6 mx-2">
      {cards.map((card) => (
        <div
          key={card.title}
          className='bg-linear-to-b from-white-500 border border-gray-200 to-gray-100 rounded-sm m-1  bg-white p-5'
        >
          <p className="text-gray-500 text-[12px] font-semibold">{card.title}</p>
          <p className="text-xl font-semibold  mt-2">{card.amount}</p>
        </div>
      ))}
    </div>
  );
}
