import React from "react";
import CardComponent from "./CardComponent";

const GuideSection = ({sectionID, name}) => {
  const Cards = [
    {gId: 1, title: "Card 1", img: "", description: "Description for Card 1"},
    {gId: 2, title: "Card 2", img: "", description: "Description for Card 2"},
    {gId: 3, title: "Card 3", img: "", description: "Description for Card 3"},
  ];
  return (
    <div>
      <h2>{name}</h2>
      {Cards.map((card) => (<CardComponent key={card.gId} card={card} image={card.img}/>))}
    </div>
  );
};

export default GuideSection;
