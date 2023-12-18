import React from "react";
import "../styles/components/Card.scss";
import { Link } from "react-router-dom";

const CardComponent = ({ card }) =>
{
  const cardStyle = {
    backgroundImage: `url(${card.image})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };

  return (
    <div>
      <Link to={`/exercises/${card.content_id}`}>
        <div className="insideInfo" style={cardStyle} />
      </Link>
      <div className="details">
        <h3 className="cardTitle">{card.content_name}</h3>
        <p>{card.description}</p>
      </div>
    </div >
  );
};

export default CardComponent;
