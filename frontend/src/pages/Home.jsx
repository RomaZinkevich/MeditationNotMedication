import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { useProfile } from "../contexts/ProfileProvider";
import axios from "axios";

import NavBar from "../components/NavBar";
import TagGroup from "../components/TagGroup";
import ForYouGroup from "../components/ForYouGroup";

import "../styles/pages/home.scss";
function Home() {
  const [loading, setLoading] = useState(true);
  const { profile, setProfile } = useProfile();
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const getAllTags = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_FETCH_URL}/tags`
      );
      setTags(response.data);
      setLoading(false);
    };
    getAllTags();
  }, []);

  const backgroundStyle = {
    backgroundColor: "white",
  };

  return (
    <div style={backgroundStyle}>
      <NavBar />
      {loading ? (
        <div className="skeleton-container">
          <Skeleton height={40}></Skeleton>
          <Skeleton
            height={200}
            width={"100%"}
            style={{ marginBottom: "1rem" }}
          />
          <Skeleton height={40}></Skeleton>
          <Skeleton
            height={200}
            width={"100%"}
            style={{ marginBottom: "1rem" }}
          />
        </div>
      ) : (
        <main>
          {profile ? (
            <>
              <ForYouGroup />
            </>
          ) : null}

          {Array.from(new Set(tags.map((tag) => tag.tag_id)))
            .sort((a, b) => b - a)
            .map((uniqueTagId) => {
              const tag = tags.find((t) => t.tag_id === uniqueTagId);
              return (
                <TagGroup
                  key={tag.tag_id}
                  tagName={tag.tag_name}
                  tagId={tag.tag_id}
                />
              );
            })}

          <div style={{ marginTop: "8rem" }}></div>
        </main>
      )}
    </div>
  );
}

export default Home;
