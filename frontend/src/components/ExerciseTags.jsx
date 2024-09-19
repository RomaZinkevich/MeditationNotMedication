import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "../styles/components/exercise_tags.scss";

function ExerciseTags({ exerciseId }) {
  useEffect(() => {
    fetch(`${import.meta.env.VITE_FETCH_URL}/contents/tags/${exerciseId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTags(data);
      });
  }, []);
  const [tags, setTags] = useState([]);

  return (
    <div className="tags">
      <ul>
        {tags.map((tag) => (
          <li key={tag.id}>
            <Link to={`/tags/${tag.tag_id}`}>#{tag.tag_name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExerciseTags;
