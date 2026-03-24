import React from "react";
import { Outlet } from "react-router-dom";
import Aside from "../components/Aside";
import Nav from "../components/Nav";

function MainLayouts() {
  return (
    <Aside>
      <Nav />
        <Outlet />
    </Aside>
  );
};

export default MainLayouts;
