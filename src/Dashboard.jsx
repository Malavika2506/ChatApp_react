import React, { useState, useContext } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import ThemeContext from "./context/ThemeContext";

function Dashboard() {
  const [theme] = useContext(ThemeContext);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div
      className={`flex h-screen transition-colors duration-300 ${
        theme === "light" ? "bg-gray-100 text-black" : "bg-gray-900 text-white"
      }`}
    >
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen((prev) => !prev)}
      />

      {/* Right side: Navbar + Main */}
      <div className="flex-1 flex flex-col">
        {/* Navbar fixed at top */}
        <Navbar toggleSidebar={() => setSidebarOpen((prev) => !prev)} />

        {/* Main content area takes remaining height (below navbar) */}
        <div className="flex-1 overflow-hidden p-2 sm:p-4 lg:p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
