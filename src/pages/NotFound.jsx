import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen p-10 flex items-center justify-center bg-gradient-to-br from-blue-100 via-indigo-200 to-blue-50">
      <div className="bg-white p-6 rounded shadow text-center">
        <h1 className="text-2xl font-bold text-[#253599]">Page not found</h1>
        <p className="text-gray-700 mt-2">Let’s get you back on track.</p>
        <Link to="/" className="mt-4 inline-block bg-[#286DC7] text-white px-4 py-2 rounded">Go Home</Link>
      </div>
    </div>
  );
}
