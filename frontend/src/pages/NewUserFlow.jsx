import React from "react";
import { Link } from "react-router-dom";

import "../styles/pages/new_user_flow.scss";

function NewUserFlow() {
  return (
    <>
      <section className="new-user__pain-type">
        <h2>What type of pain are you experiencing?</h2>
        <p>This will help us provide tailored meditations</p>
        <div className="new-user__pain-type__options">
          <div className="checkbox-container">
            <input type="checkbox" id="checkbox-musculoskeletal" />
            <label htmlFor="checkbox-musculoskeletal">
              Musculoskeletal Type
            </label>
          </div>
          <div className="checkbox-container">
            <input type="checkbox" id="checkbox-neuropathic" />
            <label htmlFor="checkbox-neuropathic">Neuropathic Type</label>
          </div>
          <div className="checkbox-container">
            <input type="checkbox" id="checkbox-visceral" />
            <label htmlFor="checkbox-visceral">Visceral Type</label>
          </div>
          <div className="checkbox-container">
            <input type="checkbox" id="checkbox-headache" />
            <label htmlFor="checkbox-headache">Headache</label>
          </div>
          <div className="checkbox-container">
            <input type="checkbox" id="checkbox-other" />
            <label htmlFor="checkbox-other">Other</label>
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
        <Link className="next-button" to={"/home"}>Next</Link>
      </div>
    </>
  );
}

export default NewUserFlow;
