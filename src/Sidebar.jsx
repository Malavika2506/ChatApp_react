import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FiMenu } from "react-icons/fi";

function Sidebar({ isOpen, toggleSidebar }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/message.json")
      .then((res) => res.json())
      .then((data) => setUsers(data.users)) // important: extract users array
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-indigo-500 text-white p-2 rounded-full shadow-lg"
        onClick={toggleSidebar}
      >
        <FiMenu className="text-xl" />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:relative top-0 left-0 h-full z-40 transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        w-64 md:w-72 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 text-white flex flex-col p-6 shadow-lg`}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gray-900 pb-4">
          <h2 className="text-2xl md:text-3xl font-extrabold text-indigo-400 tracking-wide mb-2">
            Chatalk
          </h2>
          <p className="text-sm text-gray-400">Connected Users</p>
        </div>

        {/* User List */}
        <nav className="mt-6 flex flex-col gap-1 overflow-y-auto h-[calc(100vh-100px)] pr-2 scrollbar-thin scrollbar-thumb-indigo-500 scrollbar-track-gray-900">
          {users.length > 0 ? (
            users.map((user) => (
              <NavLink
                key={user.id}
                to={`/dashboard/users/${user.id}`}
                className={({ isActive }) =>
                  `flex items-center gap-4 p-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-md hover:bg-gray-600 ${
                    isActive ? "bg-gray-700 shadow-md" : ""
                  }`
                }
              >
                <div className="relative">
                  <img
                    src={user.photo}
                    alt={user.name}
                    className="w-12 h-12 rounded-full border-2 border-indigo-500"
                  />
                  <span
                    className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-900 ${
                      user.status === "online"
                        ? "bg-green-400 animate-ping"
                        : "bg-red-500"
                    }`}
                  ></span>
                </div>

                <div className="flex flex-col">
                  <span className="font-semibold text-white">{user.name}</span>
                  <span className="text-xs text-gray-300">{user.lastSeen}</span>
                </div>
              </NavLink>
            ))
          ) : (
            <p className="text-gray-400 text-sm">Loading users...</p>
          )}
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
