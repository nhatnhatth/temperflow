import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { googleLogout, GoogleOAuthProvider } from "@react-oauth/google";
import Login from "./components/Login";
import Survey from "./components/Survey/Survey";
import Recommendation from "./components/Recommendation/Recommendation";
import Motivation from "./components/Motivation";

function App() {

  const token = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");
  const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);

  useEffect(() => {
    if (token && !user) {
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
          <Route path="/" element={<Navigate to={"/login"} />} />

          <Route path="/login" element={<Login setUser={setUser} />} />

          <Route path="/survey" element={token && user ? <Survey user={user} /> : <Navigate to="/login" />} />

          <Route path="/motivation" element={token && user ? <Motivation/> : <Navigate to="/login" />} />

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
