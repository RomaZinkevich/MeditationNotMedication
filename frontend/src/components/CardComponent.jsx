import React from "react";

const CardComponent = ({card, image}) => {
  return (
    <div>
      <h3>{card.title}</h3>
      <p>{card.description}</p>
      <img src="{image}" alt="Image" />
    </div>
  );
};

export default CardComponent;
