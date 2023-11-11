import React from "react";

const Cards = () => {
  const cards = [
    {
      id: 1,
      title: "First Card",
      img: "",
    },
    {
      id: 2,
      title: "Second Card",
      img: "",
    },
    {
      id: 3,
      title: "Third Card",
      img: "",
    },
  ];

  return (
    <div>
      {cards.map((card) => (
        <div key={card.id}>
          <h3>{card.title}</h3>
          <img src="{card.img}" alt="Audio" />
        </div>
      ))}
    </div>
  );
};

export default Cards;
