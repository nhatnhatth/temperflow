import React from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { decodeGoogleCredential } from "./Survey/googleAuth";
import backgroundImage from "../assets/background_login.jpg";

const Login = () => {

  // const handleLoginSuccess = (credentialResponse) => {
  //   console.log("Login Success:", credentialResponse);

  //   // TODO: Gửi credentialResponse.credential (JWT) về backend
  //   // ví dụ: POST /auth/google
  //   // backend trả JWT token để lưu vào localStorage
  //   localStorage.setItem("token", credentialResponse.credential);

  //   // Chuyển sang home
  //   window.location.href = "/survey";
  // };

  const handleLoginSuccess = (credentialResponse) => {
    const user = decodeGoogleCredential(credentialResponse.credential);

    if (!user) return alert("Login failed: cannot decode Google token");

    // Lưu vào localStorage
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", credentialResponse.credential);

    window.location.href = "/survey";
  };

  const handleLoginError = () => {
    console.log("Login Failed");
    alert("Login failed. Try again.");
  };

  return (
    <div style={styles.container}>
      <div style={styles.wapper}>
        <h2 style={styles.title}>Welcome to Temperflow</h2>
        {/* <p style={styles.text}>Sign in with Google to continue</p> */}
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={handleLoginError}
        />
      </div>
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
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover", // ảnh phủ hết màn hình
    backgroundRepeat: "no-repeat", // không lặp lại
    backgroundPosition: "center", // canh giữa ảnh
  },
  wapper: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: "0 40px 40px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  title: {
    fontSize: "32px",
    color: "#0d6b68ff",
    fontWeight: "bold",
    marginBottom: "40px",
  },
  text: {
    marginBottom: "20px",
  },
};

export default Login;
