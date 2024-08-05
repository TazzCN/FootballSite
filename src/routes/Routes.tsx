import { createBrowserRouter } from "react-router-dom";
import Home from "../layout/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "team",
        element: <div>Team</div>,
      },
    ],
  },
]);

export default router;
