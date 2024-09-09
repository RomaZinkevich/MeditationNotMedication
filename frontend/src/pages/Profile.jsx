import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import NavBar from "../components/NavBar";
import "../styles/components/profile.scss";
import { useProfile } from "../contexts/ProfileProvider";

const Profile = () => {
  const { profile, setProfile } = useProfile();
  return (
    <>
      <NavBar />
      {profile ? (
        <div>
          <p>User ID: {profile.id}</p>
          <p>User Name: {profile.name}</p>
          <p>User Email: {profile.email}</p>
          <p>User Picture: </p>
          <img src={profile.picture} alt="profile picture" />
        </div>
      ) : (
        <>
          <div>
            Not Logged In, go back
            <Link to="/"> Home </Link>
            for login
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
