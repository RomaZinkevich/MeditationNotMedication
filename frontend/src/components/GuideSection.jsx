import React, { useState, useEffect } from "react";
import CardComponent from "./CardComponent";

const GuideSection = ({ sectionID, name }) =>
{
  const [cards, setCards] = useState([]);
  useEffect(() =>
  {
    fetch(
      `https://meditationnotmedication-production.up.railway.app/api/sections/${sectionID}`
    )
      .then((res) => res.json())
      .then((data) =>
      {
        if (sectionID === 1)
        {
          data.sort((a, b) =>
          {
            const dayA = extractDayNumber(a.content_name);
            const dayB = extractDayNumber(b.content_name);
            return dayA - dayB;
          })
        }

        setCards(data);
      });
  }, []);

  const extractDayNumber = (contentName) =>
  {
    const dayString = contentName.replace("Day ", "");
    return parseInt(dayString, 10);
  };

  return (
    <div className="container">
      <h2>{name}</h2>
      <div className="cards_container">
        {cards.sort().map((card) => (
          <CardComponent key={card.content_id} card={card} />
        ))}
      </div>
    </div>
  );
};

export default GuideSection;
