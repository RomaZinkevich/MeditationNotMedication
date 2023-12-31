import { RouterProvider } from "react-router-dom";
import { routes } from "./routesModule";

function App() {
  return (
    <RouterProvider router={routes}></RouterProvider>
  );
}

export default App
