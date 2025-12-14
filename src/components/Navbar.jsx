import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-[#f1f5f8] shadow-md">
      {/* Logo */}
      <div className="text-2xl font-bold text-[#253599]">
        FIT BY CHOICE
      </div>

      {/* Navigation Links */}
      <div className="flex gap-6 font-medium">
        <Link to="/" className="text-[#253599] hover:text-blue-700 transition">Home</Link>
        <Link to="/workouts" className="text-[#253599] hover:text-blue-700 transition">Workouts</Link>
        <Link to="/exercises" className="text-[#253599] hover:text-blue-700 transition">Exercises</Link>
        <Link to="/progress" className="text-[#253599] hover:text-blue-700 transition">Progress</Link>
      </div>

      {/* Profile Button */}
      <div>
        <Link
          to="/profile"
          className="bg-[#0e1f8f] text-white px-4 py-2 rounded-md hover:bg-blue-900 transition"
        >
          Profile
        </Link>
      </div>
    </nav>
  );
}
