import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const base = "transition text-[#253599] dark:text-gray-200";
  const active = "font-semibold underline underline-offset-4";

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <nav className="sticky top-0 bg-[#f1f5f8] dark:bg-gray-900 shadow-md z-50">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="text-2xl font-bold text-[#253599] dark:text-gray-100">
          FIT BY CHOICE
        </div>
        <div className="flex gap-6 font-medium flex-wrap">
          <NavLink to="/" className={({ isActive }) => `${base} ${isActive ? active : ""}`}>
            Home
          </NavLink>
          <NavLink to="/workouts" className={({ isActive }) => `${base} ${isActive ? active : ""}`}>
            Workouts
          </NavLink>
          <NavLink to="/exercises" className={({ isActive }) => `${base} ${isActive ? active : ""}`}>
            Exercises
          </NavLink>
          <NavLink to="/progress" className={({ isActive }) => `${base} ${isActive ? active : ""}`}>
            Progress
          </NavLink>
          <NavLink to="/auth" className={({ isActive }) => `${base} ${isActive ? active : ""}`}>
            Login / Register
          </NavLink>
        </div>
        <div className="flex items-center gap-4">
          
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-3 py-1 rounded-md border border-gray-400 dark:border-gray-600 
                       text-sm text-gray-700 dark:text-gray-200 
                       hover:bg-gray-200 dark:hover:bg-gray-800 transition"
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `bg-[#0e1f8f] text-white px-5 py-2 rounded-md hover:bg-blue-900 transition ${
                isActive ? "ring-2 ring-offset-2 ring-[#286DC7]" : ""
              }`
            }
          >
            Profile
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
