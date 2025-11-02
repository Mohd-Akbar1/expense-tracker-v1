import React, { useEffect } from "react";
import { Home, TrendingUp } from "lucide-react";
import ExpenseChart from "./HomeChart";

const Login = () => {
  useEffect(() => {
    
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      window.location.href = "/home";
    }
  }, []);

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8000/api/auth/google";
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="flex  justify-between items-center p-4 border-b">
        <p
          className="text-xl md:text-2xl font-thin py-4 mx-3 text-gray-700 text-center md:text-left"
          style={{ fontFamily: "monospace" }}
        >
          Expense Tracker
        </p>
       
        <hr className="text-gray-200" />
      </div>

      {/* Main Section */}
      <div className="flex flex-col md:flex-row flex-1 min-h-[70vh]">
        {/* Left Section */}
        <div className="w-full md:w-1/2 flex flex-col justify-center m-4 items-center bg-[url('/src/assets/humans.png')] bg-contain bg-no-repeat bg-center">
          <div className="text-center md:text-left max-w-md">
            <p className="text-4xl md:text-5xl font-semibold text-gray-500">
              Smarter
            </p>
            <p className="text-4xl md:text-5xl font-semibold text-gray-500">
              Finance,
            </p>
            <p className="text-4xl md:text-5xl font-semibold text-gray-500">
              made <span className="text-blue-700">Easy</span>
            </p>

            <p className="text-sm md:text-base mt-4 text-gray-600 leading-relaxed">
              Start tracking your expenses, setting budgets, and achieving your
              financial goals with ease.
            </p>

            <button
              onClick={handleGoogleLogin}
              className="rounded-md border shadow-md cursor-pointer px-6 py-2 mt-4 flex items-center gap-2 hover:bg-gray-100 transition mx-auto md:mx-0"
            >
              <img
                src="./src/assets/googlel.png"
                alt="Google login"
                className="w-5 h-5"
              />{" "}
              <span className="text-lg md:text-xl">Login</span>
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 flex flex-col justify-center m-4 items-start">
          <div className="w-full max-w-lg">
            <ExpenseChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
