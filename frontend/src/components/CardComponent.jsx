import React from "react";
import "../styles/components/Card.scss";

const CardComponent = ({card}) => {
  const cardStyle = {
    backgroundImage: `url(${card.image})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };

  const handleClick = () => {
    const newLocation = `/exercises/${card.content_id}`;
    window.location.href = newLocation;
  };
  return (
    <div>
      <div className="insideInfo" style={cardStyle} onClick={handleClick}></div>
      <div className="details">
        <h3 className="cardTitle">{card.content_name}</h3>
        <p>{card.description}</p>
      </div>
    </div>
  );
};

export default CardComponent;
