import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import GuideSection from "../components/GuideSection";

function Home()
{
  const [sections, setSections] = useState([]);
<<<<<<< HEAD
  const [hasFetched, setHasFetched] = useState(false);
  useEffect(() => {
    if (hasFetched) return;
    fetch(
      "https://meditationnotmedication-production.up.railway.app/api/sections/"
    )
=======
  useEffect(() =>
  {
    fetch("https://meditationnotmedication-production.up.railway.app/api/sections/")
>>>>>>> cd1e64443624eea8492cd904b0a6dfa9add90d61
      .then((res) => res.json())
      .then((data) =>
      {
        setSections(data);
        setHasFetched(true);
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
<<<<<<< HEAD
      ) : (
        <>
          {Array.from(
            new Set(sections.map((section) => section.section_id))
          ).map((uniqueSectionId) => {
            const section = sections.find(
              (s) => s.section_id === uniqueSectionId
            );
            return (
              <GuideSection
                key={section.section_id}
                sectionID={section.section_id}
                name={section.section_name}
              />
            );
          })}
        </>
      )}
=======
      ) : renderedSections}
>>>>>>> cd1e64443624eea8492cd904b0a6dfa9add90d61
    </div>
  );
}

export default Home;
