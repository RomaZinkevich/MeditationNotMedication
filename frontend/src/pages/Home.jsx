import React from "react";
import NavBar from "../components/NavBar";
import GuideSection from "../components/GuideSection";

function Home() {
  const sections = [
    {
      id: 1,
      name: "Section 1",
    },
    {
      id: 2,
      name: "Section 2",
    },
  ];

  return (
    <>
      <NavBar />
      {sections.map((section) => {
        return <GuideSection sectionID={section.id} name={section.name}/>;
      })};
    </>
  );
}

export default Home;
