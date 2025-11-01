import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        window.location.href = "/";
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  if (!user)
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 to-blue-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
        <img
          src={user.avatar}
          alt="User Avatar"
          className="w-20 h-20 rounded-full mx-auto mb-4"
        />
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Welcome, {user.name} 👋
        </h1>
        <p className="text-gray-500 mb-6">{user.email}</p>

        <button
          onClick={handleLogout}
          className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
