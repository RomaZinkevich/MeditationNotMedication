import React from "react";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routesModule";
import { GoogleOAuthProvider } from "@react-oauth/google";

import ProfileProvider from "./contexts/ProfileProvider";

import "./styles/styles.scss";

const App = () => {
  return (
    <ProfileProvider>
      <GoogleOAuthProvider clientId="727800582414-ldorj8jcv2iuklvkckhcbepi8jkbgjov.apps.googleusercontent.com">
        <RouterProvider router={routes}></RouterProvider>
      </GoogleOAuthProvider>
    </ProfileProvider>
  );
};

export default App;
