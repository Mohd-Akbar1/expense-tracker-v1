import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";

export default function AuthHandler() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      navigate("/dashboard", { replace: true });
       toast.success("User authenticated successfully");
    } else {
      navigate("/", { replace: true });
    }
  }, [location, navigate]);

  return <img src="./src/assets/loading.gif" alt="loading" className="mx-auto mt-20" />;
    
}
