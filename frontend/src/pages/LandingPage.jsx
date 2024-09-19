import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

import "../styles/pages/landing_page.scss";
import { useProfile } from "../contexts/ProfileProvider";

function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [user, setUser] = useState(null);
  const [navigating, setNavigating] = useState(false);
  const { profile, setProfile } = useProfile();
  const navigate = useNavigate();
  const [isNewUser, setIsNewUser] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      setUser(response);
      setNavigating(true);
    },
    onFailure: (response) => console.log("Login failed" + response),
  });

  useEffect(() => {
    const fetchGoogleUserInfo = async () => {
      if (user) {
        try {
          console.log(user.access_token);
          const googleUserInfo = await axios(
            `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
            {
              headers: {
                Authorization: `Bearer ${user.access_token}`,
                Accept: "application/json",
              },
            }
          );
          console.log("Google User Info:", googleUserInfo);

          const response = await axios.post(
            `${import.meta.env.VITE_FETCH_URL}/users/google_auth`,
            {
              email: googleUserInfo.data.email,
              access_token: user.access_token,
            }
          );
          localStorage.setItem("token", response.data.token);
          setProfile(googleUserInfo.data);
          setIsNewUser(response.data.new_user);

        } catch (err) {
          console.error(
            "Error fetching user info or communicating with backend:",
            err
          );
        } finally {
          if (navigating) {
            if(isNewUser) {
              navigate("/newUserFlow");
            }
            navigate("/home");
            setNavigating(false);
          }
        }
      }
    };

    fetchGoogleUserInfo();
  }, [user, navigating]);

  return (
    <div className="background-wrapper">
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
        <p className="cta-description">
          Ease Your Chronic Pain Through Meditation
        </p>
        <div className="cta-buttons">
          <Link className="google-cta" onClick={() => login()}>
            Login With Google
          </Link>
          <Link to="/home" className="trial-cta">
            Try it Without Sign up
          </Link>
        </div>
      </main>
    </div>
  );
}

export default LandingPage;
