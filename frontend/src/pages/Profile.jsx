import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import "../styles/components/profile.scss";

function Profile() {
  const [isLogged, setIsLogged] = useState(false);
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
            <h3>
              Ease Button Clicked: <span>23 times</span>{" "}
            </h3>
            <h3></h3>
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
