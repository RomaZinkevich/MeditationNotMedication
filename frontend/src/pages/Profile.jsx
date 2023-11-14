import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import "../styles/components/profile.scss";

function Profile() {
  const [isLogged, setIsLogged] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/auth/success")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <NavBar />
      {isLogged ? (
        <>
          <div className="stats">
            <h1>
              (This page is still in demo, here are the content of a sample user
              profile page)
            </h1>
            <h2>
              Type of Chronic Pain: <span>Back Pain</span>{" "}
            </h2>
            <h2>
              Ease Button Clicked: <span>23 times</span>{" "}
            </h2>
            <h2>Hours of mindfulness: 10</h2>
            <p>
              The user will log in with Google Auth, and the application will be
              giving user a list of questions to personalize the user experience
              (coming soon), and the content and "big red button" content will
              also be adjusted accordingly
            </p>
          </div>
        </>
      ) : (
        <>
          <a href="http://localhost:5000/auth/google">
            <div className="img-wrapper">
              <img
                src="https://onymos.com/wp-content/uploads/2020/10/google-signin-button-1024x260.png"
                alt="google"
              />
            </div>
          </a>
        </>
      )}
    </>
  );
}

export default Profile;
