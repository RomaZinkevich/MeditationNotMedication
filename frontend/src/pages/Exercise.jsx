import React from "react";
import {useParams} from "react-router";
import AudioPlayer from "../components/AudioPlayer";

function Exercise() {
  const {id} = useParams();

  const data = {
    g_id: id,
    name: "Calm yourself",
    author: "",
    cover: "",
    musicSrc: "",
  };

  return (
    <div className="exercise-page">
      <header>
        <h1>{data.name}</h1>
        <a href="/">Back</a>
      </header>

      <div className="music-player">
        <img
          src="https://imgs.search.brave.com/cWYNw0GyHwdKk7LwbDCQvhlaU2w_81meITJGxw-VNYg/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9idXJz/dC5zaG9waWZ5Y2Ru/LmNvbS9waG90b3Mv/dHdvLXRvbmUtaW5r/LWNsb3VkLmpwZz93/aWR0aD0xMDAwJmZv/cm1hdD1wanBnJmV4/aWY9MCZpcHRjPTA"
          alt=""
        />
        <AudioPlayer src={data.musicSrc} />
      </div>
    </div>
  );
}

export default Exercise;
