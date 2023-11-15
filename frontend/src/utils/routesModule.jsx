import React from "react";
import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home";
import Exercise from "../pages/Exercise";
import Profile from "../pages/Profile";
import Landing from "../pages/Landing";
import Login from "../pages/Login";

export const routes = createBrowserRouter([
  {
    path: "/",
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
    path: "/landing",
    element: <Landing />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
