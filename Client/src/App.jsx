import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Games from "./pages/Games/Games";
import Home from "./pages/Home/Home";
import Movies from "./pages/Movies/Movies";
import NotFound from "./pages/NotFound";
import Colors from "./pages/Games/Colors";

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
      path: "/games/color-matching",
      element: <Colors />,
    },
    {
      path: "/*",
      element: <NotFound />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
