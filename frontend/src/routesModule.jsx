import React from "react";
import {createBrowserRouter} from "react-router-dom";
import Home from "./pages/Home";
import Exercise from "./pages/Exercises";
import Profile from "./pages/Profile";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/exercise",
    element: <Exercise />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
]);
