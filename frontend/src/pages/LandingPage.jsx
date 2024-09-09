import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";

import "../styles/pages/landing_page.scss";
function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <>
      <nav className="landing-nav">

        <div className="logo">
          <img src="../../logo.png" alt="logo img" />
        </div>


        <ul className={isMenuOpen ? "show" : "hide"}>
          <li>
            <a
              href="https://www.youtube.com/watch?v=CvkhcILytPg"
              target="_blank"
            >
              About
            </a>
          </li>
          <li>
            <a href="https://github.com/RomaZinkevich/MeditationNotMedication">GitHub</a>
          </li>
          <li>
            <Link to="/home">Try Without Sign Up</Link>
          </li>
          <li>
            <a href="">Login With Google</a>
          </li>

        </ul>
        <button>
          {
            isMenuOpen ? <FontAwesomeIcon icon={faX} onClick={toggleMenu}  className="x-icon"/> :           <FontAwesomeIcon icon={faBars} onClick={toggleMenu} className="hamburger-icon"/>
          }
        </button>
      </nav>
      <main className="cta">
        <h1 className="cta-header">Meditation, Not Medication.</h1>
        <p>Ease Your Chronic Pain Through Meditation</p>
        <div className="cta-buttons">
          <Link to="/home" className="google-cta">Login With Google</Link>
          <Link to="/home" className="trial-cta">Try it Without Sign up</Link>
        </div>
      </main>
    </>
  );
}

export default LandingPage;