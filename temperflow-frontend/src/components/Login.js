import { GoogleLogin, googleLogout } from "@react-oauth/google";
import backgroundImage from "../assets/background_login.jpg";

const Login = () => {
  const handleLoginSuccess = (credentialResponse) => {
    fetch("http://127.0.0.1:8000/auth/google", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_token: credentialResponse.credential }),
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("token", credentialResponse.credential);

        window.location.href = "/survey";
      })
  };

  const handleLoginError = () => {
    console.log("Login Failed");
    alert("Login failed. Try again.");
  };

  if(localStorage.getItem("token"))
    handleLoginSuccess(localStorage.getItem("token"))

  return (
    <div style={styles.container}>
      <div style={styles.wapper}>
        <h2 style={styles.title}>Welcome to Temperflow</h2>
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
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat", 
    backgroundPosition: "center",
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
