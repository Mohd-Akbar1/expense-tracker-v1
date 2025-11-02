import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CirclePower } from 'lucide-react';


import Header from "../components/Header";
import SummaryCards from "../components/SummaryCards";
import ChartsSection from "../components/ChartsSection";
import ExpenseTable from "../components/ExpenseTable";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [Income, setIncome] = useState(0);
  const [Expense, setExpense] = useState(0);
 const [refreshFlag, setRefreshFlag] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // If token in query params (first login)
    const params = new URLSearchParams(location.search);
    const tokenFromUrl = params.get("token");

    if (tokenFromUrl) {
      localStorage.setItem("token", tokenFromUrl);
      navigate("/dashboard", { replace: true });
    }
  }, [location, navigate]);

useEffect(() => {
  const fetchUserAndTransactions = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/");

      const headers = {
        Authorization: `Bearer ${token}`,
      };

     
      const [userRes, txRes] = await Promise.all([
        fetch("http://localhost:8000/api/auth/profile", { headers }),
        fetch("http://localhost:8000/api/transactions", { headers }),
      ]);

      if (!userRes.ok || !txRes.ok) throw new Error("Unauthorized");

      
      const [userData, transactionsData] = await Promise.all([
        userRes.json(),
        txRes.json(),
      ]);
      setTransactions(transactionsData);
      console.log("transactionsData", transactionsData);

      setUser(userData);
      setTransactions(transactionsData); 

      if(transactionsData.length > 0){
        const incomeTransactions = transactionsData.filter((tx) => tx.type === "Income");
        const totalIncome = incomeTransactions.reduce((acc, tx) => acc + Number(tx.amount), 0);
        setIncome(totalIncome);
        const expenseTransactions = transactionsData.filter((tx) => tx.type === "Expense");
        const totalExpense = expenseTransactions.reduce((acc, tx) => acc + Number(tx.amount), 0);
        setExpense(totalExpense);
      }
      
    } catch (err) {
      console.error("Error fetching data:", err);
      localStorage.removeItem("token");
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  fetchUserAndTransactions();
}, [navigate, refreshFlag]);

const token = localStorage.getItem("token");
      if (!token) return navigate("/");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
const handleFilter = async ({ filterType, category, fromDate, toDate }) => {


  let query = `http://localhost:8000/api/transactions/filter?filterType=${filterType}`;
  if (filterType === "category" && category)
    query += `&category=${category}`;
  if (filterType === "date" && fromDate && toDate)
    query += `&fromDate=${fromDate}&toDate=${toDate}`;

  const res = await fetch(query,{ headers });
  const data = await res.json();
  setTransactions(data);
};

const handleClearFilter = async () => {
  const res = await fetch("http://localhost:8000/api/transactions", { headers }); // all data
  const data = await res.json();
  setTransactions(data);
};


 const handleTransactionAdded = () => setRefreshFlag((prev) => !prev);

  if (loading) return <img src="./src/assets/loading.gif" alt="loading" className="mx-auto mt-20" />;

  return (
    <div className=" max-w-5xl mt-2  mx-auto bg-[#f5f5f5]  rounded-sm pb-10" >
      
      <Header User={user} />
      <SummaryCards income={Income} expense={Expense} onTransactionAdded={handleTransactionAdded} />
      <ChartsSection transactions={transactions} />
      <ExpenseTable transactions={transactions} onFilter={handleFilter}
  onClearFilter={handleClearFilter}/>
 
    </div>
  );
}
