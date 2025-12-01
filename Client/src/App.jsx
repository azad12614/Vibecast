import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Movies from "./pages/Movies/Movies";
import Games from "./pages/Games/Games";

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
  ]);
  return <RouterProvider router={router} />;
}

export default App;
