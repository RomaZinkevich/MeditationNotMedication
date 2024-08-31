import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import GuideSection from "../components/GuideSection";


function Home() {
  const [sections, setSections] = useState([]);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_FETCH_URL}/sections`)
      .then((res) => res.json())
      .then((data) => {
        setSections(data);
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
          {Array.from(new Set(sections.map((section) => section.section_id))).map(
            (uniqueSectionId) => {
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
            }
          )}
        </>
      )}
    </div>
  );
}

export default Home;
