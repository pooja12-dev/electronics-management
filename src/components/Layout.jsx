import React from "react";
import Sidebar from "./SideBar";
import Header from "./Header";
import { Outlet } from "react-router-dom"; // 👈 import Outlet

const Layout = ({ role }) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar role={role} />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header role={role} />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet /> {/* 👈 This is where nested routes will render */}
        </main>
      </div>
    </div>
  );
};

export default Layout;
