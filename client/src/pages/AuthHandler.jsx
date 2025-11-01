import { useEffect } from "react";
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
    } else {
      navigate("/", { replace: true });
    }
  }, [location, navigate]);

  return <p>Authenticating...</p>;
}
