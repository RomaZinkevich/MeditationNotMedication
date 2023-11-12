import React, { useState, useEffect } from "react";
import CardComponent from "./CardComponent";

const GuideSection = ({ sectionID, name }) => {
  const [cards, setCards] = useState([]);
  useEffect(() => {
    fetch(
      `https://meditationnotmedication-production.up.railway.app/api/sections/${sectionID}`
    )
      .then((res) => res.json())
      .then((data) => {
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
