import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { googleLogout, GoogleOAuthProvider } from "@react-oauth/google";
import Login from "./components/Login";
import Survey from "./components/Survey/Survey";
import Recommendation from "./components/Recommendation/Recommendation";
import Motivation from "./components/Motivation";

function App() {
  // Lấy token và user từ localStorage
  const token = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");
  const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);

  // Nếu token thay đổi hoặc user chưa có, có thể fetch user info từ backend
  useEffect(() => {
    if (token && !user) {
      // Ví dụ fetch thông tin user từ backend
      fetch("http://127.0.0.1:8000/user/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
          localStorage.setItem("user", JSON.stringify(data));
        })
        .catch((err) => console.error("Fetch user error:", err));
    }
  }, [token, user]);

  return (
    <GoogleOAuthProvider clientId="733915170209-fvmq05vhmfath7l4ijubfvj2o73vq4gv.apps.googleusercontent.com">
      <Router>
        <Routes>
          {/* Root route chuyển hướng dựa trên token */}
          <Route path="/" element={<Navigate to={"/login"} />} />

          {/* Login */}
          <Route path="/login" element={<Login setUser={setUser} />} />

          {/* Survey */}
          <Route path="/survey" element={token && user ? <Survey user={user} /> : <Navigate to="/login" />} />

          <Route path="/motivation" element={token && user ? <Motivation/> : <Navigate to="/login" />} />

          {/* Recommendation */}
          <Route
            path="/recommendations"
            element={token && user ? <Recommendation user={user} /> : <Navigate to="/login" />}
          />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
