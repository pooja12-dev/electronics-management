import React from "react";
import { useRole } from "../RoleContext"; // Import the useRole hook

const Header = ({ toggleSidebar }) => {
  const { role } = useRole(); // Access the role from context
  console.log("rolefrom header", role);
  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <button onClick={toggleSidebar} className="text-lg">
        ☰
      </button>
      <h1>Welcome, {role}</h1>
    </header>
  );
};

export default Header;
