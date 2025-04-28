import React from "react";

const Header = ({ role, toggleSidebar }) => {
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
