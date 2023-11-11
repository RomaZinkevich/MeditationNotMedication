import React from "react";
import CardComponent from "./CardComponent";

const GuideSection = ({Cards, sectionID, name}) => {
  return (
    <div>
      <h2>{name}</h2>
      <div className="cards_container">
        {Cards.map((card) => (<CardComponent key={card.gId} card={card} image={card.img}/>))}
      </div>
    </div>
  );
};

export default GuideSection;
