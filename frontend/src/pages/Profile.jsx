import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import "../styles/components/profile.scss";

const Profile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user data from the server
    fetch('https://meditationnotmedication-production.up.railway.app//api/getUserData')  // create an API endpoint to get user data
      .then(response => response.json())
      .then(data => setUserData(data));
  }, []);

  return (
    <div>
      {userData ? (
        <div>
          <p>User ID: {userData.id}</p>
          <p>User Name: {userData.name}</p>
        </div>
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
    </div>
  );
};


export default Profile;