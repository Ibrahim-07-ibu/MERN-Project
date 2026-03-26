import { Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Portfolio from "../pages/Portfolio";
import Profile from "../pages/Profile";
import Register from "../pages/Register";
import Watchlist from "../pages/Watchlist";

import MainLayouts from "../layout/MainLayouts";

const mainRoutes = [
  {
    path: "/",
    element: <MainLayouts />,
    children: [
      {
        path: "/Dashboard",
        element: <Dashboard />,
      },
      {
        path: "/Portfolio",
        element: <Portfolio />,
      },
      {
        path: "/Profile",
        element: <Profile />,
      },
      {
        path: "/Watchlist",
        element: <Watchlist />,
      },
    ],
  },
  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "/Register",
    element: <Register />,
  },
];

export default mainRoutes;
