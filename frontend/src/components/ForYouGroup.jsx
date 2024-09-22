import React, { useEffect, useState } from "react";
import axios from "axios";
import Skeleton from "react-loading-skeleton";

import CardComponent from "./CardComponent";
function ForYouGroup() {
  const [tags, setTags] = useState([]);
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
      } catch (error) {
        console.error("Error fetching content:", error);
      }
    };

    if (tags.length > 0) {
      getForYouContent();
    }
  }, [tags]);

  return (
    <>
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
        <>
          <h2 className="tag-group-header">Made For You</h2>
          <div className="container">
            <div className="cards_container">
              {contents.map((content) => (
                <CardComponent key={content.content_id} card={content} />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ForYouGroup;
