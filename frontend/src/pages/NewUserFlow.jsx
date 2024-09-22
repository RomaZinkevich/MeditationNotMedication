import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import "../styles/pages/new_user_flow.scss";
import { useProfile } from "../contexts/ProfileProvider";
import axios from "axios";

function NewUserFlow() {
  const { profile, setProfile } = useProfile();
  const [navigating, setNavigating] = useState(false);
  const [painTypes, setPainTypes] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    if (!profile) {
      navigate("/");
    }
  }, [profile, navigate]); // Add dependencies for useEffect

  const nextHandler = async () => {
    try {
      if (painTypes.length === 0) {
        toast.error("Please select at least one pain type");
        return;
      }
      console.log("painTypes", painTypes);
      const response = await axios.post(
        `${import.meta.env.VITE_FETCH_URL}/users/tags`,
        {
          tag_ids: painTypes,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setNavigating(true);
      console.log("response", response);
      console.log(navigating);
    } catch (error) {
      console.error("Error posting tags:", error);
      toast.error("Error posting tags");
    }
  };

  useEffect(() => {
    if (navigating) {
      navigate("/home");
    }
  }, [navigating]);

  const painTypeChangeHandler = (e) => {
    const { id, checked } = e.target;
    let tagId = id.split("-").pop();
    tagId = parseInt(tagId);
    if (checked) {
      setPainTypes([...painTypes, tagId]);
    } else {
      setPainTypes(painTypes.filter((painType) => painType !== tagId));
    }
  };

  return (
    <>
      <section className="new-user__pain-type">
        <h2>What type of pain are you experiencing?</h2>
        <p>This will help us provide tailored meditations</p>
        <div className="new-user__pain-type__options">
          <div className="checkbox-container">
            <input
              type="checkbox"
              id="checkbox-musculoskeletal-paintype-1"
              onChange={(e) => painTypeChangeHandler(e)}
            />
            <label htmlFor="checkbox-musculoskeletal-paintype-1">
              Musculoskeletal Type
            </label>
          </div>
          <div className="checkbox-container">
            <input
              type="checkbox"
              id="checkbox-neuropathic-paintype-2"
              onChange={(e) => painTypeChangeHandler(e)}
            />
            <label htmlFor="checkbox-neuropathic-paintype-2">
              Neuropathic Type
            </label>
          </div>
          <div className="checkbox-container">
            <input
              type="checkbox"
              id="checkbox-visceral-paintype-3"
              onChange={(e) => painTypeChangeHandler(e)}
            />
            <label htmlFor="checkbox-visceral-paintype-3">Visceral Type</label>
          </div>
          <div className="checkbox-container">
            <input
              type="checkbox"
              id="checkbox-headache-paintype-4"
              onChange={(e) => painTypeChangeHandler(e)}
            />
            <label htmlFor="checkbox-headache-paintype-4">Headache</label>
          </div>
          <div className="checkbox-container">
            <input
              type="checkbox"
              id="checkbox-other-paintype-0"
              onChange={(e) => painTypeChangeHandler(e)}
            />
            <label htmlFor="checkbox-other-paintype-0">Other</label>
          </div>
        </div>
      </section>
      <section className="new-user__pain-intensity">
        <h2>How intense is your pain?</h2>
        <p>Higher the scale, the more pain</p>
        <input type="range" min="1" max="10" />
      </section>
      <section className="new-user__goal-for-app">
        <h2>What are your goals for using this app?</h2>
        <div className="checkbox-container">
          <input type="checkbox" id="checkbox-improve-sleep" />
          <label htmlFor="checkbox-improve-sleep">Improve Sleep</label>
          <input type="checkbox" id="checkbox-active-relaxation" />
          <label htmlFor="checkbox-active-relaxation">Active Relaxation</label>
          <input type="checkbox" id="checkbox-pain-relief" />
          <label htmlFor="checkbox-pain-relief">Reduced Pain Perception</label>
        </div>
      </section>
      <div className="button-wrapper">
        <Link className="next-button" onClick={nextHandler}>
          Next
        </Link>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default NewUserFlow;
