import React, {useRef} from "react";
import CardComponent from "./CardComponent";

const GuideSection = ({Cards, sectionID, name}) => {
  const containerRef = useRef(null);

  const handleScroll = (scrollOffset) => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += scrollOffset;
    }
  };
  return (
    <div className="container">
      <div>
        <button onClick={ () => {
          console.log("Container Ref:", containerRef.current); handleScroll(-200);
        }}>Scroll Left</button>
        <button onClick={ () => {
          console.log("Container Ref:", containerRef.current); handleScroll(200);
        }}>Scroll Right</button>
      </div>
      <h2>{name}</h2>
      <div className="cards_container" ref={containerRef}>
        {Cards.map((card) => (<CardComponent key={card.gId} card={card} image={card.img}/>))}
      </div>
    </div>
  );
};

export default GuideSection;
