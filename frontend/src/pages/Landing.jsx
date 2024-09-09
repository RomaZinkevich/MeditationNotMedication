import React from "react";

import logo from "../images/logo.png";
import GoogleIcon from "@mui/icons-material/Google";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <>
      <Link to="/"><button>Skip</button></Link>
      <div className="logo-wrapper">
        <img src={logo} alt="" />
        <h1>EazeEase</h1>
      </div>
      <section className="login-options">
        <Link to="/login"> 
          <button>Continue With Email</button>
        </Link>
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

export default Landing;
