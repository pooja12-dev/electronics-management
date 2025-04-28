import React from "react";
import Sidebar from "./SideBar";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { useRole } from "../RoleContext";

const Layout = () => {
  const { role, loading } = useRole(); // Get the role and loading state from context

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a spinner or a loading message
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar role={role} />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header role={role} />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
