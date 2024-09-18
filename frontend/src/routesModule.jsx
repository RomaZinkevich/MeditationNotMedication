import React from "react";
import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import Exercise from "./pages/Exercise";
import Profile from "./pages/Profile";
import LandingPage from "./pages/LandingPage";
import NewUserFlow from "./pages/NewUserFlow";
import TagPage from "./pages/TagPage";


export const routes = createBrowserRouter([
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/exercises/:id",
    element: <Exercise />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/ease",
    element: <div>ease</div>,
  },
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/newUserFlow",
    element: <NewUserFlow />,
  },
  {
    path: "/tags/:id",
    element: <TagPage />,
  }
]);
