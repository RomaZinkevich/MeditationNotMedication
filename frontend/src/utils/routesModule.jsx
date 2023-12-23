import React from "react";
import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home";
import Exercise from "../pages/Exercise";
import Profile from "../pages/Profile";
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Favorite from "../pages/Favorite";
import Search from "../pages/Search";

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
  {
    path: "/signup",
    element: <Signup />,
  }
  {
    path: "/favorite",
    element: <Favorite />,
  },
  {
    path: "/search",
    element: <Search />,
  }
]);
