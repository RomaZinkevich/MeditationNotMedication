import React from "react";
import {Link} from "react-router-dom";

import "../styles/components/navbar.scss";

function NavBar() {
  return (
    <nav className="nav-container">
      <Link to="/">
        <h1>Home</h1>
      </Link>

      <Link to="/exercises/:id">
        <h1>Exercises</h1>
      </Link>

      <Link to="/profile">
        <h1>Profile</h1>
      </Link>
    </nav>
  );
}

export default NavBar;
