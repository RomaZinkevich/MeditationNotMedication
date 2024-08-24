import React, { useState, useEffect } from "react";
import CardComponent from "./CardComponent";

const GuideSection = ({ sectionID, name }) =>
{
  const [cards, setCards] = useState([]);
  useEffect(() =>
  {
    fetch(
      `https://eazyeaze.190304.xyz/api/sections/${sectionID}`
    )
      .then((res) => res.json())
      .then((data) =>
      {
        data.sort((a, b) => a.content_id - b.content_id);
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
