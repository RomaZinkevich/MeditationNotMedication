import React from "react";
import "../styles/components/Card.scss";
import {useLocation} from "react-router-dom";


const CardComponent = ({card, image}) => {
  const location = useLocation();

  const cardStyle = {
    backgroundImage: `url(${image})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };

  const handleClick = () => {
    const newLocation = `/exercises/${card.gId}`;
    window.location.href = newLocation;
  };
  return (
    <div className="insideInfo" style={cardStyle} onClick={handleClick}>
      <h3 className="cardTitle">{card.title}</h3>
      <p>{card.description}</p>
    </div>
  );
};

export default CardComponent;
