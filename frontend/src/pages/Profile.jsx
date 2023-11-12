import React, { useState } from "react";
import NavBar from "../components/NavBar";
import "../styles/components/profile.scss";

function Profile() {
  const [isLogged, setIsLogged] = useState(false);

  return (
    <>
      <NavBar />
      {isLogged ? (
        <h1>Logged In</h1>
      ) : (
        <>
          <a href="https://meditationnotmedication-production.up.railway.app/auth/google">
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
