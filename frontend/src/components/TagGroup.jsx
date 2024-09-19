import React, { useState, useEffect } from "react";
import CardComponent from "./CardComponent";

import "../styles/components/guide_section.scss";

const TagGroup = ({ tagId, tagName }) => {
  const [cards, setCards] = useState([]);
  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_FETCH_URL}/tags/contents/${tagId}`
    )
      .then((res) => res.json())
      .then((data) => {
        setCards(data);
      });
  }, []);

  return (
    <div className="container">
      <h2>{tagName}</h2>
      <div className="cards_container">
        {cards.map((card) => (
          <CardComponent key={card.content_id} card={card} />
        ))}
      </div>
    </div>
  );
};

export default TagGroup;
