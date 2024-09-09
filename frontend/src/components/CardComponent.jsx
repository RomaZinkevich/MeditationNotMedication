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
    <div>
      <Link to={`/exercises/${card.content_id}`}>
      <div className="insideInfo" style={cardStyle} ></div>
      <div className="details">
        <h3 className="cardTitle">{card.content_name}</h3>
        <p>{card.description}</p>
      </div>
<<<<<<< HEAD
      </Link>
    </div>
=======
    </Link>
    </div >

>>>>>>> 9844dd9b4cdaa9fa4ab699396c250b38c78d7a68
  );
};

export default CardComponent;