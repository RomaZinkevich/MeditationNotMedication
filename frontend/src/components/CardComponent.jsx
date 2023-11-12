import React from "react";
import { Link } from "react-router-dom";
import "../styles/components/Card.scss";

const CardComponent = ({card}) => {
  const cardStyle = {
    backgroundImage: `url(${card.image})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };

  return (
    <Link to={`/exercises/${card.content_id}`}>
      <div className="insideInfo" style={cardStyle}></div>
      <div className="details">
        <h3 className="cardTitle">{card.content_name}</h3>
        <p>{card.description}</p>
      </div>
    </Link>
  );
};

export default CardComponent;
