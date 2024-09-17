import React, { useState, useEffect } from "react";
import CardComponent from "./CardComponent";

import "../styles/components/guide_section.scss";

const GuideSection = ({ sectionID, name }) => {
  const [cards, setCards] = useState([]);
  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_FETCH_URL}/sections/${sectionID}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setCards(data);
      });
  }, []);

  return (
    <div className="container">
      <h2>{name}</h2>
      <div className="cards_container">
        {cards.map((card) => (
          <CardComponent key={card.content_id} card={card} />
        ))}
      </div>
    </div>
  );
};

export default GuideSection;
