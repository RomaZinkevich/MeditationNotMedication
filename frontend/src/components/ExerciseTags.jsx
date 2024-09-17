import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import "../styles/components/exercise_tags.scss";

function ExerciseTags({ exerciseId }) {
  useEffect(() => {}, []);

  return (
    <div className="tags">
      <ul>
        <li>
          <Link to={`/tags/tag1`}>#Tag 1</Link>
        </li>
        <li>
          <Link to={`/tags/tag2`}>#Tag 2</Link>
        </li>
        <li>
          <Link to={`/tags/tag3`}>#Tag 3</Link>
        </li>
        <li>
          <Link to={`/tags/tag4`}>#Tag 4</Link>
        </li>
      </ul>
    </div>
  );
}

export default ExerciseTags;
