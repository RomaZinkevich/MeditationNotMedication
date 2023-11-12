import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import GuideSection from "../components/GuideSection";

function Home() {
  const [sections, setSections] = useState([]);
  const [hasFetched, setHasFetched] = useState(false);
  useEffect(() => {
    if (hasFetched) return;
    fetch(
      "https://meditationnotmedication-production.up.railway.app/api/sections/"
    )
      .then((res) => res.json())
      .then((data) => {
        setSections(data);
        setHasFetched(true);
      });
  }, []);

  const backgroundStyle = {
    backgroundColor: "white",
  };

  return (
    <div style={backgroundStyle}>
      <NavBar />
      {sections.length === 0 ? (
        <div className="loading">Loading...</div>
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
    </div>
  );
}

export default Home;
