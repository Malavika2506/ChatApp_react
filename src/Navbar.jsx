import React, { useContext, useState } from "react";
import { FiLogOut, FiMenu } from "react-icons/fi";
import { createPortal } from "react-dom";
import ThemeContext from "./context/ThemeContext";

function Navbar({ toggleSidebar }) {
  const email = localStorage.getItem("email");
  const username = email?.split("@")[0];
  const profilePhoto = "https://i.pravatar.cc/150?u=" + email;

  const [loggingOut, setLoggingOut] = useState(false);
  const [theme, setTheme] = useContext(ThemeContext);

  const toggleTheme = () => setTheme(prev => (prev === "light" ? "dark" : "light"));

  const handleLogout = () => {
    setLoggingOut(true);
    setTimeout(() => {
      localStorage.clear();
      window.location.href = "/login";
    }, 1500);
  };

  return (
    <>
      <header
        className={`flex items-center justify-between px-4 sm:px-6 py-3 shadow-md transition-colors duration-300 ${
          theme === "light" ? "bg-white text-slate-700" : "bg-gray-900 text-white"
        }`}
      >
        {/* Mobile Menu Button */}
        <button className="md:hidden mr-2" onClick={toggleSidebar}>
          <FiMenu className="text-2xl" />
        </button>

        {/* Welcome */}
        <h1 className="text-lg sm:text-xl font-bold">
          Welcome, <span className="capitalize">{username}</span>
        </h1>

        {/* Right Buttons */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="px-3 py-1 rounded-md border hover:opacity-80"
          >
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600"
          >
            <FiLogOut /> Logout
          </button>

          <img
            src={profilePhoto}
            alt="Profile"
            className="w-10 h-10 rounded-full border-2 border-indigo-500"
          />
        </div>
      </header>

      {/* Logout Overlay */}
      {loggingOut &&
        createPortal(
          <div
            className={`fixed inset-0 flex flex-col items-center justify-center backdrop-blur-sm z-50 ${
              theme === "light" ? "bg-white/40" : "bg-black/40"
            }`}
          >
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-500 mb-4"></div>
            <p className="text-lg font-medium">
              Logging out…
            </p>
          </div>,
          document.body
        )}
    </>
  );
}

export default Navbar;
