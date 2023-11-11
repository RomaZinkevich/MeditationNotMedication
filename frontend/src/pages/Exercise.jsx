import React from "react";

import NavBar from "../components/NavBar";
import {useParams} from "react-router";

function Exercise() {
  const {id} = useParams();

  return (
    <>
      <NavBar />
      <h1>Exercise id: {id}</h1>
    </>
  );
}

export default Exercise;
