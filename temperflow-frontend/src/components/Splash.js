import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"; // Logo app

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Giả lập check login hoặc timeout 3s
    const timeout = setTimeout(() => {
      // TODO: kiểm tra login status, nếu đã login -> /home, else -> /login
      navigate("/login");
    }, 3000); // 3 giây

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div style={styles.container}>
      <img src={logo} alt="Temperflow Logo" style={styles.logo} />
      <h1 style={styles.text}>Temperflow</h1>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#A8FBD3", // màu chủ đạo
  },
  logo: {
    width: "150px",
    height: "150px",
    marginBottom: "20px",
  },
  text: {
    fontSize: "36px",
    color: "#4FB7B3",
    fontWeight: "bold",
  },
};

export default Splash;
