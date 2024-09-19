import React, { useEffect, useState } from "react";
import axios from "axios";

import CardComponent from "./CardComponent";
function ForYouGroup() {
  const [tags, setTags] = useState([]);
  const [contents, setContents] = useState([]);

  useEffect(() => {
    const getUserTags = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_FETCH_URL}/users/tags`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setTags(response.data.details);
      } catch (error) {
        console.error("Error fetching user tags:", error);
      }
    };

    getUserTags();
  }, []);

  useEffect(() => {
    const getForYouContent = async () => {
      try {
        const allContent = [];
        for (const tag of tags) {
          const response = await axios.get(
            `${import.meta.env.VITE_FETCH_URL}/tags/contents/${tag.tag_id}`
          );
          allContent.push(...response.data);
        }
        setContents(allContent);
      } catch (error) {
        console.error("Error fetching content:", error);
      }
    };

    if (tags.length > 0) {
      getForYouContent();
    }
  }, [tags]);

  return (
    <div className="container">
      <h2>Made For You</h2>
      <div className="cards_container">
        {contents.map((content) => (
          <CardComponent key={content.content_id} card={content} />
        ))}
      </div>
    </div>
  );
}

export default ForYouGroup;
