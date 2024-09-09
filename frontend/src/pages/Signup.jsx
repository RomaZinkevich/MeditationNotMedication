import React from "react";
import GoogleIcon from "@mui/icons-material/Google";
import { Link } from "react-router-dom";

function Signup() {
  return (
    <>
      <form>
        <input type="email" />
        <input type="password" />
        <button>Sign Up</button>
      </form>
      <section className="other-signup-methods">
        <button>
          <GoogleIcon/>Continue with Google
        </button>
      </section>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </>
  );
}

export default Signup;
