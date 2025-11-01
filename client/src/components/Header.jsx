
import { CirclePower } from 'lucide-react';

export default function Header(props) {

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <header className="flex justify-between items-center bg-transparent   p-4">
      <div>
        <h2 className="text-md font-thin">Hi, {props?.User?.name || "User"} 👋</h2>
        <p className="text-gray-500 text-sm">Track all your expenses and transactions</p>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">11:11 PM | 31 June 2025 | IN</span>
        <input
          type="text"
          placeholder="Search expenses..."
          className="px-3 py-2 rounded-md border border-gray-300 bg-white text-sm focus:outline-none"
        />
      
        <CirclePower className="text-gray-600 w-8 h-8 cursor-pointer" onClick={handleLogout} />
        <img
          src={props?.User?.avatar || "./src/assets/defaultAvatar.png"}
          alt="avatar"
          className="w-9 h-9 rounded-md border"
        />
       
      </div>
    </header>
  );
}
