// import { Routes, Route } from "react-router-dom";
// import Login from "./pages/Login";
// import Home from "./pages/Home";
// import ProtectedRoute from "./components/ProtectedRoute";
// import Dashboard from "./pages/Dashboard";

// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Login />} />
//       <Route
//         path="/home"
//         element={
//           <ProtectedRoute>
//             <Home />
//           </ProtectedRoute>
//         }
//       />

//       <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />
      
//     </Routes>
    
//   );
// }

// export default App;

import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import AuthHandler from "./pages/AuthHandler";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      
      {/* 🔹 Handle Google login redirect here */}
      <Route path="/auth/callback" element={<AuthHandler />} />

      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;

