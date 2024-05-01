import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function Layout() {
  return (
    <>
      <div className="grid grid-cols-12 bg-gray-100 items-baseline">
        <div className="col-span-2 h-screen sticky top-0 hidden lg:flex">
          <Sidebar />
        </div>
        <div className="col-span-9">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Layout;