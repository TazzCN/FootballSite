import { createBrowserRouter } from "react-router-dom";
import Home from "../layout/Home";
import AddPlayer from "../pages/AddPlayer";
import BannerPage from "../pages/BannerPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/",
        element: <BannerPage />,
      },
      {
        path: "players",
        element: <AddPlayer />,
      },
    ],
  },
]);

export default router;
