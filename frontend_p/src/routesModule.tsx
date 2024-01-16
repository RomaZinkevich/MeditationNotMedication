import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import Sections from "./pages/Sections";
import EasePage from "./pages/EasePage";
import UserAccountPage from "./pages/UserAccouPantge";

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
    path: "/user-action-sign",
    element: <UserAccountPage login={true} />
  },
  {
    path: "/user-action-regis",
    element: <UserAccountPage login={false} />
  },
]);
