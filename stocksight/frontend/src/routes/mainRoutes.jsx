import { Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Register from "../pages/Register";
import Calculator from "../pages/Calculator";
import StockPage from "../pages/StockPage";

import MainLayouts from "../layout/MainLayouts";

const mainRoutes = [
  {
    path: "/",
    element: <MainLayouts />,
    children: [
      {
        index: true,
        element: <Navigate to="/Login" replace />,
      },
      {
        path: "/Dashboard",
        element: <Dashboard />,
      },
      {
        path: "/Calculator",
        element: <Calculator />,
      },
      {
        path: "/Profile",
        element: <Profile />,
      },
      {
        path: "/stocks/:symbol",
        element: <StockPage />,
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
  {
    path: "*",
    element: <Navigate to="/Login" replace />,
  },
];

export default mainRoutes;
