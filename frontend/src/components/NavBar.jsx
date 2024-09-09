import React from "react";
import { Link } from "react-router-dom";
import "../styles/components/navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';

function NavBar() {
  return (
    <nav className="main-nav-container">
      <Link to="/home">
        <HomeOutlinedIcon />
        <h1>Home</h1>
      </Link>
<<<<<<< HEAD
      <Link to="/exercises/1" className="brb">
=======
      {/* The idea is for it to go to a selected random exercise that helps the user  */}
      <Link to="/exercises/8" className="brb">
>>>>>>> 9844dd9b4cdaa9fa4ab699396c250b38c78d7a68
        <img
          src="https://freesvg.org/storage/img/thumb/infinito.png"
          alt="red button"
          className="red-button-image"
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
