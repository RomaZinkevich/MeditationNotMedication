import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import NavBar from "../components/NavBar";

import CardComponent from "../components/CardComponent";
import "../styles/pages/tag_page.scss";

function TagPage() {
  const { id } = useParams();
  const [exercises, setExercises] = useState([]);
  const [tag, setTag] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`${import.meta.env.VITE_FETCH_URL}/tags/contents/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setExercises(data);
      });
    fetch(`${import.meta.env.VITE_FETCH_URL}/tags/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTag(data);
      });
  }, [id]);

  const backHandler = () => {
    navigate(-1);
  };
  return (
    <>
      <header className="tag-page-header">
        <Link onClick={() => navigate(-1)} className="back-button">
          Back
        </Link>
      </header>
      <NavBar />
      <h2 className="tag-group-header">{tag.tag_name}</h2>
      <div className="container" style={{ marginBottom: "10rem" }}>
        <div className="cards_container">
          {exercises.map((card) => (
            <CardComponent key={card.content_id} card={card} />
          ))}
        </div>
      </div>
    </>
  );
}

export default TagPage;
