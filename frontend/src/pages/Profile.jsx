import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import NavBar from "../components/NavBar";
import "../styles/components/profile.scss";
import { useProfile } from "../contexts/ProfileProvider";
import { googleLogout } from "@react-oauth/google";
import ExerciseTags from "../components/ExerciseTags";

const Profile = () => {
  const { profile, setProfile } = useProfile();
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();

  const logout = async () => {
    await googleLogout();
    setProfile(null);
    navigate("/");
  };

  // useEffect(() => {
  //   fetch(`${import.meta.env.VITE_FETCH_URL}/tags`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setTags(data);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

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
          <h3 className="profile-header">My pain type:</h3>
          {tags.length > 0 ? (
            <>List of pain types</>
          ) : (
            <>
              <div>
                No pain type found, go back to{" "}
                <Link to="/newUserFlow"> Here </Link> to set your pain type
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <div className="profile-not-logged">
            Not Logged In, for full functionalities, go back
            <Link to="/"> Home </Link>
            for login
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
