import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import NavBar from "../components/NavBar";
import "../styles/components/profile.scss";
import { useProfile } from "../contexts/ProfileProvider";
import { googleLogout } from "@react-oauth/google";

const Profile = () => {
  const { profile, setProfile } = useProfile();
  const navigate = useNavigate();

  const logout = async () => {
    await googleLogout();
    setProfile(null);
    navigate("/");
  };

  return (
    <>
      <NavBar />
      {profile ? (
        <>
          <div className="profile-logged-in">
            <img src={profile.picture} alt="profile picture" />
            <p>User Name: {profile.name}</p>
            <p>User Email: {profile.email}</p>
            <button>
              <Link onClick={() => logout()}>Log out</Link>
            </button>
          </div>
          {/* <h2>My saved exercises:</h2> */}
        </>
      ) : (
        <>
          <div className="profile-not-logged">
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
