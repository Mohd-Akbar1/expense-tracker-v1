import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CirclePower } from 'lucide-react';

import ExpenseTrackerDashboard from "./Data";
import Header from "../components/Header";
import SummaryCards from "../components/SummaryCards";
import ChartsSection from "../components/ChartsSection";
import ExpenseTable from "../components/ExpenseTable";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
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
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return navigate("/");

        const res = await fetch("http://localhost:8000/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Unauthorized");

        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error("Error fetching profile:", err);
        localStorage.removeItem("token");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);



  if (loading) return <img src="./src/assets/loading.gif" alt="loading" className="mx-auto mt-20" />;

  return (
    <div className=" max-w-5xl mt-2  mx-auto bg-[#f5f5f5]  rounded-sm">
      
      <Header User={user} />
      <SummaryCards/>
      <ChartsSection />
      <ExpenseTable />
 
    </div>
  );
}
