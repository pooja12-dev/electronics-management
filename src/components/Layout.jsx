import React from "react";
import { Outlet } from "react-router-dom";

const Layout = ({ role }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Welcome to {role}'s Dashboard</h1>
      <Outlet />
    </div>
  );
};

export default Layout;
