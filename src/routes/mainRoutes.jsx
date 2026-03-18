import { Children } from "react";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Portfolio from "../pages/Portfolio";
import Profile from "../pages/Profile";
import Register from "../pages/Register";
import Watchlist from "../pages/Watchlist";

import Mainlayouts from "../layout/MainLayouts"

const mainRoutes = {
  path: "/",
  element: <Mainlayouts />,
  children: [
    { path: "/Dashboard", element: <Dashboard /> },
    { path: "/Login", element: <Login /> },
    { path: "/Portfolio", element: <Portfolio /> },
    { path: "/Profile", element: <Profile /> },
    { path: "/Register", element: <Register /> },
    { path: "/Watchlist", element: <Watchlist /> },
  ],
};

export default mainRoutes;
