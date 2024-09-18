import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import NavBar from "../components/NavBar";
import "../styles/pages/profile.scss";
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

  useEffect(() => {
    const getUserTags = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_FETCH_URL}/users/tags`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setTags(response.data.details);
    };
    if (profile) {
      getUserTags();
    }
  }, []);

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
          <h3 className="profile-tags-header">My pain type(s):</h3>
          {tags ? (
            <ul className="profile-tags-ul">
              {tags.map((tag) => {
                return (
                  <div key={tag.tag_id} className="profile-tag">
                    <Link to={`/tags/${tag.tag_id}`}>#{tag.tag_name}</Link>
                  </div>
                );
              })}
            </ul>
          ) : (
            <>
              <p className="no-pain-types-p">
                No pain type found, go back to{" "}
                <Link to="/newUserFlow"> here </Link> to set your pain type
              </p>
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
