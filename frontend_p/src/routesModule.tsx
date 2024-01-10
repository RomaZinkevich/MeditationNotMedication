import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import Sections from "./pages/Sections";
import EasePage from "./pages/EasePage";
import UserPage from "./pages/UserPage";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/browse",
    element: <Sections />
  },
  {
    path: "/ease",
    element: <EasePage />
  },
  {
    path: "/user-action",
    element: <UserPage />
  }
]);
