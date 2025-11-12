import React from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";

const Login = () => {

  const handleLoginSuccess = (credentialResponse) => {
    console.log("Login Success:", credentialResponse);

    // TODO: Gửi credentialResponse.credential (JWT) về backend
    // ví dụ: POST /auth/google
    // backend trả JWT token để lưu vào localStorage
    localStorage.setItem("token", credentialResponse.credential);

    // Chuyển sang home
    window.location.href = "/survey";
  };

  const handleLoginError = () => {
    console.log("Login Failed");
    alert("Login failed. Try again.");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Welcome to Temperflow</h2>
      <p style={styles.text}>Sign in with Google to continue</p>
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={handleLoginError}
      />
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
    backgroundColor: "#A8FBD3",
  },
  title: {
    fontSize: "32px",
    color: "#4FB7B3",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  text: {
    marginBottom: "20px",
  },
};

export default Login;
