import { CirclePower } from "lucide-react";
import TimeDisplay from "../pages/time";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../reduxStore/slices/user";

export default function Header() {
  const dispatch = useDispatch();

  const { data: user, loading } = useSelector((state) => state.user);

const handleLogout = () => {
  window.location.href = "/";
  localStorage.removeItem("token");
  

  
  setTimeout(() => {
     dispatch(logoutUser()); 
   
  }, 100);
  
};

  if (loading) {
    return (
      <header className="flex justify-center items-center p-4">
        <span className="text-gray-600 text-sm">Loading user...</span>
      </header>
    );
  }

  return (
    <header className="flex justify-between items-center bg-transparent p-4">
    
      <div>
        <h2 className="text-lg font-semibold">
          Hi, {user?.name || "User"} 👋
        </h2>
        <p className="text-gray-500 text-sm">
          Track all your expenses and transactions
        </p>
      </div>

     
      <div className="flex items-center gap-4">
        {/* Display live time */}
        <span className="text-sm text-gray-600">
          <TimeDisplay />
        </span>

       
        <div className="sm:flex sm:gap-3 items-center">
          <CirclePower
            className="text-gray-600 w-8 h-8 cursor-pointer mb-2 hover:text-red-500"
            onClick={handleLogout}
          />
          <img
            src={
              user?.avatar?.trim() ? user.avatar : "https://avatar.iran.liara.run/public"
               
            }
            alt="avatar"
            className="w-9 h-9 rounded-md border"
              onError={(e) => (e.currentTarget.src = "https://avatar.iran.liara.run/public")}
          />
        </div>
      </div>
    </header>
  );
}
