import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";

import NavBar from "../components/NavBar";
import AudioPlayer from "../components/AudioPlayer";
import "../styles/components/exercise.scss";
import ExerciseTags from "../components/ExerciseTags";
import Skeleton from "react-loading-skeleton";
import { textAlign } from "@mui/system";

function Exercise() {
  const { id } = useParams();
  const [card, setCard] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_FETCH_URL}/contents/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCard(data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <>
      <NavBar />
      {loading ? (
        <div className="exercise-skeleton-container">
          <h1 style={{ margin: "0 auto", textAlign: "center" }}>
            <Skeleton height={50} width={300}></Skeleton>
          </h1>
          <h3 style={{ margin: "1rem", textAlign: "center" }}>
            <Skeleton height={20} width={600}></Skeleton>
          </h3>
          <div className="img-wrapper">
            <Skeleton height={300} width={300} />
          </div>
        </div>
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
