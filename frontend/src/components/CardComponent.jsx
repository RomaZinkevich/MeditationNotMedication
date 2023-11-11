import React from "react";
import "../styles/components/Card.scss";

const CardComponent = ({card, image}) => {
  return (
    <div className="insideInfo">
      <h3>{card.title}</h3>
      <p>{card.description}</p>
      <img src={image} alt="Image" />
    </div>
  );
};

export default CardComponent;
