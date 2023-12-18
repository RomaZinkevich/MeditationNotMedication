import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import GuideSection from "../components/GuideSection";

function Home()
{
  const [sections, setSections] = useState([]);
  useEffect(() =>
  {
    fetch("https://meditationnotmedication-production.up.railway.app/api/sections/")
      .then((res) => res.json())
      .then((data) =>
      {
        setSections(data);
      });
  }, []);

  const backgroundStyle = {
    backgroundColor: "white",
  };


  const sectionMap = sections.reduce((acc, section) =>
  {
    acc[section.section_id] = section;
    return acc;
  }, {});


  const renderedSections = Object.values(sectionMap).map(section => (
    <GuideSection
      key={section.section_id}
      sectionID={section.section_id}
      name={section.section_name}
    />
  ));

  return (
    <div style={backgroundStyle}>
      <NavBar />
      {sections.length === 0 ? (
        <div className="loading">Loading...</div>
      ) : renderedSections}
    </div>
  );
}

export default Home;
