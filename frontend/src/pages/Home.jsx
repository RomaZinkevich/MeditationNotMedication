import React from "react";
import NavBar from "../components/NavBar";
import GuideSection from "../components/GuideSection";

function Home() {
  const sections = [
    {
      id: 1,
      cards: [
        {gId: 1, title: "Card 1", img: "", description: "Description for Card 1"},
        {gId: 2, title: "Card 2", img: "", description: "Description for Card 2"},
        {gId: 3, title: "Card 3", img: "", description: "Description for Card 3"},
        {gId: 4, title: "Card 4", img: "", description: "Description for Card 4"},
        {gId: 5, title: "Card 5", img: "", description: "Description for Card 5"},
      ],
      name: "Section 1",
    },
    {
      id: 2,
      cards: [
        {gId: 6, title: "Card 6", img: "", description: "Description for Card 6"},
        {gId: 7, title: "Card 7", img: "", description: "Description for Card 7"},
        {gId: 8, title: "Card 8", img: "", description: "Description for Card 8"},
      ],
      name: "Section 2",
    },
  ];

  return (
    <>
      <NavBar />
      {sections.map((section) => {
        return <GuideSection key={section.id} Cards={section.cards} sectionID={section.id} name={section.name}/>;
      })};
    </>
  );
}

export default Home;
