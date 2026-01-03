import { useState } from "react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [err, setErr] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setErr("");

    if (!email || !password || (!isLogin && !username)) {
      setErr("Please fill in all required fields.");
      return;
    }

  
    if (isLogin) {
      console.log("Logging in:", { email, password });
      alert("Login successful (demo)");
    } else {
      console.log("Registering:", { username, email, password });
      alert("Registration successful (demo)");
    }

    setEmail("");
    setPassword("");
    setUsername("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-indigo-200 to-blue-50 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-[#253599] mb-6 text-center">
          {isLogin ? "Login" : "Register"}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm text-gray-600">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border rounded px-3 py-2"
                placeholder="Your username"
              />
            </div>
          )}
          <div>
            <label className="block text-sm text-gray-600">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="••••••••"
            />
          </div>
          {err && <p className="text-red-600 text-sm">{err}</p>}
          <button
            type="submit"
            className="w-full bg-[#286DC7] text-white py-2 rounded hover:bg-[#253599]"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
        <div className="mt-4 text-center text-sm">
          {isLogin ? (
            <p>
              Don’t have an account?{" "}
              <button
                onClick={() => setIsLogin(false)}
                className="text-[#286DC7] hover:underline"
              >
                Register
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <button
                onClick={() => setIsLogin(true)}
                className="text-[#286DC7] hover:underline"
              >
                Login
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
