import React from "react";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";

function Login() {
  return (
    <>
      <img src={logo} alt="logo" />
      <form action="">
        <input type="text" />
        <input type="password" />
      </form>
      <div className="login-utils">
        <div className="remember-me">
          <input type="checkbox" />
          <span>Remember Me</span>
        </div>
        <p>Forgot Password?</p>
      </div>
      <button>Sign in</button>

      <p>
        Don't have an account? <Link to="signup">Sign up</Link>
      </p>
    </>
  );
}

export default Login;
