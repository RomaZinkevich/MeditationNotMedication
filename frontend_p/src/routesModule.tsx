import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import Sections from "./pages/Sections";
import EasePage from "./pages/EasePage";
import UserFormPage from "./pages/UserFormPage";

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
    path: "/redirect-user-log",
    element: <UserFormPage />
  },
  {
    path: "/redirect-user-reg",
    element: <UserFormPage flag={true} />
  }
]);
