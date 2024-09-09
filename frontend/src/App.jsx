import React from "react";
import {RouterProvider} from "react-router-dom";
import {routes} from "./utils/routesModule";

import "./styles/styles.scss";

const App = () => {
  return (
    <RouterProvider router={routes}></RouterProvider>
  );
};

export default App;
