import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";

import NavBar from "../components/NavBar";
import AudioPlayer from "../components/AudioPlayer";
import "../styles/components/exercise.scss";
import ExerciseTags from "../components/ExerciseTags";

function Exercise() {
  const { id } = useParams();
  const [card, setCard] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_FETCH_URL}/contents/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCard(data);
      })
      .catch((err) => console.log(err));
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <>
      <NavBar />
      {card.length === 0 ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="exercise-page">
          <header>
            <Link onClick={() => navigate(-1)} className="back-button">
              <h1>Back</h1>
            </Link>
          </header>

          <div className="exercise-info">
            <h1>{card.content_name}</h1>
            <h3>{card.description}</h3>
            <div className="img-wrapper">
              <img src={card.image} alt="calming image" />
            </div>
          </div>
          <div className="music-player">
            <AudioPlayer src={card.audio} />
          </div>
          <ExerciseTags exerciseId={id} />
        </div>
      )}
    </>
  );
}

export default Exercise;
