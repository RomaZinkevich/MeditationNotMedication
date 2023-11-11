import React from "react";
import {createBrowserRouter} from "react-router-dom";

import Home from "./pages/Home";
import Exercises from "./pages/Exercise";
import Profile from "./pages/Profile";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/exercises/:id",
    element: <Exercises />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
]);
