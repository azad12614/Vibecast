import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Games from "./pages/Games/Games";
import Home from "./pages/Home/Home";
import Movies from "./pages/Movies/Movies";
import NotFound from "./pages/NotFound";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/movies",
      element: <Movies />,
    },
    {
      path: "/games",
      element: <Games />,
    },
    {
      path: "/*",
      element: <NotFound />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
