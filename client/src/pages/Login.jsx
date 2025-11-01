import React, { useEffect } from "react";
import { Home, TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import ChartAreaGradient from "./HomeChart";
import ExpenseChart from "./HomeChart";

const Login = () => {
  useEffect(() => {
    // Check if redirected from backend with token
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
    // <div className="flex h-screen items-center justify-center bg-gray-100">
    //   <div className="p-8 bg-white shadow-2xl rounded-2xl text-center">
    //     <h1 className="text-3xl font-bold mb-6 text-gray-700">
    //       Expense Tracker Login
    //     </h1>
    //     <button
    //       onClick={handleGoogleLogin}
    //       className="flex items-center justify-center gap-3 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 mx-auto"
    //     >
    //       <img
    //         src="https://developers.google.com/identity/images/g-logo.png"
    //         alt="Google"
    //         className="w-6 h-6"
    //       />
    //       <span>Sign in with Google</span>
    //     </button>
    //   </div>
    // </div>
    <div>
      {/* header */}
      <div>
        <p
          className="text-xl font-thin py-4 mx-3  text-gray-700"
          style={{ fontFamily: "monospace" }}
        >
          {" "}
          Expense Tracker
        </p>
        <hr className=" text-gray-200" />
      </div>

      {/* main Section */}
      <div className="flex min-h-[70vh]">
        <div className="w-1/2  flex flex-col justify-center m-2 items-center  border-gray-200 bg-[url('/src/assets/humans.png')] bg-contain bg-no-repeat bg-center ">
          <div>
            <p className="text-5xl font-semibold text-gray-500">Smarter</p>
            <p className="text-5xl font-semibold text-gray-500">Finance,</p>
            <p className="text-5xl font-semibold text-gray-500">
              made <span className="text-blue-700">Easy</span>
            </p>

            <p>
              start tracking your expenses, setting budgets and achieving your
              financial goals with ease
            </p>

            <button className="rounded-md border shadow-md cursor-pointer  px-7 py-1 my-2 flex items-center gap-2 hover:bg-gray-100 transition" onClick={handleGoogleLogin} >
              <img src="./src/assets/googlel.png" alt="" className="w-5 h-5" /> <span className="text-xl">Login</span>
            </button>
          </div>
        </div>
        <div className="w-1/2  flex flex-col justify-center m-2 items-center  border-gray-200">
          <ExpenseChart />
        </div>
      </div>
    </div>
  );
};

export default Login;
