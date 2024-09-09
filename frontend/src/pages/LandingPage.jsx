import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

import "../styles/pages/landing_page.scss";
import { useProfile } from "../contexts/ProfileProvider";
function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [user, setUser] = useState(null);
  const { profile, setProfile } = useProfile();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const login = useGoogleLogin({
    onSuccess: (response) => {
      setUser(response);
    },
    onFailure: (response) => console.log("Login failed" + response),
  });

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          setProfile(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]);

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
            <a href="https://github.com/RomaZinkevich/MeditationNotMedication">
              GitHub
            </a>
          </li>
          <li>
            <Link to="/home">Try Without Sign Up</Link>
          </li>
          <li>
            <Link onClick={() => login()}>Google Login</Link>
          </li>
        </ul>
        <button>
          {isMenuOpen ? (
            <FontAwesomeIcon
              icon={faX}
              onClick={toggleMenu}
              className="x-icon"
            />
          ) : (
            <FontAwesomeIcon
              icon={faBars}
              onClick={toggleMenu}
              className="hamburger-icon"
            />
          )}
        </button>
      </nav>
      <main className="cta">
        <h1 className="cta-header">Meditation, Not Medication.</h1>
        <p>Ease Your Chronic Pain Through Meditation</p>
        <div className="cta-buttons">
          <Link className="google-cta" onClick={() => login()}>
            Login With Google
          </Link>
          <Link to="/home" className="trial-cta">
            Try it Without Sign up
          </Link>
        </div>
      </main>
    </>
  );
}

export default LandingPage;
