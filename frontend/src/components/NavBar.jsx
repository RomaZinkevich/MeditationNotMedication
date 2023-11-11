import React from "react";
import { Link } from "react-router-dom";
import "../styles/components/navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
function NavBar() {
  return (
    <nav className="nav-container">
      <Link to="/">
        <HomeOutlinedIcon />
        <h1>Home</h1>
      </Link>

      <Link to="/ease" className="brb">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Redbutton.svg/2048px-Redbutton.svg.png"
          alt="red button"
          className="red-button"
        />
        <h1>Ease</h1>
      </Link>

      <Link to="/profile">
        <Person2OutlinedIcon />
        <h1>Profile</h1>
      </Link>
    </nav>
  );
}

export default NavBar;
