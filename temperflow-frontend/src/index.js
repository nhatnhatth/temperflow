import ReactDOM from "react-dom/client";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <GoogleOAuthProvider clientId="733915170209-fvmq05vhmfath7l4ijubfvj2o73vq4gv.apps.googleusercontent.com" locale="en">
    <App />
  </GoogleOAuthProvider>
);
