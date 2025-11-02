
import { CirclePower } from 'lucide-react';
import TimeDisplay from '../pages/time';

export default function Header(props) {

  

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <header className="flex justify-between items-center bg-transparent   p-4">
      <div>
        <h2 className="text-lg   font-semibold">Hi, {props?.User?.name || "User"} 👋</h2>
        <p className="text-gray-500 text-sm">Track all your expenses and transactions</p>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600 "><TimeDisplay /></span>
       
      
       <div className='sm:flex sm:gap-3 '>
         <CirclePower className="text-gray-600 w-8 h-8 cursor-pointer mb-2 hover:text-red-500" onClick={handleLogout} />
      <img
      src={
        props && props.User && props.User.avatar }
         
      
      alt="avatar"
      className="w-9 h-9 rounded-md border"
    />
       </div>


       
      </div>
    </header>
  );
}


//  "https://avatar.iran.liara.run/public"