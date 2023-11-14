import React from "react";

import logo from "../images/logo.png";
import GoogleIcon from "@mui/icons-material/Google";
import { Link } from "react-router-dom";

function Login() {
  return (
    <>
      <button>Skip</button>
      <div className="logo-wrapper">
        <img src={logo} alt="" />
        <h1>EazeEase</h1>
      </div>
      <section className="login-options">
        <button>Continue With Email</button>
        <button>
          <GoogleIcon></GoogleIcon>Continue With Google
        </button>
      </section>
      <p>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </>
  );
}

export default Login;
