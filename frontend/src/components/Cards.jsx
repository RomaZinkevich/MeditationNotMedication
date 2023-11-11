import React from "react";
import GuideSection from "./GuideSection";

const Cards = () => {
  const sections = [
    {
      id: 1,
      cards: [
        {gId: 1, title: "Card 1", img: "", description: "Description for Card 1"},
        {gId: 2, title: "Card 2", img: "", description: "Description for Card 2"},
      ],
      name: "Section 1",
    },
    {
      id: 2,
      cards: [
        {gId: 3, title: "Card 3", img: "", description: "Description for Card 3"},
        {gId: 4, title: "Card 4", img: "", description: "Description for Card 4"},
      ],
      name: "Section 2",
    },
  ];

  return (
    <div>
      {sections.map((section) => (
        <GuideSection key={section.id} sectionId={section.id} cards={section.cards} name={section.name} />
      ))}
    </div>
  );
};

export default Cards;
