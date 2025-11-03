

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions, setTransactions } from "../reduxStore/slices/transactions";
import { fetchUser } from "../reduxStore/slices/user"; // ✅ use Redux fetchUser
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";
import SummaryCards from "../components/SummaryCards";
import ChartsSection from "../components/ChartsSection";
import ExpenseTable from "../components/ExpenseTable";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [Income, setIncome] = useState(0);
  const [Expense, setExpense] = useState(0);
  const [refreshFlag, setRefreshFlag] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  //  Redux states
  const { data: user, loading: userLoading, error: userError } = useSelector((state) => state.user);
  const { transactions, loading: txLoading, error: txError } = useSelector((state) => state.transactions);

 
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tokenFromUrl = params.get("token");
    if (tokenFromUrl) {
      localStorage.setItem("token", tokenFromUrl);
      navigate("/dashboard", { replace: true });
     
    }
  }, [location, navigate]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/");

    dispatch(fetchUser()) 
      .unwrap()
      .then(() => {
        dispatch(fetchTransactions()); 
       
      })
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/");
      });
  }, [navigate, refreshFlag, dispatch]);


  useEffect(() => {
    if (transactions.length > 0) {
      const totalIncome = transactions
        .filter((tx) => tx.type === "Income")
        .reduce((acc, tx) => acc + Number(tx.amount), 0);

      const totalExpense = transactions
        .filter((tx) => tx.type === "Expense")
        .reduce((acc, tx) => acc + Number(tx.amount), 0);

      setIncome(totalIncome);
      setExpense(totalExpense);
    }
  }, [transactions]);

  
  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  const handleFilter = async ({ filterType, category, fromDate, toDate }) => {
    let query = `https://expense-tracker-v1-zthq.onrender.com/api/transactions/filter?filterType=${filterType}`;
    if (filterType === "category" && category) query += `&category=${category}`;
    if (filterType === "date" && fromDate && toDate)
      query += `&fromDate=${fromDate}&toDate=${toDate}`;

    const res = await fetch(query, { headers });
    const data = await res.json();
    dispatch(setTransactions(data));
  };

  const handleClearFilter = () => {
    dispatch(fetchTransactions());
  };

  // const handleTransactionAdded = () => setRefreshFlag((prev) => !prev);

  const handleTransactionAdded = () => {
    dispatch(fetchTransactions());
    
  };

  
  if (userLoading || txLoading)
    return (
      <img src="./src/assets/loading.gif" alt="loading" className="mx-auto mt-20" />
    );

  return (
    <div className="max-w-5xl mt-2 mx-auto bg-[#f5f5f5] rounded-sm pb-10">
   
      <Header  />
      <SummaryCards income={Income} expense={Expense} onTransactionAdded={handleTransactionAdded}/>
      <ChartsSection  />
      <ExpenseTable onFilter={handleFilter} onClearFilter={handleClearFilter} />
    </div>
  );
}
